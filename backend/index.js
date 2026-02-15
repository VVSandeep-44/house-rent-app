require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/connect");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

connectDB();

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const { protect } = require("./middlewares/authMiddleware");

app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "You accessed protected route",
    user: req.user,
  });
});
