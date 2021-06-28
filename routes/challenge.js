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

router.patch("/updateChallenge", async (req, res) => {
  try {
    const updated = await Challenge.updateOne(
      { _id: req.body.challengeId },
      {
        $set: {
          challengeName: req.body.challengeName,
          challengeDescription: req.body.challengeDescription,
          challengeIcon: req.body.challengeIcon,
          challengeContent: req.body.challengeContent,
        },
      }
    );
    res.json(updated);
  } catch {
    res.json({ message: err });
  }
});

router.delete("/deleteChallenge", async (req, res) => {
  try {
    const deleted = await Challenge.remove({ _id: req.body.challengeId });
    res.json(deleted);
  } catch {
    res.json({ message: err });
  }
});

module.exports = router;
