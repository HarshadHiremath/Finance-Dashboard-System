import Transaction from "../models/transaction-model.js";

export const getDashboardSummary = async (req, res) => {
    try {
        
        const totalIncome = await Transaction.aggregate([
            { $match: { type: "income" } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        const totalExpense = await Transaction.aggregate([
            { $match: { type: "expense" } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        const income = totalIncome[0]?.total || 0;
        const expense = totalExpense[0]?.total || 0;
        const netBalance = income - expense;

        const categoryTotals = await Transaction.aggregate([
            {
                $group: {
                    _id: "$category",
                    total: { $sum: "$amount" },
                },
            },
            { $sort: { total: -1 } },
        ]);

        const recentTransactions = await Transaction.find()
            .sort({ createdAt: -1 })
            .limit(5);

        const monthlyTrends = await Transaction.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                        month: { $month: "$date" },
                    },
                    totalIncome: {
                        $sum: {
                            $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
                        },
                    },
                    totalExpense: {
                        $sum: {
                            $cond: [
                                { $eq: ["$type", "expense"] },
                                "$amount",
                                0,
                            ],
                        },
                    },
                },
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } },
        ]);

        return res.status(200).json({
            success: true,
            data: {
                totalIncome: income,
                totalExpense: expense,
                netBalance,
                categoryTotals,
                recentTransactions,
                monthlyTrends,
            },
        });
    } catch (error) {
        console.error("Dashboard Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
