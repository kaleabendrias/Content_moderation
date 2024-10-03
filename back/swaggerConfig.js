const swaggerJsDocs = require("swagger-jsdoc");
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Content Moderation API",
      version: "1.0.0",
      description:
        "API for moderating text and images using Hugging Face models",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDocs(swaggerOptions);

module.exports = swaggerDocs;