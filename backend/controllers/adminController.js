const User = require("../models/User");

// Get all owners (pending approval)
const getPendingOwners = async (req, res) => {
  try {
    const owners = await User.find({
      role: "owner",
      isApproved: false,
    }).select("name email role isApproved profile createdAt");

    res.status(200).json(owners);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getAllOwners = async (req, res) => {
  try {
    const owners = await User.find({ role: "owner" }).select(
      "name email role isApproved profile createdAt"
    );

    res.status(200).json(owners);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getAllRenters = async (req, res) => {
  try {
    const renters = await User.find({ role: "renter" }).select(
      "name email role isApproved profile createdAt"
    );

    res.status(200).json(renters);
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

    const hasRequiredProfile =
      owner.profile?.phone?.trim() &&
      owner.profile?.city?.trim() &&
      owner.profile?.idProof?.trim();

    if (!hasRequiredProfile) {
      return res.status(400).json({
        message: "Owner profile is incomplete. Ask owner to update profile before approval.",
      });
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

module.exports = { getPendingOwners, getAllOwners, getAllRenters, approveOwner };
