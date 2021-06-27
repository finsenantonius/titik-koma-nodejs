const router = require("express").Router();
const Challenge = require("../model/Challenge");

router.post("/addChallenge", async (req, res) => {
  const add = new Challenge({
    challengeName: req.body.challengeName,
    challengeDescription: req.body.challengeDescription,
    challengeIcon: req.body.challengeIcon,
    challengeContent: req.body.challengeContent,
  });
  try {
    const addedChallenge = await add.save();
    res.json(addedChallenge);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/getChallenge", async (req, res) => {
  try {
    const challenge = await Challenge.find({}, { __v: 0 });
    res.json(challenge);
  } catch {
    res.json({ message: err });
  }
});

module.exports = router;
