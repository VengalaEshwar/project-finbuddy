export default  allocateModule = async (req,res)=>{
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