// utils/sendMail.js

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail", // or use SMTP config
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendVerificationMail = async (email, token) => {
    const verificationLink = `http://localhost:5174/verify-email?vtoken=${token}&email=${email}`;
    // console.log("verification link is ", verificationLink)
    const mailOptions = {
        from: `"Your App 🚀" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Verify your email",
        html: `
      <div style="font-family: sans-serif;">
        <h2>Email Verification</h2>
        <p>Click below to verify your email:</p>
        <a href="${verificationLink}" 
           style="padding:10px 20px;background:#667eea;color:white;border-radius:8px;text-decoration:none;">
          Verify Email
        </a>
        <p>If you didn’t request this, ignore this email.</p>
      </div>
    `,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = {
    sendVerificationMail
}