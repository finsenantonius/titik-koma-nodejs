const router = require("express").Router();
const Voucher = require("../model/Voucher");

router.post("/addVoucher", async (req, res) => {
  const add = new Voucher({
    voucherCode: req.body.voucherCode,
  });
  try {
    const addedVoucher = await add.save();
    res.json(addedVoucher);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/getAllVoucher", async (req, res) => {
  try {
    const voucher = await Voucher.find({}, { __v: 0 });
    res.json(voucher);
  } catch {
    res.json({ message: err });
  }
});

router.delete("/deleteVoucher", async (req, res) => {
  try {
    const deleted = await Voucher.remove({ _id: req.body.voucherId });
    res.json(deleted);
  } catch {
    res.json({ message: err });
  }
});

router.patch("/updateVoucher", async (req, res) => {
    try {
      const updated = await Voucher.updateOne(
        { _id: req.body.voucherId },
        {
          $set: {
            voucherCode: req.body.voucherCode,
            },
        }
      );
      res.json(updated);
    } catch {
      res.json({ message: err });
    }
  });


module.exports = router;
