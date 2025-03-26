export default markLevel = async (req,res)=>{
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