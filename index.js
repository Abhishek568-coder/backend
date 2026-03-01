require("dotenv").config();
const express = require("express");
const cors = require("cors");

const inventoryRoutes = require("./routes/inventoryRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/inventory", inventoryRoutes);

// default route
app.get("/", (req, res) => {
  res.json({ message: "Inventory API Running" });
});

// error handler
app.use(errorHandler);

// port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});