import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();
const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString();
}

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    port: 465,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_HOST_SECRET_KEY
    },
    tls: {
        rejectUnauthorized: false  // Avoids SSL issues (use only for testing)
    }
});

const sendOtp = async (receiverEmail) => {

    const OTP = generateOTP();

    // Generate JWT with OTP & Expiry
    const token = jwt.sign({ receiverEmail, OTP }, process.env.JWT_EMAIL_SECRET_KEY, { expiresIn: '5m' });

    try {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: receiverEmail,
            subject: 'DevQuery - Verify email',
            replyTo: process.env.EMAIL,
            html: `
           <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">

    <div style="width: 100%; padding: 20px; background-color: #f4f4f4; text-align: center;">
        <div style="max-width: 600px; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); margin: auto;">
            
            <!-- Logo -->
            <div style="margin-bottom: 20px;">
                <img src="https://yourlogo.com/finbuddy-logo.png" alt="FinBuddy Logo" width="120">
            </div>

            <!-- Welcome Message -->
            <div>
                <h1 style="color: #2a9d8f; margin: 0;">🎉 Congratulations, [User Name]!</h1>
                <p style="font-size: 16px; color: #333; margin: 10px 0;">
                    Welcome to <strong>FinBuddy</strong> – your trusted guide to financial literacy and smart money management.
                </p>
                <p style="font-size: 16px; color: #333; margin: 10px 0;">
                    We're excited to have you onboard! Get ready to explore our interactive financial learning platform and improve your financial skills.
                </p>
            </div>

            <!-- CTA Button -->
            <div style="margin-top: 20px;">
                <a href="https://finbuddy.com/dashboard" style="display: inline-block; padding: 12px 24px; font-size: 16px; color: #fff; background-color: #2a9d8f; text-decoration: none; border-radius: 5px;">
                    Go to Dashboard
                </a>
            </div>

            <!-- Footer -->
            <div style="margin-top: 20px; font-size: 14px; color: #777; padding-top: 20px;">
                <p>If you have any questions, feel free to contact us at 
                    <a href="mailto:support@finbuddy.com" style="color: #2a9d8f; text-decoration: none;">support@finbuddy.com</a>
                </p>
                <p>© 2025 FinBuddy. All rights reserved.</p>
            </div>

        </div>
        `
        });
        return { success: true, token };
    } catch (error) {
        console.error('Failed to send OTP:', error);
        return { success: false, error: 'Failed to send OTP' };
    }
};

export default sendOtp;
