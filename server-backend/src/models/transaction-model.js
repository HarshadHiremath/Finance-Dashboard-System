import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true,
        },

        type: {
            type: String,
            enum: ["income", "expense"],
            required: true,
        },

        category: {
            type: String,
            required: true,
        },

        date: {
            type: Date,
            required: true,
        },

        notes: String,
    },
    { timestamps: true },
);

export default mongoose.model("Transaction", transactionSchema);
