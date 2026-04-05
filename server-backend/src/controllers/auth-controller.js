import User from "../models/user-model.js";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key";

export const loginUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        if (password!==user.password) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        if (role && user.role !== role) {
            return res.status(403).json({
                success: false,
                message: "Role mismatch",
            });
        }

        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: "User is inactive",
            });
        }

        const token = generateToken(user);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                email: user.email,
                role: user.role,
                name: user.name,
                token,
            },
        });
    } catch (error) {
        console.error("Login Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


export const verifyToken = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                valid: false,
                message: "No token provided",
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user || !user.isActive) {
            return res
                .status(403)
                .json({ message: "User is inactive or does not exist" });
        }

        return res.status(200).json({
            success: true,
            data: {
                email: user.email,
                role: user.role,
                name: user.name,
            },
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};
