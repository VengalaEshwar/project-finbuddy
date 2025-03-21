import { check, validationResult } from "express-validator";
import User from '../Schema/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export const validateLogin = [
    check('emailOrUsername')
        .notEmpty().withMessage('Username or email is required')
        .isLength({ min: 3 }).withMessage('Username or email must be at least 3 characters'),

    check('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
];

const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {emailOrUsername,password} = req.body;
    try {
        const user = await User.findOne({
            $or: [
                { email: emailOrUsername },
                { username: emailOrUsername }
            ]
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' ,success:false});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password',success:false });
        }
        const token = jwt.sign({ userId: user._id, username: user.username, email: user.email },
            SECRET_KEY,
            { expiresIn: '1d' }
        );
        const { password:userPassword, ...userData } = user.toObject();
        res.status(200).json({ message: 'Login successful!', token, user: userData,success:true });


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error',success:false });
    }
};

export default login;