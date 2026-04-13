import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";

export default function PasswordChangePage() {
    const location = useLocation();
    const navigate = useNavigate();

    // Get token from URL
    const queryParams = new URLSearchParams(location.search);
    const vtoken = queryParams.get("vtoken");

    // States
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Submit handler
    const handleSubmit = async () => {
        setError("");

        // ✅ Validations
        if (!password || !confirmPassword) {
            setError("All fields are required");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (!vtoken) {
            setError("Invalid or missing token");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch(
                import.meta.env.VITE_BACKENDURL + "/api/resetPassword",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        password,
                        vtoken,
                    }),
                }
            );

            const data = await res.json();

            if (res.status === 200 && data.status === true) {
                // ✅ success → redirect
                navigate("/password-changed");
            } else {
                setError(data.message || "Something went wrong");
            }
        } catch (err) {
            setError("Failed to change password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2>Set New Password</h2>

                {/* Password */}
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* Confirm Password */}
                <input
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                {/* Error message */}
                {error && <p className="error">{error}</p>}

                {/* Live mismatch hint */}
                {confirmPassword && password !== confirmPassword && (
                    <p className="error">Passwords do not match</p>
                )}

                {/* Button */}
                <button
                    className="primary"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Set Password"}
                </button>

                {/* Navigation */}
                <div className="links">
                    <span onClick={() => navigate("/")}>Back to Login</span>
                </div>
            </div>
        </div>
    );
}