exports.getBalance = (req, res) => {
    const userId = req.user.id;
    db.query("SELECT balance FROM users WHERE id = ?", [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ balance: results[0].balance });
    });
};

exports.topUp = (req, res) => {
    const { amount } = req.body;
    const userId = req.user.id;

    db.query("UPDATE users SET balance = balance + ? WHERE id = ?", [amount, userId], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Top up successful" });
    });
};

exports.payTransaction = (req, res) => {
    const { amount, service } = req.body;
    const userId = req.user.id;

    db.query("SELECT balance FROM users WHERE id = ?", [userId], (err, results) => {
        if (err || results.length === 0) return res.status(500).json({ error: "User not found" });

        const balance = results[0].balance;
        if (balance < amount) {
            return res.status(400).json({ error: "Insufficient balance" });
        }

        db.query("UPDATE users SET balance = balance - ? WHERE id = ?", [amount, userId], (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: `Payment for ${service} successful` });
        });
    });
};
