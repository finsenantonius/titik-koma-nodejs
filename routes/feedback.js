const router = require("express").Router();
const Feedback = require("../model/Feedback");

router.post("/addFeedback", async (req, res) => {
  const add = new Feedback({
    uid: req.body.uid,
    name: req.body.name,
    feedback: req.body.feedback,
  });
  try {
    const addedFeedback = await add.save();
    res.json(addedFeedback);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/getAllFeedback", async (req, res) => {
  try {
    const feedback = await Feedback.find({}, { _id: 0, __v: 0 });
    res.json(feedback);
  } catch {
    res.json({ message: err });
  }
});

router.delete("/feedbackDelete", async (req, res) => {
  try {
    const deleted = await Feedback.remove({ _id: req.body.feedbackId });
    res.json(deleted);
  } catch {
    res.json({ message: err });
  }
});

router.get("/getFeedbackByUserID/:uid", async (req, res) => {
  try {
    const feedback = await Feedback.find(
      { uid: req.params.uid },
      { _id: 0, __v: 0 }
    );
    res.send(feedback);
  } catch {
    res.json({ message: err });
  }
});

module.exports = router;
