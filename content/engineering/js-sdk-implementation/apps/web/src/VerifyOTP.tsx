import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import { getCookie, setCookie } from "./cookieUtils";
import { setSSOToken } from "./ssoUtils";

export default function VerifyOTP() {
    console.log("Full URL:", window.location.href);
    const navigate = useNavigate();
    const location = useLocation();

    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);

    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    // ✅ Get type safely
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get("type") as
        | "mobile_verification"
        | "otp_verification"
        | null;
    const mfa_token = queryParams.get("mfa_token") as string | null;
    const email_id = queryParams.get("email_id") as string | null;
    const screen_type = queryParams.get("otp_type") as string | null;
    // ✅ Protect route
    useEffect(() => {
        if (type != "otp_verification") {
            const accessToken = getCookie("access_token");
            if (!accessToken || !type) {
                navigate("/");
            }
        }
    }, [navigate, type]);

    // ✅ Handle OTP input
    const handleChange = (value: string, index: number) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    // ✅ API mapping
    const API_MAP = {
        mobile_verification: {
            url: "/api/VerifyMobileByOTP",
            redirect: "/profile",
        },
        otp_verification: {
            url: "/api/verifyEmailOtpToLogin",
            redirect: "/profile",
        },
    };

    // ✅ Submit
    const handleSubmit = async () => {
        const enteredOtp = otp.join("");

        if (enteredOtp.length !== 6) {
            alert("Enter valid 6-digit OTP");
            return;
        }

        const accessToken = getCookie("access_token");
        if (!type || !API_MAP[type]) {
            alert("Invalid type");
            navigate("/");
            return;
        }

        const apiConfig = API_MAP[type];

        setLoading(true);

        try {
            const mobile = JSON.parse(localStorage.getItem("user") || "{}").mobile || "";
            const queryParams = new URLSearchParams({
                otp: enteredOtp,
                mobile,
                mfa_token: mfa_token || "",
                email_id: email_id || "",
                type: screen_type || ""
            });

            const res = await fetch(
                `${import.meta.env.VITE_BACKENDURL}${apiConfig.url}?${queryParams.toString()}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            const data = await res.json();

            if (res.status === 200 && data.status === true) {
                if (type == "otp_verification") {
                    if (data.access_token && data.refresh_token) {
                        // 🔐 Store tokens in cookies (SSO)
                        setCookie("access_token", data.access_token);
                        setCookie("refresh_token", data.refresh_token);
                        // 🧠 Store only user info in localStorage
                        localStorage.setItem("user", JSON.stringify({
                            mobile: data.mobile_number || ""
                        }));
                        await setSSOToken(data.access_token);
                        navigate(apiConfig.redirect);
                    } else {
                        navigate("/");
                    }
                } else {
                    navigate(apiConfig.redirect);
                }
            } else {
                alert("Invalid OTP ❌");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2>
                    {type === "mobile_verification"
                        ? "Verify Mobile 📱"
                        : "Verify OTP 🔐"}
                </h2>

                <p>Enter the 6-digit code</p>

                <div className="otp-container">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={digit}
                            ref={(el) => {
                                inputsRef.current[index] = el; // ✅ FIXED
                            }}
                            onChange={(e) =>
                                handleChange(e.target.value, index)
                            }
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="otp-input"
                        />
                    ))}
                </div>

                <button
                    className="primary"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? "Verifying..." : "Verify"}
                </button>
            </div>
        </div>
    );
}