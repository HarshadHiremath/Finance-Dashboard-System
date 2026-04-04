import jwt from "jsonwebtoken";
import User from "../models/user-model.js";

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key";

export const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, no token",
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");

        if (!user || !user.isActive) {
            return res
                .status(403)
                .json({ message: "User is inactive or does not exist" });
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }
};
