const jwt = require("jsonwebtoken");
const moment = require("moment");
const { getjwtByToken } = require('../models/jwt'); 

const authenticateToken = async (req, res, next) => {
    try {
      
        const authHeader = req.header("Authorization");
        if (!authHeader) {
            return res.status(401).json({ error: "Access denied. No token provided." });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Access denied. No token provided." });
        }

      
        const jwtToken = await getjwtByToken(token); 
        if (!jwtToken) {
            return res.status(401).json({ error: "Token not found in the database." });
        }

        const createdAt = moment(jwtToken.created_at);
        const expirationTime = createdAt.add(12, 'hours');
        const currentTime = moment(); 


        if (currentTime.isAfter(expirationTime)) {
            return res.status(403).json({ error: "Token has expired." });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error("JWT Verification Error:", err);
                return res.status(403).json({ error: "Invalid or expired token" });
            }
            req.user = decoded; 
            next(); 
        });
    } catch (error) {
        console.error("Error in token validation:", error.message);
        return res.status(500).json({ error: error.message || "Server error" });
    }
};

module.exports = authenticateToken;
