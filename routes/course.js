const router = require('express').Router();
const Course = require('../model/Course');

//nambahin coursenya
//test api
//{
//     "courseName":"a",
//     "courseDescription":"a",
//     "courseThumbnail":"a",
//     "courseFile":"a"
// }
router.post("/addCourse", async (req, res) => {
    const add = new Course({
        courseName: req.body.courseName,
        courseDescription: req.body.courseDescription,
        courseThumbnail: req.body.courseThumbnail,
        courseFile: req.body.courseFile
    });
    try{
        const addedCourse = await add.save();
        res.json(addedCourse);
    }catch(err){
        res.json({message:err})
    }
});

//update coursenya
//courseId : 60b6fbc92c34e1354c4ac82b
//api test
// {
//     "courseId":"60b6fbc92c34e1354c4ac82b",
//     "courseName":"a",
//     "courseDescription":"b",
//     "courseThumbnail":"c",
//     "courseFile":"d"
// }
router.patch('/updateCourse',async (req,res)=>{
    try{
        const updated = await Course.updateOne({_id: req.body.courseId},
            {$set: {courseName:req.body.courseName,
            courseDescription:req.body.courseDescription,
            courseThumbnail:req.body.courseThumbnail,
            courseFile:req.body.courseFile}});
        res.json(updated);
    }
    catch{
        res.json({message:err})
    }
})

//Delete coursenya
//api test
// {
//     "courseId":"60b6fbc92c34e1354c4ac82b"
// }
router.delete('/courseDelete',async (req,res)=>{
    try{
        const deleted = await Course.remove({_id: req.body.courseId});
        res.json(removed);
    }
    catch{
        res.json({message:err});
    }
});

//nampilin semua course
router.get('/getAllCourse',async (req,res)=>{
    try{
        const course = await Course.find({},{_id:0,__v:0});
        res.json(course);
    }
    catch{
        res.json({message:err});
    }
});

//nampilin detail 1 course doang
//api test
// {
//     "courseId":"60b6fbc92c34e1354c4ac82b"
// }
router.get('/getSpecificCourse',async (req,res)=>{
    try{
        const course = await Course.findById(req.body.courseId);
        res.json(course);
    }
    catch{
        res.json({message:err});
    }
});

module.exports = router;