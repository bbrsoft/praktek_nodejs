const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/balance", authenticateToken, (req, res) => {
  const userId = req.user.userId;
  db.query("SELECT balance  FROM balances WHERE user_id = ?", [userId], (err, results) => {
    if (err || results.length === 0) {
      return res.status(500).json({ message: "Error fetching balance sada" });
    }
    res.status(200).json({ status: 0, message: "Get Balance Berhasil", data: { balance: results[0].balance } });
  });
});

router.post("/topup", authenticateToken, (req, res) => {
    const userId = req.user.userId;
    if (!userId) {
      return res.status(401).json({ status: 103, message: "Unauthorized: User ID not found" });
    }
  
    const top_up_amount = parseFloat(req.body.top_up_amount);
    if (isNaN(top_up_amount) || top_up_amount <= 0) {
      return res.status(400).json({ status: 102, message: "Parameter amount harus angka dan lebih besar dari 0", data: null });
    }
  
    const invoiceNumber = generateInvoiceNumber();
    const serviceCode = "TOPUP_SERVICE";
  
    db.query("UPDATE balances SET balance = balance + ? WHERE user_id = ?", [top_up_amount, userId], (err, results) => {
      if (err) {
        console.log("Error updating balance:", err);
        return res.status(500).json({ message: "Error updating balance" });
      }
  
      db.query("INSERT INTO transactions (invoice_number, transaction_type, total_amount, service_code, user_id) VALUES (?, ?, ?, ?, ?)", 
      [invoiceNumber, 'TOPUP', top_up_amount, serviceCode, userId], (err) => {
        if (err) {
          console.log("Error logging transaction:", err);
          return res.status(500).json({ message: "Error logging transaction" });
        }
  
        res.status(200).json({ status: 0, message: "Top Up Balance berhasil", data: { balance: top_up_amount } });
      });
    });
  });
  
  function generateInvoiceNumber() {
      return 'INV-' + Date.now() + Math.floor(Math.random() * 1000);
  }
  router.post("/transaction", authenticateToken, (req, res) => {
    const userId =req.user.userId;
    if (!userId) {
        return res.status(401).json({ status: 103, message: "Unauthorized: User ID not found" });
    }
    
    const { service_code } = req.body;
    if (!service_code) {
        return res.status(400).json({ status: 105, message: "Service code is required", data: null });
    }
    
    db.query("SELECT service_name, service_tariff FROM services WHERE service_code = ?", [service_code], (err, serviceResults) => {
        if (err) {
            console.log("Error fetching service details:", err);
            return res.status(500).json({ status: 101, message: "Error fetching service details", data: null });
        }
        
        if (serviceResults.length === 0) {
            return res.status(404).json({ status: 106, message: "Service not found", data: null });
        }
        
        const { service_name, service_tariff } = serviceResults[0];
        
        db.query("SELECT balance FROM balances WHERE user_id = ?", [userId], (err, balanceResults) => {
            if (err) {
                console.log("Error fetching balance:", err);
                return res.status(500).json({ status: 101, message: "Error fetching balance", data: null });
            }
            
            if (balanceResults.length === 0) {
                return res.status(404).json({ status: 104, message: "User balance not found", data: null });
            }
            
            const balance = balanceResults[0].balance;
            if (balance < service_tariff) {
                return res.status(400).json({ status: 102, message: "Balance insufficient", data: null });
            }
            
            const invoiceNumber = generateInvoiceNumber();
            
            db.beginTransaction((err) => {
                if (err) {
                    console.log("Transaction start error:", err);
                    return res.status(500).json({ status: 101, message: "Transaction error", data: null });
                }
                
                db.query("UPDATE balances SET balance = balance - ? WHERE user_id = ?", [service_tariff, userId], (err) => {
                    if (err) {
                        console.log("Error updating balance:", err);
                        return db.rollback(() => {
                            res.status(500).json({ status: 101, message: "Error updating balance", data: null });
                        });
                    }
                    
                    db.query(
                        "INSERT INTO transactions (invoice_number, user_id, total_amount, transaction_type, service_code) VALUES (?, ?, ?, 'PAYMENT', ?)",
                        [invoiceNumber, userId, service_tariff, service_code],
                        (err, result) => {
                            if (err) {
                                console.log("Error logging transaction:", err);
                                return db.rollback(() => {
                                    res.status(500).json({ status: 101, message: "Error logging transaction", data: null });
                                });
                            }
                            
                            const transactionId = result.insertId;
                            
                            db.query(
                                "INSERT INTO transaction_history (user_id, transaction_id, amount, transaction_type, created_on) VALUES (?, ?, ?, 'PAYMENT', NOW())",
                                [userId, transactionId, service_tariff],
                                (err) => {
                                    if (err) {
                                        console.log("Error logging transaction history:", err);
                                        return db.rollback(() => {
                                            res.status(500).json({ status: 101, message: "Error logging transaction history", data: null });
                                        });
                                    }
                                    
                                    db.commit((err) => {
                                        if (err) {
                                            console.log("Commit error:", err);
                                            return db.rollback(() => {
                                                res.status(500).json({ status: 101, message: "Transaction commit error", data: null });
                                            });
                                        }
                                        
                                        res.status(200).json({
                                            status: 0,
                                            message: "Transaksi berhasil",
                                            data: {
                                                invoice_number: invoiceNumber,
                                                service_code,
                                                service_name,
                                                transaction_type: "PAYMENT",
                                                total_amount: service_tariff,
                                                created_on: new Date().toISOString()
                                            }
                                        });
                                    });
                                }
                            );
                        }
                    );
                });
            });
        });
    });
});

  
  function generateInvoiceNumber() {
    return 'INV-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  }

  function getServiceName(service_code) {
    const services = {
      "PLN": "PLN Prabayar",
      "PULSA": "Pulsa Elektrik",
      "DATA": "Paket Data",
      "GAME": "Voucher Game"
    };
    return services[service_code] || "Layanan Tidak Diketahui";
  }
  
router.get("/transaction/history", authenticateToken, (req, res) => {
    const userId = req.user?.userId || 5;
    let { offset = 0, limit = 10 } = req.query;
    offset = parseInt(offset);
    limit = parseInt(limit);
  
    if (isNaN(offset) || isNaN(limit)) {
      return res.status(400).json({ status: 101, message: "Offset and limit must be numbers" });
    }
  
    const query = `
      SELECT th.id, th.user_id, th.transaction_id, th.amount, th.transaction_type, th.created_on, 
             t.invoice_number, t.service_code, t.total_amount
      FROM transaction_history th
      JOIN transactions t ON th.transaction_id = t.id
      WHERE th.user_id = ?
      ORDER BY th.created_on DESC
      LIMIT ? OFFSET ?
    `;
  
    db.query(query, [userId, limit, offset], (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ status: 102, message: "Error fetching transaction history", data: null });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ status: 103, message: "No transaction history found", data: null });
      }
  
      res.status(200).json({
        status: 0,
        message: "Get History Berhasil",
        data: {
          offset,
          limit,
          records: results
        }
      });
    });
  });
  

module.exports = router;
