import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import User from '../Schema/User.js';
import UserCourseDetails from '../Schema/UserCourseDetails.js';

const SALT_ROUNDS = 10;

// Signup Validator (middleware)
export const validateSignup = [
    check('username')
        .isLength({ min: 3, max: 30 }).withMessage('Name must be between 3 and 30 characters')
        .trim()
        .escape(),

    check('email')
        .isEmail().withMessage('Please enter a valid email address')
        .normalizeEmail(),

    check('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)
        .withMessage('Password must contain at least one letter, one number, and one special character')
];
const signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), success: false });
    }

    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required', success: false });
    }

    try {
        const userExist = await User.findOne({ $or: [{ email }, { username }] });

        if (userExist) {
            return res.status(400).json({ error: 'try again', success: false });
        }

        // Hash password securely
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashPassword = await bcrypt.hash(password, salt);

        // First, create userCourseDetails
        const userCourseDetails = await UserCourseDetails.create({});

        // Now, create the user with the userCourseDetails reference
        const newUser = new User({
            username,
            email,
            password: hashPassword,
            userCourseDetails: userCourseDetails._id 
        });
        
        await newUser.save();

        userCourseDetails.userId = newUser._id;
        await userCourseDetails.save();

        console.log(`${username}: new user added successfully!`);
        res.status(201).json({ message: 'User registered successfully!', success: true });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Internal server error', success: false });
    }
};

export default signup;
