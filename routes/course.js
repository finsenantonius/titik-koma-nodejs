const router = require("express").Router();
const Course = require("../model/Course");
const Modul = require("../model/Modul");

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
    modulId: req.body.modulId,
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
          modulId: req.body.modulId,
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
    res.json(deleted);
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
      { _id: 0, __v: 0, modulId: 0 }
    );
    res.send(course);
  } catch {
    res.json({ message: err });
  }
});

router.post("/addModul", async (req, res) => {
  const add = new Modul({
    modulName: req.body.modulName,
    modulThumbnail: req.body.modulThumbnail,
  });
  try {
    const addedModul = await add.save();
    res.json(addedModul);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/updateModul", async (req, res) => {
  try {
    const updated = await Modul.updateOne(
      { _id: req.body.modulId },
      {
        $set: {
          modulName: req.body.modulName,
          moduleThumbnail: req.body.modulThumbnail,
        },
      }
    );
    res.json(updated);
  } catch {
    res.json({ message: err });
  }
});

router.delete("/modulDelete", async (req, res) => {
  try {
    const deleted = await Modul.remove({ _id: req.body.modulId });
    res.json(deleted);
  } catch {
    res.json({ message: err });
  }
});

router.get("/getAllModul", async (req, res) => {
  try {
    const modul = await Modul.find({}, { _id: 0, __v: 0 });
    res.json(modul);
  } catch {
    res.json({ message: err });
  }
});

router.get("/getAllCourseByModul/:modulId", async (req, res) => {
  try {
    const course = await Course.find(
      { modulId: req.params.modulId },
      { _id: 0, __v: 0, modulId: 0 }
    );
    res.send(course);
  } catch {
    res.json({ message: err });
  }
});
module.exports = router;
