import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function SelectMFA() {
    const navigate = useNavigate();
    const location = useLocation();

    const state = location.state;

    // 🚨 Redirect if user refreshes page
    useEffect(() => {
        if (!state) {
            alert("Session expired. Please login again.");
            navigate("/");
        }
    }, [state, navigate]);

    const {
        SecondFactorAuthentication,
        emailEnabled,
        phoneEnabled,
        Email,
        OTPPhoneNo,
    } = state || {};

    const [phoneInput, setPhoneInput] = useState("");
    const [showPhoneInput, setShowPhoneInput] = useState(false);
    const [loading, setLoading] = useState(false);

    // ✅ Common OTP API
    const sendOTP = async (value: string, type: "email" | "phone") => {
        setLoading(true);

        try {
            await fetch(
                `${import.meta.env.VITE_BACKENDURL}/api/sendManualOTPAfterLogin`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        secondfactorauthenticationtoken: SecondFactorAuthentication,
                        emailOrPhone: value,
                        type: type,
                    }),
                }
            );

            navigate(
                `/verify?type=otp_verification&mfa_token=${SecondFactorAuthentication}&email_id=${value}&otp_type=${type}`
            );
        } catch (err: any) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Handle button clicks
    const handleSelect = async (type: "email" | "phone") => {
        if (type === "email") {
            await sendOTP(Email, "email");
            return;
        }

        if (type === "phone") {
            // 👉 If phone missing → show input UI
            if (!OTPPhoneNo) {
                setShowPhoneInput(true);
                return;
            }

            // 👉 If phone exists → send OTP
            await sendOTP(OTPPhoneNo, "phone");
        }
    };

    // ✅ Submit entered phone
    const handlePhoneSubmit = async () => {
        if (!/^[0-9]{10}$/.test(phoneInput)) {
            alert("Enter valid 10-digit mobile number");
            return;
        }

        await sendOTP(phoneInput, "phone");
    };

    return (
        <div className="container">
            <div className="card glass">
                <h2>
                    {showPhoneInput ? "Enter Mobile Number" : "Select MFA Method"}
                </h2>

                {!showPhoneInput ? (
                    <>
                        <p>Choose how you want to receive your OTP</p>

                        {/* ✅ MFA Options */}
                        <div className="mfa-options">
                            {emailEnabled && (
                                <button
                                    disabled={loading}
                                    onClick={() => handleSelect("email")}
                                >
                                    📧 Email OTP
                                </button>
                            )}

                            {phoneEnabled && (
                                <button
                                    disabled={loading}
                                    onClick={() => handleSelect("phone")}
                                >
                                    📱 SMS OTP
                                </button>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        {/* ✅ Phone Input UI */}
                        <div className="phone-input-box">
                            <p>Enter your mobile number to receive OTP</p>

                            <input
                                type="text"
                                placeholder="Enter mobile number"
                                value={phoneInput}
                                onChange={(e) => setPhoneInput(e.target.value)}
                            />

                            <button disabled={loading} onClick={handlePhoneSubmit}>
                                {loading ? "Sending..." : "Send OTP"}
                            </button>

                            {/* 🔙 Back Button */}
                            <button
                                className="back-btn"
                                onClick={() => setShowPhoneInput(false)}
                            >
                                ← Back
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}