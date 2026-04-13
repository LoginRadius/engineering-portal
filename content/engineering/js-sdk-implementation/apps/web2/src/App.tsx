import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./App.css";
import { getCookie, setCookie } from "./cookieUtils";
import { checkSSOSession, setSSOToken } from "./ssoUtils";
import LoginSuccess from "./LoginSuccess";
import RegisterSuccess from "./RegisterSuccess";
import PasswordChangedSuccess from "./PasswordChangedSuccess";
import PasswordChangePage from "./PasswordChangePage";
import VerifyEmail from "./verifyEmail";
import Profile from "./Profile";
import VerifyOTP from "./VerifyOTP";
import ResetPasswordLink from "./ResetPasswordLink";
import SelectMFA from "./SelectMfa";

function AuthPage() {
  const navigate = useNavigate();

  const [view, setView] = useState<"login" | "register" | "forgot">("login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");

  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);
  const [mfaConfig, setMfaConfig] = useState<{ IsEnabled: Boolean, IsEmailOTPAuthenticator: boolean; IsSmsOTPAuthenticator: boolean } | null>(null);

  useEffect(() => {
    const token = getCookie("access_token");
    if (token) {
      navigate("/profile");
      return;
    }
    // Check for an active SSO session from another connected app
    checkSSOSession().then((ssoToken) => {
      if (ssoToken) {
        setCookie("access_token", ssoToken);
        navigate("/profile");
      }
    });
  }, []);
  useEffect(() => {
    fetch(`https://config.lrcontent.com/ciam/appinfo?apikey=${import.meta.env.VITE_LR_API_KEY}`)
      .then((r) => r.json())
      .then((data) => {
        const tfa = data?.TwoFactorAuthentication;
        console.log("tfa is ", tfa)
        setMfaConfig({
          IsEnabled: Boolean(tfa?.IsEnabled),
          IsEmailOTPAuthenticator: tfa?.IsEmailOTPAuthenticator || false,
          IsSmsOTPAuthenticator: tfa?.IsSmsOTPAuthenticator || false,
        });
        console.log("mfa config is on start ", mfaConfig)
      })
      .catch(() => setMfaConfig({ IsEnabled: false, IsEmailOTPAuthenticator: false, IsSmsOTPAuthenticator: false }));
  }, []);
  useEffect(() => {
    console.log("mfa config updated:", mfaConfig);
  }, [mfaConfig]);

  const changeView = (newView: "login" | "register" | "forgot") => {
    setView(newView);
    setErrors({});
    setEmail("");
    setEmailOrPhone("");
    setPassword("");
    setFullName("");
    setConfirmPassword("");
    setMobile("");
  };

  const validate = () => {
    let newErrors: any = {};

    if (view === "login") {
      if (!emailOrPhone) newErrors.emailOrPhone = "Email or phone is required";
      else if (
        !/^\S+@\S+\.\S+$/.test(emailOrPhone) &&
        !/^[0-9]{10}$/.test(emailOrPhone)
      )
        newErrors.emailOrPhone = "Enter a valid email or 10-digit phone number";
    } else {
      if (!email) newErrors.email = "Email is required";
      else if (!/^\S+@\S+\.\S+$/.test(email))
        newErrors.email = "Invalid email";
    }

    if (view !== "forgot") {
      if (!password) newErrors.password = "Password required";
      else if (password.length < 6)
        newErrors.password = "Min 6 characters";
    }

    if (view === "register") {
      if (!fullName.trim()) {
        newErrors.fullName = "Full name is required";
      }

      if (password !== confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";

      if (!mobile) {
        newErrors.mobile = "Mobile number is required";
      } else if (!/^[0-9]{10}$/.test(mobile)) {
        newErrors.mobile = "Enter valid 10-digit mobile number";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate() || isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setIsSubmitting(true);

    try {
      if (view === "register") {
        const res = await fetch(`${import.meta.env.VITE_BACKENDURL}/api/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            mobile,
            fullName
          }),
        });

        const data = await res.json();


        if (res.status === 200 && data.status === true) {
          navigate("/register-success");
        } else {
          // ❌ Show backend message
          alert(data.message);
        }
      }

      if (view === "login") {
        const res = await fetch(`${import.meta.env.VITE_BACKENDURL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailOrPhone,
            password
          }),
        });

        const data = await res.json();
        if (res.status === 200 && data.status === true && data.SecondFactorAuthentication) {
          const { SecondFactorAuthentication, IsEmailOtpAuthenticatorVerified, IsOTPAuthenticatorVerified, Email, OTPPhoneNo } = data;
          console.log("mfaconfig is ", mfaConfig);
          if (!mfaConfig?.IsEnabled) {
            setCookie("access_token", data.access_token);
            setCookie("refresh_token", data.refresh_token);
            await setSSOToken(data.access_token);
            navigate("/profile");
          } else if (mfaConfig?.IsEnabled && mfaConfig.IsEmailOTPAuthenticator && mfaConfig.IsSmsOTPAuthenticator) {
            if (!IsEmailOtpAuthenticatorVerified && !IsOTPAuthenticatorVerified) {
              navigate("/select-mfa", {
                state: {
                  emailOrPhone,
                  SecondFactorAuthentication: SecondFactorAuthentication,
                  emailEnabled: true,
                  phoneEnabled: true,
                  Email: Email,
                  OTPPhoneNo: OTPPhoneNo
                }
              });
            }
            else {
              if (IsEmailOtpAuthenticatorVerified && !IsOTPAuthenticatorVerified) {
                navigate(`/verify?type=otp_verification&mfa_token=${SecondFactorAuthentication}&email_id=${emailOrPhone}&otp_type=email`);
              } else if (!IsEmailOtpAuthenticatorVerified && IsOTPAuthenticatorVerified) {
                navigate(`/verify?type=otp_verification&mfa_token=${SecondFactorAuthentication}&email_id=${emailOrPhone}&otp_type=phone`);
              }
            }
          } else if (mfaConfig?.IsEnabled && mfaConfig.IsEmailOTPAuthenticator && !mfaConfig.IsSmsOTPAuthenticator) {
            if (!IsEmailOtpAuthenticatorVerified) {
              await fetch(`${import.meta.env.VITE_BACKENDURL}/api/sendManualOTPAfterLogin`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  secondfactorauthenticationtoken: SecondFactorAuthentication,
                  emailOrPhone,
                  type: "email"
                }),
              });
              navigate(`/verify?type=otp_verification&mfa_token=${SecondFactorAuthentication}&email_id=${emailOrPhone}&otp_type=email`);
            } else {
              navigate(`/verify?type=otp_verification&mfa_token=${SecondFactorAuthentication}&email_id=${emailOrPhone}&otp_type=email`);
            }

          } else if (mfaConfig?.IsEnabled && !mfaConfig.IsEmailOTPAuthenticator && mfaConfig.IsSmsOTPAuthenticator) {
            if (!IsOTPAuthenticatorVerified) {
              await fetch(`${import.meta.env.VITE_BACKENDURL}/api/sendManualOTPAfterLogin`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  secondfactorauthenticationtoken: SecondFactorAuthentication,
                  emailOrPhone,
                  type: "phone"
                }),
              });
              navigate(`/verify?type=otp_verification&mfa_token=${SecondFactorAuthentication}&email_id=${emailOrPhone}&otp_type=phone`);
            } else {
              navigate(`/verify?type=otp_verification&mfa_token=${SecondFactorAuthentication}&email_id=${emailOrPhone}&otp_type=phone`);
            }
          }
          // console.log("LOGIN SUCESSSS")
          // navigate(`/verify?type=otp_verification&mfa_token=${data.SecondFactorAuthentication}&email_id=${emailOrPhone}&otp_type=${data.type}`);
        } else {
          // ❌ Show backend message
          alert(data.message);
        }
      }

      if (view === "forgot") {
        const res = await fetch(import.meta.env.VITE_BACKENDURL + "/api/forgot-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email
          }),
        });

        const data = await res.json();


        if (res.status === 200 && data.status === true) {
          navigate("/password-reset");
        } else {
          // ❌ Show backend message
          alert(data.message);
        }
      }
    } catch (err: any) {
      alert(err.message); // you can improve UI later
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>
          {view === "login" && "Welcome Back"}
          {view === "register" && "Create Account"}
          {view === "forgot" && "Forgot Password"}
        </h2>

        {view === "login" && (
          <>
            <input
              type="text"
              placeholder="Email / Phone"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
            />
            {errors.emailOrPhone && <p className="error">{errors.emailOrPhone}</p>}
          </>
        )}

        {view === "register" && (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </>
        )}

        {view === "login" && (
          <>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </>
        )}

        {view === "register" && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {errors.fullName && <p className="error">{errors.fullName}</p>}

            <input
              type="text"
              placeholder="Mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            {errors.mobile && <p className="error">{errors.mobile}</p>}

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error">{errors.password}</p>}

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}
          </>
        )}

        {view === "forgot" && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </>
        )}

        <button className="primary" onClick={handleSubmit} disabled={isSubmitting}>
          {view === "login" && "Login"}
          {view === "register" && "Register"}
          {view === "forgot" && "Send Reset Link"}
        </button>

        <div className="links">
          {view === "login" && (
            <>
              <span onClick={() => changeView("forgot")}>
                Forgot Password?
              </span>
              <span onClick={() => changeView("register")}>
                Create Account
              </span>
            </>
          )}

          {view === "register" && (
            <span onClick={() => changeView("login")}>
              Already have an account? Login
            </span>
          )}

          {view === "forgot" && (
            <span onClick={() => changeView("login")}>
              Back to Login
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/login-success" element={<LoginSuccess />} />
      <Route path="/register-success" element={<RegisterSuccess />} />
      <Route path="/password-changed" element={<PasswordChangedSuccess />} />
      <Route path="/password-change" element={<PasswordChangePage />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/verify" element={<VerifyOTP />} />
      <Route path="/password-reset" element={<ResetPasswordLink />} />
      <Route path="/select-mfa" element={<SelectMFA />} />
    </Routes>
  );
}