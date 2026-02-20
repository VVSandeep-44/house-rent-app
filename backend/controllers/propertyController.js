const Property = require("../models/Property");

// Add property (Owner only)
const addProperty = async (req, res) => {
  try {
    // Check if owner is approved
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const user = await require("../models/User").findById(req.user.id);

    if (!user.isApproved) {
      return res.status(403).json({
        message: "Owner account not approved by admin",
      });
    }

    const { title, type, address, price, description } = req.body;

    const property = await Property.create({
      owner: req.user.id,
      title,
      type,
      address,
      price,
      description,
    });

    res.status(201).json({
      message: "Property added successfully",
      property,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// Get all properties (Public)
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find({ isAvailable: true })
  .populate("owner", "name email");


    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get properties for logged-in owner
const getOwnerProperties = async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user.id });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


module.exports = { addProperty, getAllProperties, getOwnerProperties };
