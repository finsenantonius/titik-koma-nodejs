const router = require("express").Router();
const News = require("../model/News");

router.post("/addNews", async (req, res) => {
  const add = new News({
    newsTitle: req.body.newsTitle,
    newsContent: req.body.newsContent,
    newsThumbnail: req.body.newsThumbnail,
    newsAuthor: req.body.newsAuthor,
    newsUploadDate: req.body.newsUploadDate,
  });
  try {
    const addedNews = await add.save();
    res.json(addedNews);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/getAllNews", async (req, res) => {
  try {
    const news = await News.find({}, { __v: 0 });
    res.json(news);
  } catch {
    res.json({ message: err });
  }
});

router.delete("/deleteNews", async (req, res) => {
  try {
    const deleted = await News.remove({ _id: req.body.newsId });
    res.json(deleted);
  } catch {
    res.json({ message: err });
  }
});

router.patch("/updateNews", async (req, res) => {
    try {
      const updated = await News.updateOne(
        { _id: req.body.newsId },
        {
          $set: {
            newsTitle: req.body.newsTitle,
            newsContent: req.body.newsContent,
            newsThumbnail: req.body.newsThumbnail,
            newsAuthor: req.body.newsAuthor,  
            newsUploadDate: req.body.newsUploadDate,          
          },
        }
      );
      res.json(updated);
    } catch {
      res.json({ message: err });
    }
  });


module.exports = router;
