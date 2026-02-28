const express = require("express");
const {
	getPendingOwners,
	getAllOwners,
	getAllRenters,
	approveOwner,
} = require("../controllers/adminController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/owners", protect, authorizeRoles("admin"), getPendingOwners);
router.get("/owners/all", protect, authorizeRoles("admin"), getAllOwners);
router.get("/renters/all", protect, authorizeRoles("admin"), getAllRenters);

router.put("/approve/:id", protect, authorizeRoles("admin"), approveOwner);

module.exports = router;
