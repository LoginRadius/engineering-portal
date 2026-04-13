import React from "react";
import { useNavigate } from "react-router-dom";

const RegistrationSuccess: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h1>🎉 Registration Successful!</h1>
            <p>Your account has been created successfully.</p>

            <button
                style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    cursor: "pointer",
                }}
                onClick={() => navigate("/")}
            >
                Go to Home
            </button>
        </div>
    );
};

export default RegistrationSuccess;