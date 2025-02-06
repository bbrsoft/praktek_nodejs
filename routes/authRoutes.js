const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const { register } = require("../controllers/authController");  
const { login } = require("../controllers/authController");  

const router = express.Router();
router.post("/registration", register); 
router.post("/login", login);

module.exports = router;
