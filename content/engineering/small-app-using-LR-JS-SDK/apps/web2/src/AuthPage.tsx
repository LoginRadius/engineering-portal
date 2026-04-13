import React, { useEffect, useState } from "react";

const REGISTER_URL = import.meta.env.VITE_REGISTER_URL;
const LOGIN_URL = import.meta.env.VITE_LOGIN_URL;

const AuthPage: React.FC = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("token is ", token)
        // ✅ Check if already logged in
        if (token) {
            window.location.href = "/dashboard";
        } else {
            setLoading(false);
        }
    }, []);

    const handleRegister = () => {
        window.location.href = REGISTER_URL;
    };

    const handleLogin = () => {
        window.location.href = LOGIN_URL;
    };

    // 🔄 Loading state while checking auth
    if (loading) {
        return (
            <div style={styles.page}>
                <div style={styles.card}>
                    <h2 style={{ color: "#555" }}>Checking session...</h2>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h1 style={styles.title}>Welcome 👋</h1>
                <p style={styles.subtitle}>
                    Secure authentication powered by LoginRadius
                </p>

                <div style={styles.buttonContainer}>
                    <button
                        style={styles.loginButton}
                        onClick={handleLogin}
                        onMouseOver={(e) =>
                            (e.currentTarget.style.transform = "scale(1.05)")
                        }
                        onMouseOut={(e) =>
                            (e.currentTarget.style.transform = "scale(1)")
                        }
                    >
                        Login
                    </button>

                    <button
                        style={styles.registerButton}
                        onClick={handleRegister}
                        onMouseOver={(e) => {
                            e.currentTarget.style.background = "#4f46e5";
                            e.currentTarget.style.color = "#fff";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.color = "#4f46e5";
                        }}
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    page: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        fontFamily: "Segoe UI, sans-serif",
    },
    card: {
        background: "#fff",
        padding: "40px",
        borderRadius: "16px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        textAlign: "center",
        width: "340px",
        animation: "fadeIn 0.5s ease-in-out",
    },
    title: {
        marginBottom: "10px",
        fontSize: "28px",
        color: "#333",
    },
    subtitle: {
        marginBottom: "30px",
        color: "#666",
        fontSize: "14px",
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    loginButton: {
        padding: "12px",
        fontSize: "16px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        background: "#4f46e5",
        color: "#fff",
        fontWeight: "bold",
        transition: "all 0.3s ease",
    },
    registerButton: {
        padding: "12px",
        fontSize: "16px",
        borderRadius: "8px",
        border: "2px solid #4f46e5",
        cursor: "pointer",
        background: "transparent",
        color: "#4f46e5",
        fontWeight: "bold",
        transition: "all 0.3s ease",
    },
};

export default AuthPage;