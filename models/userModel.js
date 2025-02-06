const db = require("../config/db");

class User {
    static register(username, password, callback) {
        const sql = "INSERT INTO users (username, password, balance) VALUES (?, ?, ?)";
        db.query(sql, [username, password, 0], callback);
    }

    static findByUsername(username, callback) {
        const sql = "SELECT * FROM users WHERE username = ?";
        db.query(sql, [username], callback);
    }
}

module.exports = User;
