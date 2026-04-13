import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import { setCookie } from "./cookieUtils";
import { setSSOToken } from "./ssoUtils";

export default function VerifyEmail() {
    const location = useLocation();
    const navigate = useNavigate();

    // Extract token from URL
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("vtoken");
    const email = queryParams.get("email");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        const callAPI = async () => {
            if (!token) {
                setError("Invalid or missing token");
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(
                    `${import.meta.env.VITE_BACKENDURL}/api/verifyEmail?token=${token}&email=${email}`,
                    {
                        method: "GET",
                        signal: controller.signal,
                    }
                );

                const data = await res.json();
                console.log("API SUCCESS", data);
                if (res.status === 200 && data.status === true) {
                    // console.log("API SUCCESS", data);

                    if (data.access_token && data.refresh_token && data.mobile_number) {
                        // 🔐 Store tokens in cookies (SSO)
                        setCookie("access_token", data.access_token);
                        setCookie("refresh_token", data.refresh_token);
                        // 🧠 Store only user info in localStorage
                        localStorage.setItem("user", JSON.stringify({
                            mobile: data.mobile_number
                        }));
                        await setSSOToken(data.access_token);
                        await fetch(
                            `${import.meta.env.VITE_BACKENDURL}/api/sendMobileVerificationOTP?mobile=${data.mobile_number}`,
                            {
                                method: "GET"
                            }
                        );
                    }

                    setSuccess(true);
                    setTimeout(() => {
                        navigate("/verify?type=mobile_verification");
                    }, 2000);
                } else {
                    setError(data.message || "Something went wrong");
                }
            } catch (err: any) {
                if (err.name === "AbortError") return;
                console.error(err);
                setError("Failed to process request");
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        };

        callAPI();

        return () => controller.abort();
    }, [token, navigate]);

    return (
        <div className="container">
            <div className="card">
                <h2>Processing Request</h2>

                {/* Loading */}
                {loading && <p>Verifying... ⏳</p>}

                {/* Success */}
                {!loading && success && (
                    <p style={{ color: "#4ade80" }}>
                        ✅ Success! Redirecting...
                    </p>
                )}

                {/* Error */}
                {!loading && error && (
                    <>
                        <p className="error">{error}</p>
                        <div className="links">
                            <span onClick={() => navigate("/")}>
                                Back to Login
                            </span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}