import { useEffect } from "react";

const Callback: React.FC = () => {
    useEffect(() => {
        // ✅ get query params instead of hash
        const search = window.location.search;

        const params = new URLSearchParams(search);

        const token = params.get("token");

        console.log("Token:", token);

        if (token) {
            localStorage.setItem("token", token);
            window.location.href = "/dashboard";
        }
    }, []);

    return <h2>Logging in...</h2>;
};

export default Callback;