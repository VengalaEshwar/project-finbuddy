import Modules from "../Schema/Modules.js";
import Questions from "../Schema/Questions.js";
export const addQuestion = async (req,res)=>{

    try{
        const arr = req.body;
        console.log(arr.length);
        for(let item of arr)
        {
            const question = await Questions.create(item);
            console.log(question)
        }
        return res.json({
            success : true
        })
    }catch(e)
    {
        return res.json({
            error : e?.message,
            success : false
        })
    }
    
}
export const createModule = async (req,res)=>{
    try{
        const arr = req.body;
        console.log(arr.length);
        for(let item of arr)
        {
            const module = await Modules.create(item);
            console.log(module)
        }
        return res.json({
            success : true
        })
    }catch(e)
    {
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
export const moduleAllocation = (req,res)=>{
    const level = req.params.level;
    const diff  = `quiz-${level}`;
    const questions = Questions.find({questionType : diff}); 
    return res.json({
        success : true,
        data : questions
    })
}
export const 