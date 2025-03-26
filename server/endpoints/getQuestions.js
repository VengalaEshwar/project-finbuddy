export default getQuestions =async  (req,res)=>{
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