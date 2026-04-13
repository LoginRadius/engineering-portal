const lrv2 = require("./config/login_radius_sdk");
const axios = require("axios");

const getProfileDetailsByAccessId = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const api_res = await axios.get(
            process.env.API_URL + process.env.PROFILE_DETAILS,
            {
                params: {
                    apikey: process.env.API_KEY
                },
                headers: {
                    // Authorization: `Bearer ${token}`
                    Authorization: token
                }
            }
        );
        // console.log("api_res is ", api_res.data)
        if (api_res && api_res.data.Uid) {
            const { Uid, FullName, Email, ID, EmailVerified, PhoneId } = api_res.data
            let user_data = { Uid, FullName, ID, verifiedEmail: EmailVerified, mobile_number: PhoneId };
            if (Email && Email.length > 0) {
                user_data.email = Email[0].Value;
            }
            res.status(200).json({ status: true, data: user_data });
        } else {
            res.status(400).json({ status: false, message: "some error had occured" });
        }
    } catch (error) {
        if (error && error.response && error.response.data) {
            console.log("error in getProfileDetailsByAccessId ", error.response.data);
            res.status(500).json({ status: false, message: error.response.data.Description });
        } else {
            res.status(500).json({ status: false, message: "Internal Server Error" });
        }
    }
}

