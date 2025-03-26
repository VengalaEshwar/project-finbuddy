import jwt from "jsonwebtoken";
import User from "../Schema/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // Use an environment variable

export const verifyToken = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password"); // Exclude password field
        
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        // Generate a new token for the user
        const newToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });

        res.status(200).json({ success: true, message: "Token verified successfully", user, newToken });
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};
