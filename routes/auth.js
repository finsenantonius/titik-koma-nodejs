const router = require("express").Router();
const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const postRoute = require("../routes/post");
const { json } = require("express");

const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
dotenv.config();

const transporter2 = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY,
    },
  })
);

router.post("/register", async (req, res) => {
  // const {error} = schema.validate(req.body);
  // res.send(error.details[0].message);
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //check user exist?
  const emailexist = await User.findOne({ email: req.body.email });
  if (emailexist) return res.status(400).send("Email already used!");

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    score: req.body.score,
    avatar: req.body.avatar,
    isRedeemVoucher: req.body.isRedeemVoucher,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //validasi udah register belum
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email is not found!");
  //check password betul ato salah
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Password is wrong!");
  //create and assign token
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      score: user.score,
      avatar: user.avatar,
      isRedeemVoucher: user.isRedeemVoucher,
    },
    process.env.TOKEN_SECRET
  );
  res.header("auth-token", token).send(token);
});

//dapetin data dari token
router.get("/getDetailData", function (req, res) {
  // var token = req.headers['x-access-token'];
  var token = req.headers["auth-token"];
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  jwt.verify(token, process.env.TOKEN_SECRET, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    res.status(200).send(decoded);
  });
});

router.get("/getProfileDetail", async (req, res) => {
  try {
    const post = await User.findById(req.body.id);

    const name = post.name;
    //  res.send({nama:tes1, id:tes2});
    res.status(200).send(post);
  } catch (err) {
    res.status(400).json({ message: "abcdefghfjsfds" });
    //res.status(400).json({ error: err.message });
  }
});

router.patch("/changePassword", async (req, res) => {
  try {
    //ngambil data user
    const user = await User.findById(req.body.id);
    //check password valid / tidak valid
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(400).send("Password is wrong!");

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
    try {
      const updated = await User.updateOne(
        { _id: req.body.id },
        { $set: { password: hashedPassword } }
      );
      return res.status(200).send("Password Changed!");
    } catch {
      res.json({ message: err });
    }
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/updateProfile", async (req, res) => {
  const user = await User.findById(req.body.id);
  if (!user) return res.status(404).send("Tidak ada usernya");

  try {
    const updated = await User.updateOne(
      { _id: user._id },
      { $set: { name: req.body.name } }
    );
    res.status(200).send("Sukses");
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/updateScore", async (req, res) => {
  const user = await User.findById(req.body.id);
  if (!user) return res.status(404).send("Tidak ada usernya");

  var datetime = new Date();
  try {
    const updated = await User.updateOne(
      { _id: user._id },
      { $set: { score: req.body.score, updatedScoreDate: datetime } }
    );
    res.status(200).send("Sukses");
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/updateAvatar", async (req, res) => {
  const user = await User.findById(req.body.id);
  if (!user) return res.status(404).send("Tidak ada usernya");

  try {
    const updated = await User.updateOne(
      { _id: user._id },
      { $set: { avatar: req.body.avatar } }
    );
    res.status(200).send("Sukses");
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/redeemVoucher", async (req, res) => {
  const user = await User.findById(req.body.id);
  if (!user) return res.status(404).send("Tidak ada usernya");

  try {
    const updated = await User.updateOne(
      { _id: user._id },
      { $set: { isRedeemVoucher: req.body.isRedeemVoucher } }
    );
    res.status(200).send("Sukses");
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/getAllProfile", async (req, res) => {
  try {
    const post = await User.find(
      {},
      { name: 1, score: 1, avatar: 1, _id: 0 }
    ).sort({
      score: -1,
      updatedScoreDate: 1,
    });

    res.json(post.slice(0, 3));
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/getAllData", async (req, res) => {
  try {
    const profile = await User.find();
    res.send(profile);
  } catch {
    res.json({ message: err });
  }
});

router.post("/sendEmail", async (req, res) => {
  const user = await User.findOne({ email: req.body.userEmail });
  if (!user) return res.status(400).send("Email is not found!");

  try {
    transporter2.sendMail({
      to: req.body.userEmail,
      from: "cerdaskanbangsa.id@gmail.com",
      subject: "Kode OTP Lupa Password",
      text: "Kode OTP untuk merubah password adalah " + req.body.otp,
    });
    return res.status(200).send({ message: "Sukses" });
  } catch {
    res.json({ message: err });
  }
});

router.patch("/resetPassword", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
    try {
      const updated = await User.updateOne(
        { email: req.body.userEmail },
        { $set: { password: hashedPassword } }
      );
      return res.status(200).send("Password Changed!");
    } catch {
      res.json({ message: err });
    }
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
