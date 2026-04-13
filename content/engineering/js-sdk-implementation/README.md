# I Built a Full Authentication System with LoginRadius JS SDK — Here's Everything I Learned

So I decided to stop copy-pasting auth boilerplate from project to project and actually sit down and build it properly. I wanted email verification, two-factor authentication, password reset and SSO — the kind of thing most apps need but nobody wants to build from scratch twice.

I used **LoginRadius** as the identity backbone, wrote a **Node.js/Express** API to sit between the frontend and LoginRadius, and built **two React apps** that share a single authenticated session through SSO. This post walks through what I built, how every piece fits together, and how you can run the whole thing locally.

---

## What Does This Actually Do?

The short version: it's a complete auth system. Here's the full list of what's working:

- Register with email + phone
- Email verification (custom link, not the LoginRadius default)
- Login with 2FA — OTP goes to your email or your phone via SMS
- Forgot password → reset via email token
- Token-based sessions with automatic refresh
- Logout that invalidates the server-side token
- SSO — log in on App 1, open App 2 in the same browser, already logged in

---

## The Architecture

Three services, running locally in parallel:

```
┌────────────────────────┐       ┌────────────────────────┐
│   React App 1          │       │   React App 2           │
│   localhost:5173       │       │   localhost:5174        │
│                        │       │   (SSO demo)            │
└──────────┬─────────────┘       └────────────┬────────────┘
           │                                  │
           │     HTTP → localhost:5000         │
           ▼                                  ▼
┌────────────────────────────────────────────────────────────┐
│                   Express API  (port 5000)                  │
│  Handles all auth routes, proxies to LoginRadius,           │
│  sends emails, keeps API_SECRET off the browser             │
└──────────────────────────────┬─────────────────────────────┘
                               │
                               │  HTTPS
                               ▼
┌────────────────────────────────────────────────────────────┐
│                  LoginRadius API                            │
│  api.loginradius.com  —  user store, tokens, 2FA, SSO hub  │
└────────────────────────────────────────────────────────────┘
```

The reason there's a backend at all — even though LoginRadius has a client-side SDK — is that the `API_SECRET` must never touch the browser. Any endpoint that needs `apisecret` (account creation, generating verification tokens, getting tokens by UID) runs through the Express layer. Everything else still goes through the backend for consistency and so I can add logging, rate limiting, or business logic in one place.

---

## Tech Stack

