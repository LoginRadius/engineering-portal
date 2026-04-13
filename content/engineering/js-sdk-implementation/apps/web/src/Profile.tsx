import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import { getCookie, setCookie, deleteCookie } from "./cookieUtils";
import { clearSSOSession } from "./ssoUtils";

export default function Profile() {
    const navigate = useNavigate();

    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const refreshAccessToken = async (): Promise<string | null> => {
        const refreshToken = getCookie("refresh_token");
        if (!refreshToken) return null;
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKENDURL}/api/refresh-token`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refresh_token: refreshToken }),
            });
            const data = await res.json();
            if (res.status === 200 && data.access_token) {
                setCookie("access_token", data.access_token);
                if (data.refresh_token) setCookie("refresh_token", data.refresh_token);
                return data.access_token;
            }
        } catch (err) {
            console.error("Token refresh failed:", err);
        }
        return null;
    };

    useEffect(() => {
        let accessToken = getCookie("access_token");
        if (!accessToken) {
            navigate("/");
            return;
        }

        const fetchProfile = async () => {
            try {
                let res = await fetch(
                    `${import.meta.env.VITE_BACKENDURL}/api/profile`,
                    {
                        method: "GET",
                        headers: { Authorization: `Bearer ${accessToken}` },
                    }
                );

                // 🔄 Try refresh if access token expired
                if (res.status === 401) {
                    const newToken = await refreshAccessToken();
                    if (!newToken) { logout(); return; }
                    accessToken = newToken;
                    res = await fetch(
                        `${import.meta.env.VITE_BACKENDURL}/api/profile`,
                        {
                            method: "GET",
                            headers: { Authorization: `Bearer ${accessToken}` },
                        }
                    );
                }

                const data = await res.json();

                if (res.status !== 200 || !data.status) {
                    logout();
                    return;
                }

                const apiUser = data.data;
                setUser({
                    fullName: apiUser.FullName,
                    email: apiUser.email,
                    mobile: apiUser.mobile_number,
                    uid: apiUser.Uid,
                });

            } catch (err) {
                console.error(err);
                logout();
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    // ✅ Clean Logout
    const logout = async () => {
        const accessToken = getCookie("access_token");
        try {
            if (accessToken) {
                await fetch(
                    `${import.meta.env.VITE_BACKENDURL}/api/invalidateAccessToken`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
            }
        } catch (err) {
            console.error("Logout API failed:", err);
        }

        await clearSSOSession();

        // ✅ Clear tokens from cookies and user info from localStorage
        deleteCookie("access_token");
        deleteCookie("refresh_token");
        localStorage.removeItem("user");

        navigate("/");
    };

    if (loading) {
        return (
            <div className="container">
                <div className="card">
                    <h2>Loading Profile...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="card">
                <h2>Hi {user?.fullName || "User"} 👋</h2>

                <div className="profile-field">
                    <label>Full Name</label>
                    <p>{user?.fullName || "N/A"}</p>
                </div>

                <div className="profile-field">
                    <label>Email</label>
                    <p>{user?.email || "N/A"}</p>
                </div>

                <div className="profile-field">
                    <label>Mobile</label>
                    <p>{user?.mobile || "N/A"}</p>
                </div>

                <button className="primary logout" onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    );
}