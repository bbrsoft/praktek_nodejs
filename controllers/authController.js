const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.register = (req, res) => {
    const { email, first_name, last_name, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const sql = "INSERT INTO users (email, first_name, last_name, password) VALUES (?, ?, ?, ?)";
    db.query(sql, [email, first_name, last_name, hashedPassword], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Error registering user" });
        }
        const userId = result.insertId;
        const balanceSql = "INSERT INTO balances (user_id, balance) VALUES (?, ?)";
        db.query(balanceSql, [userId, 0], (err, balanceResult) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Error creating balance" });
            }

            const profileSql = "INSERT INTO profiles (user_id, profile_picture) VALUES (?, ?)";
            db.query(profileSql, [userId, 'default-profile-image.jpg'], (err, profileResult) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: "Error creating profile" });
                }

                res.status(200).json({ message: "User registered successfully" });
            });
        });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err || !isMatch) {
                return res.status(401).json({ error: "Invalid email or password hash" });
            }

            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

            db.query("INSERT INTO jwt_tokens (user_id, token) VALUES (?, ?)", [user.id, token], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: "Failed to save token" });
                }

                res.json({ token });
            });
        });
    });
};

