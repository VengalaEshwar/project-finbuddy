import { check, validationResult } from 'express-validator';
import User from '../Schema/UserSchema.js';
import Query from '../Schema/QuerySchema.js';

export const validateUpdateUsername = [
    check('username')
        .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters')
        .trim()
        .escape()
];


export const updateUsername= async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { userId} = req.user;
        const newUsername = req.body.username;

        if (!userId || !newUsername) {
            return res.status(400).json({ message: 'User ID and new username are required' });
        }

        // Check if the username is already taken
        const existingUser = await User.findOne({ username: newUsername });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Update the username
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { username: newUsername },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Update all queries where the userId matches
        await Query.updateMany(
            { "user.userId": userId }, // Find queries where userId matches
            { $set: { "user.username": newUsername } } // Update username field
        );

        res.status(200).json({ message: 'Username updated successfully', user: updatedUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
