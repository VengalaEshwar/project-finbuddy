import Modules from "../Schema/Modules.js";
import Courses from "../Schema/Courses.js";
import Questions from "../Schema/Questions.js";
import UserCourseDetails from "../Schema/UserCourseDetails.js"
//adds questions 
import User from "../Schema/User.js";
export const addQuestion = async (req,res)=>{

    try{
        const arr = req.body;
        for(let item of arr)
        {
            const question = await Questions.create(item);
        }
        return res.json({
            success : true,
            message : "Questions added successfully"
        })
    }catch(e)
    {
        console.log(e);
        return res.json({
            error : e?.message,
            success : false
        })
    }
    
}
import { moduleDetails } from "../../client/src/pages/Games/QuizData.js";

//adds modules
export const addModule = async (req,res)=>{
    try{
        // const arr = req.body;
        const moduleData =   moduleDetails;        
        const arr = [moduleData];
        for(let item of arr)
        {
            const module = await Modules.create(item);
        }
        return res.json({
            success : true,
            message : "Modules added successfully"
        })
    }catch(e)
    {
        console.log(e);
        return res.json({
            error : e?.message,
            success : false
        })
    }
}
//adda course
export const addCourse = async (req,res)=>{
    try{
        const arr = req.body;
        for(let item of arr)
        {
            const course = await Courses.create(item);
        }
        return res.json({
            success : true,
            message : "courses added successfully"
        })
    }catch(e)
    {
        console.log(e);
        return res.json({
            error : e?.message,
            success : false
        })
    }
}
export const addQuestionToModule = async (req,res)=>{
  try{
    const questions = await Questions.find({});
    const modules = await Modules.find({});
    console.log("Im here")
    console.log(questions);
    console.log(modules);
    const map = new Map();
    for(let q of questions){
        if(!map.has(q.difficulty)){
            map.set(q.difficulty,[]);
        }
        map.get(q.difficulty).push(q);
    }
    for(let m of modules){
       const q = await Modules.updateOne({_id : m._id},{$set : {questions : map.get(m.difficulty)}});
    }
    return res.json({
        success : true,
        data  : await Modules.find({})
    })
  }catch(e){
    console.log(e);
    return res.json({
        error : e?.message,
        success : false
  })}
}

export const getCourses =async  (req,res)=>{
    try{
        const courses = await Courses.find({});
        for(let c of courses){
            const moduleObjects = await Modules.find({course : c._id});
            const modules = [];
            for(let m of  moduleObjects){
                modules.push(m.topic);
            };
            c.modules = modules;
        }
        return res.json({
            success : true,
            courses
        })
    }catch(e){
        console.log(e);
        return res.json({
            error : e?.message,
            success : false
      })}
}

export const getQuiz = async (req,res)=>{
    try{
        const level = req.params.level;
    const user = await User.findOne({username : req.body.username});
    console.log(user);
    if(Object.keys(user).length === 0){
        return res.json({
            success : false,
            mesage : "user not available"
        });
    }
    console.log(user.userCourseDetails)
    const userDetails = await UserCourseDetails.findById(user.userCourseDetails);
    console.log(userDetails)
    const {isLevel1,isLevel2,isLevel3}= userDetails;
    if(level==2 && !isLevel1){
        return res.json({
            success : false,
            mesage : "Complete beginner to unlock"
        });
    } 
    if(level==3 && (!isLevel1 || !isLevel2)){
        return res.json({
            success : false,
            mesage : "Complete intermediate to unlock"
        });
    }
    const course = await Courses.findOne({level : level});
    const {modules} = course;
    const quiz = []
    for(let m of modules){
        const module = await Modules.findOne({_id : m});
        const {questions} = module;
        quiz.push(await Questions.find({_id : Math.floor(Math.random() * questions.length)}));
    }
    return res.json({
        success : true,
        data : quiz
    })
    }
    catch(e){
        console.log(e?.message);
        return res.json({
            error : e?.message,
            success : false
      })}
}
export const allocateModule = async (req,res)=>{
    try{
        const {wrong,right} = req.body;
    const modules = await Modules.find({_id : {$in : [wrong]}});
    const userCourseDetails = await UserCourseDetails.findOne({username : req.body.username});
    const level = req.params.level;
    userCourseDetails[level]=[...modules];
    await userCourseDetails.save();
    return res.json({
        success : true,
        message : `unlocked ${level}`
    })
    }catch (e) {
        console.log(e);
        return res.status(500).json({
            error: e?.message,
            success: false
        });
    }
}
export const getModules = async (req,res)=>{
    try{
        const {moduleId} = req.params;
        const module = await Modules.findById(moduleId);
        return res.json({
            success : true,
            message : "module loaded",
            data : module
        })
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            error: e?.message,
            success: false
        });
    }
}
export const markLevel = async (req,res)=>{
    try{
        const {level,userId} = req.params;
    const user = await UserCourseDetails.findById(userId);
    const temp = "isLevel"+level;
    user[temp]=true;
    user.save();
    res.json({
        success : true,
        message : `${level} completed`
    })
    }catch(e){
        console.log(e);
        res.json({
            success : false,
            message : e?.message
        })
    }

}
export const getQuestions =async  (req,res)=>{
    try{
        const moduleId = req.params.modduleId;
        const module = await Modules.findById(moduleId);
        const questions = await Questions.find({_id : {$in : module.questions}});
        return res.json({
            success : true,
            data : questions
        });
    }catch(e){
        console.log(e);
        res.json({
            success : false,
            message : e?.message
        })
    }
}
// export const 