const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });

const config = {
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

const lrv2 = require("loginradius-sdk")(config);

// ✅ export it
module.exports = lrv2;