import Transaction from "../models/transaction-model.js";

export const createTransaction = async (req, res) => {
    try {
        const { amount, type, category, date, notes } = req.body;

        if (!amount || !type || !category || !date) {
            return res.status(400).json({
                success: false,
                message: "Required fields missing",
            });
        }

        const transaction = await Transaction.create({
            amount,
            type,
            category,
            date,
            notes,
        });

        return res.status(201).json({
            success: true,
            message: "Transaction created",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


export const getTransactions = async (req, res) => {
    try {
        const { type, category, startDate, endDate } = req.query;

        let filter = {};

        if (type) filter.type = type;
        if (category) filter.category = category;

        if (startDate || endDate) {
            filter.date = {};
            if (startDate) filter.date.$gte = new Date(startDate);
            if (endDate) filter.date.$lte = new Date(endDate);
        }

        const transactions = await Transaction.find(filter).sort({ date: -1 });

        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


export const updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;

        const transaction = await Transaction.findById(id);

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found",
            });
        }

        Object.assign(transaction, req.body);

        await transaction.save();

        return res.status(200).json({
            success: true,
            message: "Transaction updated",
            data: transaction,
        });
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


export const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;

        const transaction = await Transaction.findById(id);

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found",
            });
        }

        await transaction.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Transaction deleted",
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
