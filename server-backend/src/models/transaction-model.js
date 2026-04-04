import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        amount: Number,

        type: {
            type: String,
            enum: ["income", "expense"],
        },

        category: String,

        date: Date,

        notes: String,
    },
    { timestamps: true },
);

export default mongoose.model("Transaction", transactionSchema);
