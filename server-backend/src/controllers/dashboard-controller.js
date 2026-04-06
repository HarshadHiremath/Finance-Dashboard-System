import Transaction from "../models/transaction-model.js";

export const getDashboardSummary = async (req, res) => {
  try {
    // 📥 Get all transactions
    const transactions = await Transaction.find();

    let totalIncome = 0;
    let totalExpense = 0;
    let categoryTotals = {};
    let monthlyTrends = {};

    // 🔄 Loop through all transactions
    transactions.forEach((t) => {
      // 💰 Income / Expense
      if (t.type === "income") {
        totalIncome += t.amount;
      } else if (t.type === "expense") {
        totalExpense += t.amount;
      }

      // 📂 Category totals
      if (!categoryTotals[t.category]) {
        categoryTotals[t.category] = 0;
      }
      categoryTotals[t.category] += t.amount;

      // 📅 Monthly trends
      const date = new Date(t.date);
      const key = `${date.getFullYear()}-${date.getMonth() + 1}`;

      if (!monthlyTrends[key]) {
        monthlyTrends[key] = { income: 0, expense: 0 };
      }

      if (t.type === "income") {
        monthlyTrends[key].income += t.amount;
      } else {
        monthlyTrends[key].expense += t.amount;
      }
    });

    // 🧮 Net Balance
    const netBalance = totalIncome - totalExpense;

    // 📂 Convert category object → array
    const categoryArray = Object.keys(categoryTotals).map((key) => ({
      category: key,
      total: categoryTotals[key],
    }));

    // 📅 Convert monthly object → array
    const monthlyArray = Object.keys(monthlyTrends).map((key) => ({
      month: key,
      income: monthlyTrends[key].income,
      expense: monthlyTrends[key].expense,
    }));

    // 🕒 Recent transactions
    const recentTransactions = await Transaction.find()
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      data: {
        totalIncome,
        totalExpense,
        netBalance,
        categoryTotals: categoryArray,
        recentTransactions,
        monthlyTrends: monthlyArray,
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