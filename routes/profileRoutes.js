const express = require("express");
const db = require("../config/db");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authenticateToken, (req, res) => {
  const userId = req.user.id;

  db.query("SELECT id, email, first_name, last_name FROM users WHERE id = ?", [userId], (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching user profile" });

    if (results.length === 0) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ status: 0, message: "Sukses", data: results[0] });
  });
});

router.put("/update", authenticateToken, (req, res) => {
  const userId = req.user.id;
  const { username, email } = req.body;

  db.query("UPDATE users SET username = ?, email = ? WHERE id = ?", [username, email, userId], (err) => {
    if (err) return res.status(500).json({ message: "Error updating profile" });

    res.status(200).json({ status: 0, message: "Profile updated" });
  });
});

router.put("/image", authenticateToken, (req, res) => {
  const userId = req.user.id;
  const { imageUrl } = req.body;

  db.query("UPDATE users SET profile_image = ? WHERE id = ?", [imageUrl, userId], (err) => {
    if (err) return res.status(500).json({ message: "Error updating profile image" });

    res.status(200).json({ status: 0, message: "Profile image updated" });
  });
});

module.exports = router;
