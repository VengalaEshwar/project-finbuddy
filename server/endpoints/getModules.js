export default getModules = async (req,res)=>{
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

