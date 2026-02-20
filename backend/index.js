require("dotenv").config();
const propertyRoutes = require("./routes/propertyRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");
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

app.use("/api/properties", propertyRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api/admin", adminRoutes);

const errorHandler = require("./middlewares/errorMiddleware");
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const { protect, authorizeRoles } = require("./middlewares/authMiddleware");

app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "You accessed protected route",
    user: req.user,
  });
});




// Admin only route
app.get(
  "/api/admin-only",
  protect,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({ message: "Welcome Admin" });
  }
);

// Owner only route
app.get(
  "/api/owner-only",
  protect,
  authorizeRoles("owner"),
  (req, res) => {
    res.json({ message: "Welcome Owner" });
  }
);

// Renter only route
app.get(
  "/api/renter-only",
  protect,
  authorizeRoles("renter"),
  (req, res) => {
    res.json({ message: "Welcome Renter" });
  }
);
