const router = require("express").Router();
const Reward = require("../model/Reward");

router.post("/addReward", async (req, res) => {
  const add = new Reward({
    rewardName: req.body.rewardName,
    rewardThumbnail: req.body.rewardThumbnail,
    modulName: req.body.modulName,
  });
  try {
    const addedReward = await add.save();
    res.json(addedReward);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/getAllReward", async (req, res) => {
  try {
    const reward = await Reward.find({}, { __v: 0 });
    res.json(reward);
  } catch {
    res.json({ message: err });
  }
});

router.delete("/deleteReward", async (req, res) => {
  try {
    const deleted = await Reward.remove({ _id: req.body.rewardId });
    res.json(deleted);
  } catch {
    res.json({ message: err });
  }
});

router.patch("/updateReward", async (req, res) => {
  try {
    const updated = await Reward.updateOne(
      { _id: req.body.rewardId },
      {
        $set: {
          reward: req.body.reward,
        },
      }
    );
    res.json(updated);
  } catch {
    res.json({ message: err });
  }
});

module.exports = router;
