const mongoose = require("mongoose");

const subSchema = new mongoose.Schema({
  question: {
    type: String,
  },
  answer1: {
    type: String,
  },
  answer2: {
    type: String,
  },
  answer3: {
    type: String,
  },
  answer4: {
    type: String,
  },
  correctAnswer: {
    type: String,
  },
});

const challengeSchema = new mongoose.Schema({
  challengeName: {
    type: String,
    required: true,
  },
  challengeDescription: {
    type: String,
    required: true,
  },
  challengeIcon: {
    type: String,
    required: true,
  },
  challengeContent: [subSchema],
});

module.exports = mongoose.model("Challenge", challengeSchema);
