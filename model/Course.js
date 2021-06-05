const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  courseTitle: {
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
  courseLanguage: {
    type: String,
    required: true,
  },
  courseLevel: {
    type: String,
    required: true,
  },
  courseCreated: {
    type: String,
    required: true,
  },
  courseAuthor: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Course", courseSchema);
