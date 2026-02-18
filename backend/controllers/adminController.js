const User = require("../models/User");

// Get all owners (pending approval)
const getPendingOwners = async (req, res) => {
  try {
    const owners = await User.find({
      role: "owner",
      isApproved: false,
    });

    res.status(200).json(owners);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Approve owner
const approveOwner = async (req, res) => {
  try {
    const owner = await User.findById(req.params.id);

    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    owner.isApproved = true;
    await owner.save();

    res.status(200).json({
      message: "Owner approved successfully",
      owner,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getPendingOwners, approveOwner };
