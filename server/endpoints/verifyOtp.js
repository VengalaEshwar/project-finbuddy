import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();

export const verifyOtp = async (req, res) => {
    const { otp ,otpToken} = req.body; 
    if (!otp || !otpToken) {
        return res.status(400).json({ error: 'OTP and token are required' });
    }

    try {
        
        const decoded = jwt.verify(otpToken, process.env.JWT_EMAIL_SECRET_KEY);
        const { receiverEmail, OTP } = decoded;
        if (otp !== OTP) {
        
            return res.status(400).json({ error: 'Invalid OTP',success:false });
        }

        return res.status(200).json({ message: 'Your email is verified Successfully.',success:true });

    } catch (error) {
        return res.status(400).json({ error: 'Invalid or expired OTP',success:false });
    }
};
