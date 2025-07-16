const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentNo: { type: String, required: true, unique: true },
  name: String,
  email: String,
  fees: String,
  hidden: Boolean,
  id: String,
});

module.exports = mongoose.model("Student", studentSchema);
