const express = require("express");
const {
	getPendingOwners,
	getAllOwners,
	approveOwner,
} = require("../controllers/adminController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/owners", protect, authorizeRoles("admin"), getPendingOwners);
router.get("/owners/all", protect, authorizeRoles("admin"), getAllOwners);

router.put("/approve/:id", protect, authorizeRoles("admin"), approveOwner);

module.exports = router;
