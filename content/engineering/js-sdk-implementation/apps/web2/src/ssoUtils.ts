const LR_SITE_NAME = import.meta.env.VITE_LR_SITE_NAME;
const LR_API_KEY = import.meta.env.VITE_LR_API_KEY;

const hubBase = `https://${LR_SITE_NAME}.hub.loginradius.com/ssologin`;

/**
 * Sets the SSO token on the LoginRadius hub domain after a successful login.
 * This enables other connected apps to pick up the session automatically.
 */
export async function setSSOToken(token: string): Promise<void> {
    if (!LR_SITE_NAME || !LR_API_KEY || LR_SITE_NAME === "YOUR_LR_SITE_NAME") return;
    try {
        await fetch(
            `${hubBase}/setToken?token=${encodeURIComponent(token)}&apikey=${LR_API_KEY}`,
            { credentials: "include" }
        );
    } catch (err) {
        console.error("SSO setToken failed:", err);
    }
}

/**
 * Checks if an active SSO session exists on the LoginRadius hub.
 * Returns the access token if authenticated, or null if not.
 */
export async function checkSSOSession(): Promise<string | null> {
    if (!LR_SITE_NAME || !LR_API_KEY || LR_SITE_NAME === "YOUR_LR_SITE_NAME") return null;
    try {
        const res = await fetch(`${hubBase}/login`, { credentials: "include" });
        if (!res.ok) return null;
        const data = await res.json();
        if (data.isauthenticated && data.token) return data.token;
    } catch (err) {
        console.error("SSO session check failed:", err);
    }
    return null;
}

/**
 * Clears the SSO session on the LoginRadius hub during logout.
 * This logs the user out of all connected SSO apps.
 */
export async function clearSSOSession(): Promise<void> {
    if (!LR_SITE_NAME || !LR_API_KEY || LR_SITE_NAME === "YOUR_LR_SITE_NAME") return;
    try {
        await fetch(`${hubBase}/logout`, { credentials: "include" });
    } catch (err) {
        console.error("SSO logout failed:", err);
    }
}
