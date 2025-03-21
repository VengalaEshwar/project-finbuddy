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
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                <h2 style="color: #333;">🔐 DevQuery Email Verification</h2>
                <p style="font-size: 16px; color: #555;">
                    Your One-Time Password (OTP) for verifying your email is:
                </p>
                <p style="font-size: 24px; font-weight: bold; color: #000; border: 2px dashed #333; display: inline-block; padding: 10px;">
                    ${OTP}
                </p>
                <p style="font-size: 14px; color: #777;">
                    This OTP is valid for <strong>5 minutes</strong>. Please do not share it with anyone.
                </p>
                <p style="font-size: 12px; color: #aaa;">If you didn't request this, please ignore this email.</p>
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
