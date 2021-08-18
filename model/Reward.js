const mongoose = require("mongoose");

const rewardSchema = new mongoose.Schema({
  rewardName: {
    type: String,
    required: true,
  },
  rewardThumbnail: {
    type: String,
    required: true,
  },
  modulName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Reward", rewardSchema);
