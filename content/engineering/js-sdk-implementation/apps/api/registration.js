const lrv2 = require("./config/login_radius_sdk");
const { sendVerificationMail } = require("./utils/sendMail")
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });

const register = async (req, res) => {
    try {
        const { email, password, mobile, fullName, } = req.body;
        const api_res = await axios.post(process.env.API_URL + process.env.ACCOUNT_CREATE,
            {
                "FullName": fullName,
                "Email": [
                    {
                        "Type": "Primary",
                        "Value": email
                    }
                ],
                "Country": {
                    "Code": "",
                    "Name": "India"
                },
                "PhoneNumbers": [
                    {
                        "PhoneType": "Mobile",
                        "PhoneNumber": mobile
                    }
                ],
                "Password": password,
                "PhoneId": "91" + mobile

            },
            {
                params: {
                    apikey: process.env.API_KEY,
                    apisecret: process.env.API_SECRET
                }
            })
        if (api_res && api_res.data.ID) {
            await emailverificationMail(email)
            res.status(200).json({ status: true, message: "Registered successfully" });
        } else {
            res.status(400).json({ status: false, message: "Some error had occured" });
        }
    } catch (error) {
        if (error && error.response && error.response.data) {
            res.status(500).json({ status: false, message: error.response.data.Description });
        } else {
            res.status(500).json({ status: false, message: "Internal Server Error" });
        }

    }
}
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        // console.log("payload received is ", email)
        const api_res = await axios.post(process.env.API_URL + process.env.FORGOT_PASSWORD_TOKEN,
            {
                "email": email
            },
            {
                params: {
                    apikey: process.env.API_KEY,
                    apisecret: process.env.API_SECRET,
                    sendemail: "true",
                    resetPasswordUrl: "http://localhost:5174/password-change"
                }
            })
        if (api_res && api_res.data.ForgotToken) {
            res.status(200).json({ status: true, message: "password reset link is sent to the mail" });
        } else {
            res.status(400).json({ status: false, message: "some error had occured" });
        }
    } catch (error) {
        console.log("error in forgotPassword ", error);
        if (error && error.response && error.response.data) {
            res.status(500).json({ status: false, message: error.response.data.Description });
        } else {
            res.status(500).json({ status: false, message: "Internal Server Error" });
        }
    }
}
const forgotPasswordByToken = async (req, res) => {
    try {
        const { password, vtoken } = req.body;
        const api_res = await axios.put(process.env.API_URL + process.env.REST_PASSWORD_BY_TOKEN,
            {
                "resettoken": vtoken,
                "password": password,
                "welcomeemailtemplate": "",
                "resetpasswordemailtemplate": ""
            },
            {
                params: {
                    apikey: process.env.API_KEY
                }
            })
        if (api_res && api_res.data.IsPosted) {
            res.status(200).json({ status: true, message: "Password set" });
        } else {
            res.status(400).json({ status: false, message: "some erorr had occured" });
        }
    } catch (error) {
        console.log("error in forgotPasswordByToken ", error);
        if (error && error.response && error.response.data) {
            res.status(500).json({ status: false, message: error.response.data.Description });
        } else {
            res.status(500).json({ status: false, message: "Internal Server Error" });
        }

    }
}
const emailverificationMail = async (email) => {
    try {
        const api_res = await axios.post(process.env.API_URL + process.env.EMAIL_VERIFICATION_TOKEN,
            {
                "email": email
            },
            {
                params: {
                    apikey: process.env.API_KEY,
                    apisecret: process.env.API_SECRET
                }
            })
        console.log("email verification code geneartion code response ", api_res.data)
        if (api_res && api_res.data && api_res.data.VerificationToken) {
            await sendVerificationMail(email, api_res.data.VerificationToken);
        }
        return true
    } catch (error) {
        console.log("error in emailverificationMail ", error);
        return false

    }
}
const verifyEmailByToken = async (req, res) => {
    try {
        const token = req.query.token;
        const email = req.query.email;
        if (!token || !email) {
            return res.status(400).json({
                status: false,
                message: "Token or email is  missing",
            });
        }
        const api_res = await axios.get(process.env.API_URL + process.env.EMAIL_VERIFICATION,
            {
                params: {
                    apikey: process.env.API_KEY,
                    verificationtoken: token,
                    email: email
                }
            })
        if (api_res && api_res.data.Data && api_res.data.Data.access_token) {
            res.status(200).json({ status: true, message: "Email verified", access_token: api_res.data.Data.access_token, refresh_token: api_res.data.Data.refresh_token, mobile_number: api_res.data.Data.Profile.PhoneId });
        } else {
            res.status(400).json({ status: false, message: "some erorr had occured" });
        }
    } catch (error) {
        if (error && error.response && error.response.data) {
            console.log("error in verifyEmailByToken ", error.response.data);
            res.status(500).json({ status: false, message: error.response.data.Description });
        } else {
            res.status(500).json({ status: false, message: "Internal Server Error" });
        }

    }
}
const asyncsendOTPForMobileVerification = async (mobile_number) => {
    try {
        const api_res = await axios.post(process.env.API_URL + process.env.PHONE_VERIFICATION_OTP_SEND,
            {
                "phone": mobile_number
            },
            {
                params: {
                    apikey: process.env.API_KEY
                }
            })
        if (api_res && api_res.data.IsPosted) {
            return { status: true, message: "OTP sent" }
        } else {
            return { status: false, message: "some erorr had occured" }
        }
    } catch (error) {
        if (error && error.response && error.response.data) {
            console.log("error in sendOTPForMobileVerification ", error.response.data);
            return { status: false, message: error.response.data.Description }
        } else {
            return { status: false, message: "Internal Server Error" }
        }
    }
}
const verifyMobileByOTP = async (req, res) => {
    try {
        const mobile = req.query.mobile;
        const otp = req.query.otp;
        if (!mobile || !otp) {
            return res.status(400).json({
                status: false,
                message: "mobile or otp is  missing",
            });
        }
        const api_res = await axios.put(
            process.env.API_URL + process.env.PHONE_VERFICATION_OTP_VALIDATION,
            {
                phone: mobile, // body data
            },
            {
                params: {
                    apikey: process.env.API_KEY,
                    otp: otp
                },
            }
        );
        if (api_res && api_res.data.access_token) {
            res.status(200).json({ status: true, message: "Mobile verified", access_token: api_res.data.access_token });
        } else {
            res.status(400).json({ status: false, message: "some erorr had occured" });
        }
    } catch (error) {
        if (error && error.response && error.response.data) {
            console.log("error in verifyEmailByToken ", error.response.data);
            res.status(500).json({ status: false, message: error.response.data.Description });
        } else {
            res.status(500).json({ status: false, message: "Internal Server Error" });
        }

    }
}
const verifyEmailOTPtoLogin = async (req, res) => {
    try {
        const mfa_token = req.query.mfa_token;
        const otp = req.query.otp;
        const email_id = req.query.email_id;
        const type = req.query.type;
        if (!mfa_token || !otp || !email_id) {
            return res.status(400).json({
                status: false,
                message: "mfa_token or otp or email_id is  missing",
            });
        }
        if (type != "phone") {
            const api_res = await axios.put(
                process.env.API_URL + process.env.SMS_OTP_MFA_VERIFICATIOn,
                {
                    emailid: email_id,
                    Otp: otp, // body data
                },
                {
                    params: {
                        apikey: process.env.API_KEY,
                        secondfactorauthenticationtoken: mfa_token
                    },
                }
            );
            // console.log("verifyEmailOtptoLogin response is ", api_res.data)
            if (api_res && api_res.data.access_token && api_res.data.refresh_token) {
                res.status(200).json({ status: true, message: "Email MFA OTP is verified", access_token: api_res.data.access_token, refresh_token: api_res.data.refresh_token, mobile_number: api_res.data.Profile.PhoneId, email_id: email_id });
            } else {
                res.status(400).json({ status: false, message: "some erorr had occured" });
            }
        } else {
            const api_res = await axios.put(
                process.env.API_URL + process.env.PHONE_OTP_MFA_VERIFICATIOn,
                {
                    otp: otp, // body data
                },
                {
                    params: {
                        apikey: process.env.API_KEY,
                        secondfactorauthenticationtoken: mfa_token
                    },
                }
            );
            if (api_res && api_res.data.access_token && api_res.data.refresh_token) {
                res.status(200).json({ status: true, message: "Email MFA OTP is verified", access_token: api_res.data.access_token, refresh_token: api_res.data.refresh_token, mobile_number: api_res.data.Profile.PhoneId, email_id: email_id });
            } else {
                res.status(400).json({ status: false, message: "some erorr had occured" });
            }
        }
    } catch (error) {
        if (error && error.response && error.response.data) {
            console.log("error in verifyEmailByToken ", error.response.data);
            res.status(500).json({ status: false, message: error.response.data.Description });
        } else {
            res.status(500).json({ status: false, message: "Internal Server Error" });
        }

    }
}
const sendOTPForMobileVerification = async (req, res) => {
    const mobile = req.query.mobile;
    if (!mobile) {
        return res.status(400).json({
            status: false,
            message: "mobile  missing",
        });
    } else {
        let ress = await asyncsendOTPForMobileVerification(mobile)
        return res.status(200).json(ress);
    }
}

module.exports = {
    register,
    forgotPassword,
    forgotPasswordByToken,
    verifyEmailByToken,
    verifyMobileByOTP,
    sendOTPForMobileVerification,
    verifyEmailOTPtoLogin
}