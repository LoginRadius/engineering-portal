import React, { useEffect, useState } from "react";

const Dashboard: React.FC = () => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("token we got is ", token)

        fetch("http://localhost:5000/protected", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((res) => setData(res))
            .catch(() => alert("Unauthorized"));
    }, []);

    return (
        <div>
            <h1>Dashboard ✅</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>

            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                }}
            >
                Logout
            </button>
        </div>
    );
};

export default Dashboard;