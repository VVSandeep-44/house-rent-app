const express = require("express");
const { getPendingOwners, approveOwner } = require("../controllers/adminController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/owners", protect, authorizeRoles("admin"), getPendingOwners);

router.put("/approve/:id", protect, authorizeRoles("admin"), approveOwner);

module.exports = router;
