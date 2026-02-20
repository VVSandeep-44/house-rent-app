const express = require("express");
const {
  addProperty,
  getAllProperties,
  getOwnerProperties,
} = require("../controllers/propertyController");

const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

const router = express.Router();

// Owner adds property
router.post("/", protect, authorizeRoles("owner"), addProperty);

// Get all available properties (for renters/public)
router.get("/", getAllProperties);

// Get properties of logged-in owner
router.get(
  "/owner",
  protect,
  authorizeRoles("owner"),
  getOwnerProperties
);

module.exports = router;
