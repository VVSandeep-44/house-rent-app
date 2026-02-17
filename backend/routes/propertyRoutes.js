const express = require("express");
const { addProperty, getAllProperties } = require("../controllers/propertyController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

const router = express.Router();

// Owner adds property
router.post("/", protect, authorizeRoles("owner"), addProperty);

// Anyone can view properties
router.get("/", getAllProperties);

module.exports = router;
