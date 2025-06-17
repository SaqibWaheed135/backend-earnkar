const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Ad = require('../models/Ad');
const express = require('express');

exports.AdminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: 'Invalid email' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


exports.Ad = async (req, res) => {
  try {
    const { title, description, adLink, category } = req.body;

    const displayPhoto = req.file
      ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
      : req.body.photoUrl; // fallback to photo URL if provided

    if (!title || !description || !adLink || !category || !displayPhoto) {
      return res.status(400).json({
        success: false,
        message: "All fields (title, description, adLink, category, displayPhoto) are required."
      });
    }

    const ad = new Ad({
      title,
      description,
      adLink,
      category,
      displayPhoto
    });

    await ad.save();

    res.status(201).json({
      success: true,
      message: "Ad created successfully",
      data: ad
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


exports.getAd = async (req, res) => {
  try {
    const ads = await Ad.find();
    res.json({ success: true, data: ads });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}