**Monorepo**
- [pnpm workspaces](https://pnpm.io/workspaces) — one `pnpm install` installs everything
- [Turborepo](https://turbo.build/) — runs all three apps in parallel with `pnpm dev`

**Backend**
- Node.js + [Express 5](https://expressjs.com/)
- [Axios](https://axios-http.com/) — for LoginRadius REST calls
- [Nodemailer](https://nodemailer.com/) — sends email through Gmail
- [LoginRadius Node SDK](https://www.npmjs.com/package/loginradius-sdk) v11

**Frontend (both apps)**
- React 19 + TypeScript
- [Vite 5](https://vite.dev/)
- React Router DOM 7

---

## Project Structure

```
sdk-implementation/
├── apps/
│   ├── api/                         # Express backend — port 5000
│   │   ├── index.js                 # All route definitions live here
│   │   ├── login.js                 # login, OTP sending, token refresh, profile, logout
│   │   ├── registration.js          # register, email verify, phone verify, password reset
│   │   ├── config/
│   │   │   └── login_radius_sdk.js  # SDK init (API_KEY + API_SECRET)
│   │   └── utils/
│   │       └── sendMail.js          # Nodemailer helper
│   ├── web/                         # React App 1 — port 5173
│   │   └── src/
│   │       ├── App.tsx              # Login / register / forgot password views
│   │       ├── Profile.tsx          # Profile page, refresh, logout
│   │       ├── VerifyOTP.tsx        # 2FA OTP entry screen
│   │       ├── verifyEmail.tsx      # Email verification callback page
│   │       ├── PasswordChangePage.tsx
│   │       ├── cookieUtils.ts       # Read/write/delete cookies
│   │       └── ssoUtils.ts          # setSSOToken, checkSSOSession, clearSSOSession
│   └── web2/                        # React App 2 — port 5174 (SSO demo, same code)
├── .env                             # Shared environment variables for all apps
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

## The LoginRadius Endpoints — In Depth

This is the part I wish existed when I was figuring this out. Here's every LoginRadius API endpoint the project touches, what it expects, and what it gives back.

LoginRadius has two types of endpoints:

- **Management API** — requires both `apikey` + `apisecret`. These are privileged operations (create accounts, generate tokens server-side). Never call these from the browser.
- **Auth API** — requires only `apikey`. These are user-facing operations (login, verify email, get profile).

---

### Registration & Account Creation

#### `POST https://api.loginradius.com/identity/v2/manage/account`

This is how we create a user. It's a Management API call, so it needs both `apikey` and `apisecret` as query params.

**Query params:** `apikey`, `apisecret`

**Request body:**
```json
{
  "FullName": "Jane Doe",
  "Email": [{ "Type": "Primary", "Value": "jane@example.com" }],
  "Country": { "Code": "", "Name": "India" },
  "PhoneNumbers": [{ "PhoneType": "Mobile", "PhoneNumber": "9876543210" }],
  "Password": "securePassword123",
  "PhoneId": "919876543210"
}
```

**Response:** Full user profile object. We check for `response.ID` to confirm success.

One thing that tripped me up: the email field is an array with a `Type` and `Value`. LoginRadius supports multiple emails per user (primary, secondary, etc.), so even for a single address you need the array structure.

---

#### `POST https://api.loginradius.com/identity/v2/manage/account/verify/token`

After creating a user, we call this to generate an email verification token. We then build a custom link and send it ourselves via Nodemailer — this gives us full control over the email template.

**Query params:** `apikey`, `apisecret`

**Request body:**
```json
{ "email": "jane@example.com" }
```

**Response:**
```json
{ "VerificationToken": "abc123..." }
```

We take that `VerificationToken`, build a link like `http://localhost:5174/verify-email?vtoken=...&email=...`, and email it to the user.

---

#### `GET https://api.loginradius.com/identity/v2/auth/email`

When the user clicks the verification link, this endpoint does the actual verification.

**Query params:** `apikey`, `verificationtoken`, `email`

**Response:**
```json
{
  "Data": {
    "access_token": "...",
    "refresh_token": "...",
    "Profile": { "PhoneId": "91..." }
  }
}
```

We get back live tokens immediately after verification — so we can auto-login the user right after they verify their email without making them log in separately. That's a nice UX win.

---

### Login with 2FA

#### `POST https://api.loginradius.com/identity/v2/auth/login/2fa`

The login endpoint. Because 2FA is enabled in the LoginRadius dashboard, a successful credential check does **not** return tokens yet — it returns a staging token that unlocks the next step.

**Query params:** `apikey`

**Request body (email login):**
```json
{ "email": "jane@example.com", "password": "securePassword123" }
```

**Request body (phone login):**
```json
{ "phone": "+919876543210", "password": "securePassword123" }
```

**Response:**
```json
{
  "SecondFactorAuthentication": {
    "SecondFactorAuthenticationToken": "sfa-token-here",
    "IsEmailOtpExist": true
  }
}
```

We detect email vs. phone by regex on the input — if it matches an email pattern, we send `email`, otherwise we send `phone`. The `SecondFactorAuthenticationToken` is temporary and expires. We immediately use it to trigger the OTP delivery.

---

#### `POST https://api.loginradius.com/identity/v2/auth/login/2fa/otp/email`

Sends a one-time password to the user's email as the second factor.

**Query params:** `apikey`, `secondfactorauthenticationtoken`

**Request body:**
```json
{ "emailid": "jane@example.com" }
```

**Response:**
```json
{ "IsPosted": true }
```

---

#### `PUT https://api.loginradius.com/identity/v2/auth/login/2FA`

Sends an OTP via SMS when the user logged in with their phone number.

**Query params:** `apikey`, `secondfactorauthenticationtoken`

**Request body:**
```json
{ "phoneno2fa": "+919876543210" }
```

**Response:**
```json
{ "Sid": "SM..." }
```

The `Sid` is a Twilio message SID — useful for debugging if the SMS didn't arrive.

---

#### `PUT https://api.loginradius.com/identity/v2/auth/login/2fa/verification/otp/email`

The user entered the OTP from their email. This verifies it and finally issues real session tokens.

**Query params:** `apikey`, `secondfactorauthenticationtoken`

**Request body:**
```json
{ "emailid": "jane@example.com", "Otp": "482910" }
```

**Response:**
```json
{
  "access_token": "...",
  "refresh_token": "...",
  "Profile": { "PhoneId": "91..." }
}
```

---

#### `PUT https://api.loginradius.com/identity/v2/auth/login/2FA/verification/otp`

Same idea but for phone OTP.

**Query params:** `apikey`, `secondfactorauthenticationtoken`

**Request body:**
```json
{ "otp": "482910" }
```

**Response:** Same shape — `access_token`, `refresh_token`, `Profile`.

---

### Password Reset

#### `POST https://api.loginradius.com/identity/v2/manage/account/forgot/token`

Generates a password reset token. We pass `sendemail=true` and `resetPasswordUrl` as query params, and LoginRadius sends the reset email directly to the user with a link pointing to our app.

**Query params:** `apikey`, `apisecret`, `sendemail=true`, `resetPasswordUrl=http://localhost:5174/password-change`

**Request body:**
```json
{ "email": "jane@example.com" }
```

**Response:**
```json
{ "ForgotToken": "token-here" }
```

Note: This is a Management API call. The reset URL in the email will look like `http://localhost:5174/password-change?vtoken=<ForgotToken>`.

---

#### `PUT https://api.loginradius.com/identity/v2/auth/password/reset`

The user landed on the password change page, entered a new password. This finalizes it.

**Query params:** `apikey`

**Request body:**
```json
{
  "resettoken": "token-from-the-email-link",
  "password": "newSecurePassword456",
  "welcomeemailtemplate": "",
  "resetpasswordemailtemplate": ""
}
```

**Response:**
```json
{ "IsPosted": true }
```

---

### Session & Token Management

#### `GET https://api.loginradius.com/identity/v2/auth/account`

Fetches the logged-in user's profile. This is the endpoint the Profile page hits on load to check if the session is still valid.

**Query params:** `apikey`

**Headers:** `Authorization: <access_token>` (no "Bearer" prefix — just the raw token)

**Response:**
```json
{
  "Uid": "...",
  "FullName": "Jane Doe",
  "Email": [{ "Type": "Primary", "Value": "jane@example.com" }],
  "PhoneId": "91...",
  "EmailVerified": true,
  "ID": "..."
}
```

---

#### `GET https://api.loginradius.com/identity/v2/auth/access_token/refresh`

Access tokens expire. When they do, the frontend sends the stored `refresh_token` and gets a new `access_token` back without making the user log in again.

**Query params:** `apikey`

**Headers:** `Authorization: Bearer <refresh_token>` (this one does need "Bearer")

**Response:**
```json
{
  "access_token": "new-token-here",
  "refresh_token": "new-refresh-token-or-null"
}
```

---

#### `GET https://api.loginradius.com/identity/v2/auth/access_token/InValidate`

Logout. Kills the token on the LoginRadius side so even if someone has the token string, it won't work anymore.

**Query params:** `apikey`

**Headers:** `Authorization: <access_token>`

**Response:**
```json
{ "IsPosted": true }
```

---

#### `GET https://api.loginradius.com/api/v2/access_token/Validate`

Checks whether a token is still valid. Used before allowing protected routes.

**Query params:** `key` (API key), `secret` (API secret), `access_token`

**Response:** Returns the token details if valid, error if expired or invalid.

---

#### `GET https://api.loginradius.com/identity/v2/manage/account/access_token`

Gets an `access_token` and `refresh_token` for a user by their UID. This is useful for admin flows or impersonation — it's a Management API call so it needs `apisecret`.

**Query params:** `apikey`, `apisecret`, `uid`

**Response:**
```json
{
  "access_token": "...",
  "refresh_token": "..."
}
```

---

### Phone Verification

#### `POST https://api.loginradius.com/identity/v2/auth/phone/otp`

Sends an OTP to a phone number for phone verification (separate from 2FA login — this is for verifying the phone number on a registered account).

**Query params:** `apikey`

**Request body:**
```json
{ "phone": "+919876543210" }
```

**Response:**
```json
{ "IsPosted": true }
```

---

#### `PUT https://api.loginradius.com/identity/v2/auth/phone/otp`

Verifies the OTP that was sent to the phone number.

**Query params:** `apikey`, `otp`

**Request body:**
```json
{ "phone": "+919876543210" }
```

**Response:**
```json
{ "access_token": "..." }
```

---

### SSO Hub API (Called from the Frontend)

These three calls go directly from the browser to the LoginRadius SSO hub — they don't route through our Express backend. The hub is a shared domain that all connected apps use to exchange session state via cookies.

#### Set SSO Token — `GET https://testing874.hub.loginradius.com/ssologin/setToken`

After a successful login, App 1 calls this to write the session to the hub.

```
GET https://testing874.hub.loginradius.com/ssologin/setToken
  ?token=<access_token>
  &apikey=<api_key>
```

Called with `credentials: "include"` so the hub can set a cross-domain cookie.

---

#### Check SSO Session — `GET https://testing874.hub.loginradius.com/ssologin/login`

When App 2 loads, it calls this to check if a session already exists.

```
GET https://testing874.hub.loginradius.com/ssologin/login
```

**Response if authenticated:**
```json
{ "isauthenticated": true, "token": "<access_token>" }
```

If `isauthenticated` is `true` and `token` is present, App 2 stores the token in cookies and the user is in — no login screen.

---

#### Clear SSO Session — `GET https://testing874.hub.loginradius.com/ssologin/logout`

Called on logout. This clears the hub session so App 2 won't pick up an old token.

```
GET https://testing874.hub.loginradius.com/ssologin/logout
```

---

## All Express API Routes

Here's a quick reference for every route the backend exposes to the frontends:

| Method | Route | What it does |
|--------|-------|--------------|
| `POST` | `/api/register` | Create account + send verification email |
| `GET` | `/api/verifyEmail` | Verify email token, return session tokens |
| `POST` | `/api/login` | Validate credentials, trigger 2FA OTP |
| `GET` | `/api/verifyEmailOtpToLogin` | Verify 2FA OTP, return session tokens |
| `POST` | `/api/forgot-password` | Send password reset email |
| `POST` | `/api/resetPassword` | Set new password using reset token |
| `GET` | `/api/sendMobileVerificationOTP` | Send OTP to phone number |
| `GET` | `/api/VerifyMobileByOTP` | Verify phone OTP |
| `GET` | `/api/profile` | Get user profile (requires access token) |
| `POST` | `/api/refresh-token` | Exchange refresh token for new access token |
| `GET` | `/api/invalidateAccessToken` | Logout — kill token on LoginRadius |
| `GET` | `/api/validateToken` | Check if an access token is still valid |
| `GET` | `/api/getAccessTokenUsingUID` | Get token by user UID (admin use) |

---

## Authentication Flows — Step by Step

### Registration + Email Verification

```
1. User fills form → POST /api/register
2. Express calls LoginRadius: POST /identity/v2/manage/account (creates user)
3. Express calls LoginRadius: POST /identity/v2/manage/account/verify/token (gets VerificationToken)
4. Express sends email via Nodemailer with link:
   http://localhost:5174/verify-email?vtoken=<token>&email=<email>
5. User clicks link → GET /api/verifyEmail?token=...&email=...
6. Express calls LoginRadius: GET /identity/v2/auth/email
7. User gets access_token + refresh_token → stored in cookies → logged in
```

### Login with 2FA

```
1. User enters email/phone + password → POST /api/login
2. Express calls LoginRadius: POST /identity/v2/auth/login/2fa
   → LoginRadius returns SecondFactorAuthenticationToken (not real tokens yet)
3. Express immediately calls LoginRadius to send OTP:
   → Email OTP: POST /identity/v2/auth/login/2fa/otp/email
   → SMS OTP:   PUT  /identity/v2/auth/login/2FA
4. Frontend shows OTP entry screen
5. User enters OTP → GET /api/verifyEmailOtpToLogin?mfa_token=...&otp=...&email_id=...
6. Express calls LoginRadius:
   → Email OTP: PUT /identity/v2/auth/login/2fa/verification/otp/email
   → Phone OTP: PUT /identity/v2/auth/login/2FA/verification/otp
7. LoginRadius returns access_token + refresh_token
8. Tokens stored in cookies → user lands on Profile page
9. Frontend calls setSSOToken(access_token) → pushes token to LoginRadius SSO hub
```

### SSO — Seamless Login on App 2

```
1. User is logged in on App 1 (port 5173)
   → setSSOToken() wrote the token to https://testing874.hub.loginradius.com

2. User opens App 2 (port 5174)
   → On load, checkSSOSession() fetches https://testing874.hub.loginradius.com/ssologin/login
   → Hub responds: { isauthenticated: true, token: "..." }
   → Frontend stores token in cookies
   → User is authenticated — no login screen shown
```

### Logout

```
1. User clicks logout
2. Frontend calls GET /api/invalidateAccessToken (with access_token in Authorization header)
3. Express calls LoginRadius: GET /identity/v2/auth/access_token/InValidate
4. Frontend calls clearSSOSession() → hits the hub /ssologin/logout endpoint
5. Frontend deletes access_token + refresh_token cookies
6. User redirected to login screen
```

---

## Running It Locally

### What You Need

- **Node.js** v18 or higher
- **pnpm** v9 — `npm install -g pnpm`
- A **LoginRadius free account** — sign up at loginradius.com
- A **Gmail account** with an App Password set up (Settings → Security → 2-Step Verification → App passwords)

---

### Step 1 — Clone and install

```bash
git clone <your-repo-url>
cd sdk-implementation
pnpm install
```

One command installs all dependencies across all three apps.

---

### Step 2 — Set up your LoginRadius app

1. Log into the [LoginRadius Admin Console](https://console.loginradius.com/)
2. Go to **Application → Tenant Settings** — copy your `API Key`, `API Secret`, and note your `App Name` (this is your site name)
3. Go to **Security → Multi-Factor Authentication** — enable it, turn on Email OTP and SMS OTP
5. Go to **Application → Tenant Settings ->Configured Domains** — add whitelist entries for:
   - `http://localhost`
6. Go to **Application → Cross-Origin Authentication** (CORS) — add both localhost origins there too

---

### Step 3 — Create your `.env` file

Create `.env` at the **root** of the project (next to `package.json`):

```env
# ── LoginRadius credentials ───────────────────────────────────
API_DOMAIN=api.loginradius.com
API_URL=https://api.loginradius.com
API_KEY=your_api_key_here
API_SECRET=your_api_secret_here
VITE_LR_SITE_NAME=your_app_name_here
VITE_LR_API_KEY=your_api_key_here

# ── Email sending via Gmail ───────────────────────────────────
EMAIL_USER=you@gmail.com
EMAIL_PASS=your_gmail_app_password

# ── Frontend points to backend ───────────────────────────────
VITE_BACKENDURL=http://localhost:5000

# ── LoginRadius API endpoint paths ───────────────────────────
ACCOUNT_CREATE=/identity/v2/manage/account
FORGOT_PASSWORD_TOKEN=/identity/v2/manage/account/forgot/token
REST_PASSWORD_BY_TOKEN=/identity/v2/auth/password/reset
EMAIL_VERIFICATION_TOKEN=/identity/v2/manage/account/verify/token
INVALIDATE_ACCESS_TOKEN=/identity/v2/auth/access_token/InValidate
LOGIN_API=/identity/v2/auth/login/2fa
EMAIL_VERIFICATION=/identity/v2/auth/email
PROFILE_DETAILS=/identity/v2/auth/account
PHONE_VERIFICATION_OTP_SEND=/identity/v2/auth/phone/otp
PHONE_VERFICATION_OTP_VALIDATION=/identity/v2/auth/phone/otp
SEND_EMAIL_MFA_OTP=/identity/v2/auth/login/2fa/otp/email
SEND_PHONE_MFA_OTP=/identity/v2/auth/login/2FA
SMS_OTP_MFA_VERIFICATIOn=/identity/v2/auth/login/2fa/verification/otp/email
PHONE_OTP_MFA_VERIFICATIOn=/identity/v2/auth/login/2FA/verification/otp
ACCESS_TOKEN_BY_UID=/identity/v2/manage/account/access_token
VALIDATE_ACCESS_TOKEN=/api/v2/access_token/Validate
REFRESH_ACCESS_TOKEN=/identity/v2/auth/access_token/refresh
```

---

### Step 4 — Start everything

```bash
pnpm dev
```

Turborepo fires up all three services in parallel. You'll see logs from all three in your terminal.

| Service | URL |
|---------|-----|
| Express API | `http://localhost:5000` |
| React App 1 | `http://localhost:5173` |
| React App 2 | `http://localhost:5174` |

---

### Step 5 — Walk through the full flow

1. Open `http://localhost:5173` and register (full name, email, phone, password)
2. Check your inbox — click the verification link
3. Log in — enter your credentials, then enter the OTP from your email (or SMS if you used a phone number)
4. You're on the Profile page
5. Open `http://localhost:5174` in the **same browser** — you should land directly on the Profile page without logging in

---

## A Few Things Worth Knowing

**Why cookies and not localStorage?**
Cookies with `SameSite=Strict` are a safer default for tokens. localStorage is accessible to any JS on the page, including third-party scripts. For this project both work, but the cookie approach is a better habit.

**Why is the API_SECRET never in the Vite env?**
Anything prefixed with `VITE_` in a `.env` file gets bundled into the frontend JavaScript. If you ever put `API_SECRET` there, it'll be visible to anyone who opens DevTools. The secret stays backend-only.

**The SSO hub needs `credentials: "include"`**
The hub sets a cookie on its own domain (`hub.loginradius.com`). For that cookie to be sent on subsequent requests, the fetch calls must include `credentials: "include"`. Without it, the browser won't attach the hub cookie and SSO won't work.

**Phone numbers and the +91 prefix**
The login flow hardcodes `+91` for phone-based login. If you're building for other regions, you'll want to let users specify their country code or auto-detect it.

---

## Troubleshooting

**"CORS error" in the browser console**
Go to your LoginRadius dashboard and add `http://localhost:5173` and `http://localhost:5174` to both the app whitelist and the CORS whitelist. The Express backend also needs to allow these origins — check that `app.use(cors())` doesn't have an `origin` restriction.

**Verification email never arrives**
The `EMAIL_PASS` must be a Gmail **App Password**, not your regular Gmail password. Gmail App Passwords are 16-character codes — go to Google Account → Security → 2-Step Verification → App passwords to generate one. Also check spam.

**SSO not working — still seeing login screen on App 2**
Both apps need to be open in the same browser session (same cookie jar). Incognito windows and different browsers don't share the hub cookie. Also confirm SSO is enabled in the LoginRadius dashboard and both localhost URLs are whitelisted.

**OTP never arrives by SMS**
Check that your LoginRadius account has an SMS provider configured (Twilio is the default). The SMS feature is not available on all free tier plans — check your plan limits in the dashboard.

**Login fails with "Email not verified" error**
LoginRadius won't allow login if the email isn't verified. Go through the full registration → verify email flow first.

---
