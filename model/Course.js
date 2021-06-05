const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  courseDescription: {
    type: String,
    required: true,
  },
  courseThumbnail: {
    type: String,
    required: true,
  },
  courseFile: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Course", courseSchema);
