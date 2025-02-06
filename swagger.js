const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Documentation",
            version: "1.0.0",
            description: "Dokumentasi API dengan autentikasi JWT",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    in: "header", // ⬅️ Pastikan ini ada
                    description: "Masukkan token JWT dengan format 'Bearer <token>'",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./routes/*.js"], // Pastikan sesuai lokasi file routes
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = { swaggerSpec };
