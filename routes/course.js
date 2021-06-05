const router = require("express").Router();
const Course = require("../model/Course");

router.post("/addCourse", async (req, res) => {
  const add = new Course({
    courseName: req.body.courseName,
    courseTitle: req.body.courseTitle,
    courseDescription: req.body.courseDescription,
    courseThumbnail: req.body.courseThumbnail,
    courseFile: req.body.courseFile,
    courseLanguage: req.body.courseLanguage,
    courseLevel: req.body.courseLevel,
    courseCreated: req.body.courseCreated,
    courseAuthor: req.body.courseAuthor,
  });
  try {
    const addedCourse = await add.save();
    res.json(addedCourse);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/updateCourse", async (req, res) => {
  try {
    const updated = await Course.updateOne(
      { _id: req.body.courseId },
      {
        $set: {
          courseName: req.body.courseName,
          courseTitle: req.body.courseTitle,
          courseDescription: req.body.courseDescription,
          courseThumbnail: req.body.courseThumbnail,
          courseFile: req.body.courseFile,
          courseLanguage: req.body.courseLanguage,
          courseLevel: req.body.courseLevel,
          courseCreated: req.body.courseCreated,
          courseAuthor: req.body.courseAuthor,
        },
      }
    );
    res.json(updated);
  } catch {
    res.json({ message: err });
  }
});

router.delete("/courseDelete", async (req, res) => {
  try {
    const deleted = await Course.remove({ _id: req.body.courseId });
    res.json(removed);
  } catch {
    res.json({ message: err });
  }
});

router.get("/getAllCourse", async (req, res) => {
  try {
    const course = await Course.find({}, { _id: 0, __v: 0 });
    res.json(course);
  } catch {
    res.json({ message: err });
  }
});

router.get("/getSpecificCourse/:courseName", async (req, res) => {
  try {
    const course = await Course.find(
      { courseName: req.params.courseName },
      { _id: 0, __v: 0 }
    );
    res.send(course[0]);
  } catch {
    res.json({ message: err });
  }
});

module.exports = router;
