const mongoose = require("mongoose");

const modulSchema = new mongoose.Schema({
  modulName: {
    type: String,
    required: true,
  },
  modulThumbnail: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Modul", modulSchema);