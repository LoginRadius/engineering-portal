const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

var config = {
    apiDomain: process.env.API_DOMAIN,
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
    siteName: process.env.SITE_NAME,
    apiRequestSigning: false,
    proxy: {
        host: "",
        port: "",
        user: "",
        password: "",
    },
};
var lrv2 = require("loginradius-sdk")(config);
// 🔐 Verify LoginRadius token
async function verifyUser(token) {
    console.log("token passed from frontend is ", token);
    lrv2.authenticationApi
        .authValidateAccessToken(token)
        .then((response) => {
            console.log(response);
            return true;
        })
        .catch((error) => {
            console.log(error);
            return false;
        });
}

// 🔒 Protected route
app.get("/protected", async (req, res) => {
    console.log("protected is called")
    const token = req.headers.authorization?.split(" ")[1];

    try {
        const user = await verifyUser(token);
        res.json({ message: "Success ✅", user });
    } catch (err) {
        res.status(401).json({ error: "Unauthorized ❌" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});