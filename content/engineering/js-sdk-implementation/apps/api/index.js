const express = require("express");
const cors = require("cors");
const app = express();
const { register, forgotPassword, forgotPasswordByToken, verifyEmailByToken, verifyMobileByOTP, sendOTPForMobileVerification, verifyEmailOTPtoLogin } = require("./registration")
const { getProfileDetailsByAccessId, InvalidateAccessToken, login, getAccessTokenByUID, validateAccessToken, refreshAccessToken, sendOtpAfterLogin } = require("./login")

app.use(cors());
app.use(express.json());

app.post("/api/register", register);
app.post("/api/forgot-password", forgotPassword);
app.post("/api/resetPassword", forgotPasswordByToken);
app.get("/api/verifyEmail", verifyEmailByToken);
app.get("/api/profile", getProfileDetailsByAccessId);
app.get("/api/invalidateAccessToken", InvalidateAccessToken);
app.post("/api/login", login);
app.get("/api/VerifyMobileByOTP", verifyMobileByOTP);
app.get("/api/sendMobileVerificationOTP", sendOTPForMobileVerification);
app.get("/api/verifyEmailOtpToLogin", verifyEmailOTPtoLogin);
app.get("/api/getAccessTokenUsingUID", getAccessTokenByUID);
app.get("/api/validateToken", validateAccessToken)
app.post("/api/refresh-token", refreshAccessToken);
app.post("/api/sendManualOTPAfterLogin", sendOtpAfterLogin);

app.listen(5000, () => {
    console.log("API running on http://localhost:5000");
});