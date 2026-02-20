const Booking = require("../models/Booking");
const Property = require("../models/Property");

// Renter creates booking
const createBooking = async (req, res) => {
  try {
    const { propertyId } = req.body;

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Check duplicate booking
const existingBooking = await Booking.findOne({
  property: propertyId,
  renter: req.user.id,
});

if (existingBooking) {
  return res.status(400).json({
    message: "You have already requested this property",
  });
}

if (!property.isAvailable) {
  return res.status(400).json({
    message: "Property is not available",
  });
}

    const booking = await Booking.create({
      property: property._id,
      renter: req.user.id,
      owner: property.owner,
    });

    res.status(201).json({
      message: "Booking request sent",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Owner updates booking status
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (status === "approved") {
  booking.status = "approved";

  // Disable property
  const property = await Property.findById(booking.property);
  property.isAvailable = false;
  await property.save();
} else {
  booking.status = status;
}
    await booking.save();

    res.status(200).json({
      message: "Booking status updated",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get bookings for logged-in user
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      $or: [{ renter: req.user.id }, { owner: req.user.id }],
    }).populate("property renter owner", "name email title");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { createBooking, updateBookingStatus, getMyBookings };
