const express = require("express");
const router = express.Router();
const Student = require("../models/students");

// Get all
router.get("/", async (req, res) => {
  const data = await Student.find();
  res.json(data);

});

// Add new
router.post("/", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});

// Delete
router.delete("/:id", async (req, res) => {
  await Student.findOneAndDelete({ id: req.params.id });
  res.json({ success: true });
});


// Update
router.put("/:id", async (req, res) => {
  const updated = await Student.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
  res.json(updated);
});


module.exports = router;
