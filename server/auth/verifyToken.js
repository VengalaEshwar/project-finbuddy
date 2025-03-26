import jwt from "jsonwebtoken";
import User from "../Schema/User.js";

const JWT_SECRET = process.env.JWT_SECRET_KEY || "your_secret_key"; 

export const verifyToken = async (req, res) => {
    try {
        // Extract token from Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, error: "No token provided" });
        }

        const token = authHeader.split(" ")[1]; // Extract the actual token

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Find user from the decoded token
        const user = await User.findById(decoded.userId).select("-password"); 
        
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        // Generate a new token
        const newToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });

        res.status(200).json({ success: true, message: "Token verified successfully", user, newToken });
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(401).json({ success: false, error: "Invalid or expired token" });
    }
};
