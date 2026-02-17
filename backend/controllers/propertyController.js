const Property = require("../models/Property");

// Add property (Owner only)
const addProperty = async (req, res) => {
  try {
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
    const properties = await Property.find().populate("owner", "name email");

    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { addProperty, getAllProperties };
