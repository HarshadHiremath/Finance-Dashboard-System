import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name: String,

        email: { type: String, unique: true, required: true },

        password: { type: String, required: true },

        role: {
            type: String,
            enum: ["Viewer", "Analyst", "Admin"],
            default: "Viewer",
        },

        isActive: { type: Boolean, default: true },
    },

    { timestamps: true },
);

export default mongoose.model("User", userSchema);
