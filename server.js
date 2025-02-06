require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const profileRoutes = require("./routes/profileRoutes");
const bannerRoutes = require('./routes/bannerRoutes');
const serviceRoutes = require('./routes/serviceRoutes'); 

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(authRoutes);

app.use("/profile" ,profileRoutes);  

app.use('/banner', bannerRoutes);

app.use("/services", serviceRoutes);
app.use(transactionRoutes);

app.use(cors({
    exposedHeaders: ['Authorization'],  
    allowedHeaders: ['Authorization', 'Content-Type'],
  }));
  
  app.use((req, res, next) => {
    console.log("Headers dari Swagger:", req.headers);
    next();
});
  
  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