const InvalidateAccessToken = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const api_res = await axios.get(
            process.env.API_URL + process.env.INVALIDATE_ACCESS_TOKEN,
            {
                params: {
                    apikey: process.env.API_KEY
                },
                headers: {
                    // Authorization: `Bearer ${token}`
                    Authorization: token
                }
            }
        );
        if (api_res && api_res.data.IsPosted) {
            res.status(200).json({ status: true, message: "access token is invalidated" });
        } else {
            res.status(400).json({ status: false, message: "some error had occured" });
        }
    } catch (error) {
        if (error && error.response && error.response.data) {
            console.log("error in InvalidateAccessToken ", error.response.data);
            res.status(500).json({ status: false, message: error.response.data.Description });
        } else {
            res.status(500).json({ status: false, message: "Internal Server Error" });
        }
    }
}
const login = async (req, res) => {
    try {
        const { emailOrPhone, password } = req.body;
        const loginBody = { password };
        let type = "email";
        if (/^\S+@\S+\.\S+$/.test(emailOrPhone)) {
            loginBody.email = emailOrPhone;
        } else {
            loginBody.phone = "+91" + emailOrPhone;
            type = "phone";
        }
        const api_res = await axios.post(process.env.API_URL + process.env.LOGIN_API,
            loginBody,
            {
                params: {
                    apikey: process.env.API_KEY,
                }
            })
        if (api_res && api_res.data && api_res.data.SecondFactorAuthentication && api_res.data.SecondFactorAuthentication.SecondFactorAuthenticationToken) {
            await sendOtpAfterLogin(api_res.data.SecondFactorAuthentication.SecondFactorAuthenticationToken, emailOrPhone, type);
            res.status(200).json({ status: true, message: "Logged In successfully", SecondFactorAuthentication: api_res.data.SecondFactorAuthentication.SecondFactorAuthenticationToken, type });
        }
    } catch (error) {
        if (error && error.response && error.response.data) {
            console.log("errro in login ", error.response.data);
            res.status(500).json({ status: false, message: error.response.data.Description });
        } else {
            res.status(500).json({ status: false, message: "Internal Server Error" });
        }
    }
}
const sendOtpAfterLogin = async (secondfactorauthenticationtoken, emailOrPhone, type) => {
    try {
        let body = {
            "emailid": emailOrPhone
        }
        let end_point = process.env.SEND_EMAIL_MFA_OTP
        if (type != "phone") {
            const api_res = await axios.post(process.env.API_URL + end_point,
                body,
                {
                    params: {
                        apikey: process.env.API_KEY,
                        secondfactorauthenticationtoken: secondfactorauthenticationtoken
                    }
                })
            if (api_res && api_res.data && api_res.data.IsPosted) {
                return true;
            } else {
                return false;
            }
        } else {
            body = {
                "phoneno2fa": "+91" + emailOrPhone
            };
            end_point = process.env.SEND_PHONE_MFA_OTP
            const api_res = await axios.put(process.env.API_URL + end_point,
                body,
                {
                    params: {
                        apikey: process.env.API_KEY,
                        secondfactorauthenticationtoken: secondfactorauthenticationtoken
                    }
                })
            if (api_res.data && api_res.data.Sid) {
                return true;
            } else {
                return false;
            }
        }
    } catch (error) {
        if (error.response.data) {
            console.log("error in sendOtpAfterLogin ", error);
        }
        return false;
    }
}
const getAccessTokenByUID = async (req, res) => {
    try {
        const UID = req.query.UID;
        const api_res = await axios.get(
            process.env.API_URL + process.env.ACCESS_TOKEN_BY_UID,
            {
                params: {
                    apikey: process.env.API_KEY,
                    apisecret: process.env.API_SECRET,
                    uid: UID
                },
                headers: {
                }
            }
        );
        if (api_res && api_res.data.access_token && api_res.data.refresh_token) {
            res.status(200).json({ status: true, message: "access token fetched", access_token: api_res.data.access_token, refresh_token: api_res.data.refresh_token });
        } else {
            res.status(400).json({ status: false, message: "some error had occured" });
        }
    } catch (error) {
        if (error && error.response && error.response.data) {
            console.log("error in getAccessTokenByUID ", error.response.data);
            res.status(500).json({ status: false, message: error.response.data.Description });
        } else {
            res.status(500).json({ status: false, message: "Internal Server Error" });
        }
    }
}
const refreshAccessToken = async (req, res) => {
    try {
        const { refresh_token } = req.body;
        if (!refresh_token) {
            return res.status(400).json({ status: false, message: "refresh_token is missing" });
        }
        const api_res = await axios.get(
            process.env.API_URL + process.env.REFRESH_ACCESS_TOKEN,
            {
                params: {
                    apikey: process.env.API_KEY
                },
                headers: {
                    Authorization: `Bearer ${refresh_token}`
                }
            }
        );
        if (api_res && api_res.data.access_token) {
            res.status(200).json({
                status: true,
                access_token: api_res.data.access_token,
                refresh_token: api_res.data.refresh_token || null
            });
        } else {
            res.status(400).json({ status: false, message: "Failed to refresh token" });
        }
    } catch (error) {
        if (error && error.response && error.response.data) {
            console.log("error in refreshAccessToken", error.response.data);
            res.status(500).json({ status: false, message: error.response.data.Description });
        } else {
            res.status(500).json({ status: false, message: "Internal Server Error" });
        }
    }
}
const validateAccessToken = async (req, res) => {
    try {
        const access_token = req.query.access_token;
        const api_res = await axios.get(
            process.env.API_URL + process.env.VALIDATE_ACCESS_TOKEN,
            {
                params: {
                    key: process.env.API_KEY,
                    secret: process.env.API_SECRET,
                    access_token: access_token
                },
                headers: {
                }
            }
        );
        if (api_res && api_res.data.access_token && api_res.data.refresh_token) {
            res.status(200).json({ status: true, message: "Token is valid" });
        } else {
            res.status(400).json({ status: false, message: "some error had occured" });
        }
    } catch (error) {
        if (error && error.response && error.response.data) {
            console.log("error in getAccessTokenByUID ", error.response.data);
            res.status(500).json({ status: false, message: error.response.data.Description });
        } else {
            res.status(500).json({ status: false, message: "Internal Server Error" });
        }
    }
}
module.exports = {
    getProfileDetailsByAccessId,
    InvalidateAccessToken,
    login,
    getAccessTokenByUID,
    validateAccessToken,
    refreshAccessToken
}