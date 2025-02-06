const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getBalance, topUp, transaction } = require("../controllers/userController");

router.get("/balance", authMiddleware, getBalance);
router.post("/topup", authMiddleware, topUp);
router.post("/transaction", authMiddleware, transaction);

module.exports = router;
