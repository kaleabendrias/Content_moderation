const express = require("express");
const cors = require("cors");
const moderationRoutes = require("./routes/moderationRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swaggerConfig");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/moderation", moderationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
