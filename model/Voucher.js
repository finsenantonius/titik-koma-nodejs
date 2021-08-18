const mongoose = require("mongoose");

const voucherSchema = new mongoose.Schema({
  voucherCode: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Voucher", voucherSchema);
