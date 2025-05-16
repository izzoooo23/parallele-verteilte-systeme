
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const itemsRouter = require("./routes/items");
app.use("/api/items", itemsRouter);

// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Optional: Info auf /
app.get("/", (req, res) => {
  res.send("✅ Backend läuft! Nutze /api/items oder /api-docs");
});

// Server starten
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
