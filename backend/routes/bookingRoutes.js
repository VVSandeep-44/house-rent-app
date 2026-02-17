const express = require("express");
const {
  createBooking,
  updateBookingStatus,
  getMyBookings,
} = require("../controllers/bookingController");
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

const router = express.Router();

// Renter sends booking
router.post("/", protect, authorizeRoles("renter"), createBooking);

// Owner updates booking
router.put("/:id", protect, authorizeRoles("owner"), updateBookingStatus);

// Get my bookings
router.get("/", protect, getMyBookings);

module.exports = router;
