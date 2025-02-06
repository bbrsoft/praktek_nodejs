const User = require("../models/userModel");

exports.getBalance = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json({ balance: user.balance });
    } catch (error) {
        res.status(500).json({ message: "Error Fetching Balance" });
    }
};

exports.topUp = async (req, res) => {
    const { amount } = req.body;

    try {
        const user = await User.findById(req.user.id);
        user.balance += parseFloat(amount);
        await user.save();
        res.json({ message: "Top-Up Successful", newBalance: user.balance });
    } catch (error) {
        res.status(500).json({ message: "Top-Up Failed", error });
    }
};

exports.transaction = async (req, res) => {
    const { receiverEmail, amount } = req.body;

    try {
        const sender = await User.findById(req.user.id);
        const receiver = await User.findOne({ email: receiverEmail });

        if (!receiver) return res.status(400).json({ message: "Receiver not found" });
        if (sender.balance < amount) return res.status(400).json({ message: "Insufficient Balance" });

        sender.balance -= amount;
        receiver.balance += amount;
        await sender.save();
        await receiver.save();

        res.json({ message: "Transaction Successful", newBalance: sender.balance });
    } catch (error) {
        res.status(500).json({ message: "Transaction Failed", error });
    }
};
