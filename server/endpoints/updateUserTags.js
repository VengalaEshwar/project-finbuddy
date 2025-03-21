import { validationResult } from "express-validator";
import User from '../Schema/UserSchema.js';


export const updateUserTags = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user.userId;
    const { tags } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { tags: tags } },  
            { new: true },
        ).select("-password");
        res.status(200).json({ message: "User Tags Updated Successfully", user: updatedUser });

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
