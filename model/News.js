const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  newsTitle: {
    type: String,
    required: true,
  },
  newsContent: {
    type: String,
    required: true,
  },
  newsThumbnail: {
    type: String,
    required: true,
  },
  newsAuthor: {
    type: String,
    required: true,
  },
  newsUploadDate: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("News", newsSchema);
