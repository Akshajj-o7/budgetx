const Transaction = require("../models/Transaction");

exports.addTransaction = async (req, res) => {
  try {
    const transaction = new Transaction({
      ...req.body,
      userId: req.user.id
    });

    await transaction.save();
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ msg: "Error adding transaction" });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const data = await Transaction.find({ userId: req.user.id });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching transactions" });
  }
};