import React, { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Dashboard: React.FC = () => {
    // console.log("Dashboard route triggered")
    // console.log(window.location.href);
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // ✅ Step 1: Extract token from URL
        const params = new URLSearchParams(window.location.search);
        // console.log("params are ", params);
        const urlToken = params.get("token");

        if (urlToken) {
            // console.log("Token from URL:", urlToken);

            // ✅ Step 2: Store token
            localStorage.setItem("token", urlToken);

            // ✅ Step 3: Clean URL (remove token)
            window.history.replaceState({}, document.title, "/dashboard");
        }

        // ✅ Step 4: Get token from storage
        const token = localStorage.getItem("token");
        // console.log("Token used:", token);

        // ❌ No token → redirect to login
        if (!token) {
            alert("No token found, please login");
            window.location.href = "/";
            return;
        }

        // ✅ Step 5: Call backend
        fetch(`${API_URL}/protected`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Unauthorized");
                return res.json();
            })
            .then((res) => {
                console.log("Backend response:", res);
                setData(res);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                alert("Unauthorized / Session expired");

                // ❌ Remove invalid token
                localStorage.removeItem("token");

                // 🔁 Redirect to login
                window.location.href = "/";
            });
    }, []);

    // 🔄 Loading UI
    if (loading) {
        return <h2 style={{ textAlign: "center" }}>Loading dashboard...</h2>;
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1>Dashboard ✅</h1>

            <h3>You have Already Logged In</h3>
            <pre>{JSON.stringify(data, null, 2)}</pre>

            <button
                style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    cursor: "pointer",
                }}
                onClick={async () => {
                    const token = localStorage.getItem("token");

                    try {
                        await fetch(`${API_URL}/logout`, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                        });
                    } catch (err) {
                        console.error("Logout API failed:", err);
                    }

                    // ✅ Clear token anyway (important)
                    localStorage.removeItem("token");

                    // 🔁 Redirect to login
                    window.location.href = "/";
                }}
            >
                Logout
            </button>
        </div>
    );
};

export default Dashboard;