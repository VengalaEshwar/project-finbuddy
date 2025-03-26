import mongoose from "mongoose";
const UserCourseDetailsSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
      },
      isNewUser : {
        type : Boolean,
        default : true
      },
      isLevel1 : {
        type : Boolean,
        default : false
      },
      isLevel2 : {
        type : Boolean,
        default : false
      },
      isLevel3 : {
        type : Boolean,
        default : false
      },
      beginner :{
        type : [mongoose.Types.ObjectId],ref : "Module"
      },
      intermediate :{
        type : [mongoose.Types.ObjectId],ref : "Module"
      },
      advance :{
        type : [mongoose.Types.ObjectId],ref : "Module"
      }
})


const UserCourseDetails = mongoose.model("UserCourseDetails",UserCourseDetailsSchema);
export default UserCourseDetails;



 