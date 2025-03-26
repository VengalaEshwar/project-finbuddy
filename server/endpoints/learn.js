import Modules from "../Schema/Modules.js";
import Courses from "../Schema/Courses.js";
import Questions from "../Schema/Questions.js";
import UserCourseDetails from "../Schema/UserCourseDetails.js"

import Course from "../Schema/Courses.js";
import User from "../Schema/User.js";
//adds questions 
export const addQuestion = async (req, res) => {

    try {
        let course = await Courses.find({ level: "1" });
        course = course[0]
        // console.log(course)
        let count = 1;
        for (let m of course.modules) {
            const mo = await Modules.findById(m);
            const q = await Questions.find({ moduleType: `1.${count}` });
            const arr = []
            for (let qq of q)
                arr.push(qq._id);
            mo.questions = arr;
            mo.save();
            count++;
        }
        // const arr = req.body;
        // for(let item of arr)
        // {
        //     const mo = await Modules.findById(m);
        //     const q = await Questions.find({moduleType : `1.${count}`});
        //     const arr = []
        //     for(let qq of q )
        //         arr.push(qq._id);
        //     mo.questions = arr;
        //     mo.save();
        //     count++;
        // }
        const arr = req.body;
        for(let item of arr)
        {
            const question = await Questions.create(item);
        }
        return res.json({
            success: true,
            message: "Questions added successfully"
        })
    } catch (e) {
        console.log(e);
        return res.json({
            error: e?.message,
            success: false
        })
    }

}


//adds modules
export const addModule = async (req, res) => {
    try {
        // const arr = req.body;
        const moduleData = moduleDetails;
        const arr = moduleData;
        for (let item of arr) {
            const module = await Modules.create(item);
        }
        return res.json({
            success: true,
            message: "Modules added successfully"
        })
    } catch (e) {
        console.log(e);
        return res.json({
            error: e?.message,
            success: false
        })
    }
}
//adda course
export const addCourse = async (req, res) => {
    try {
        const modules = await Modules.find({});
        const arr = []
        for (let m of modules)
            arr.push(m._id);
        const course = await Course.create({
            level: "1",
            title: "Introduction to Finance",
            description: "Understand the basics of finance and why financial literacy matters in everyday life.",
            difficultyLevels: ["easy", "medium", "hard"],
            modules: arr
        });
        console.log(course);
        // const arr = req.body;
        // for(let item of arr)
        // {
        //     const course = await Courses.create(item);
        // }
        return res.json({
            success: true,
            message: "courses added successfully"
        })
    } catch (e) {
        console.log(e);
        return res.json({
            error: e?.message,
            success: false
        })
    }
}
export const addQuestionToModule = async (req, res) => {
    try {
        const questions = await Questions.find({});
        const modules = await Modules.find({});
        console.log("Im here")
        console.log(questions);
        console.log(modules);
        const map = new Map();
        for (let q of questions) {
            if (!map.has(q.difficulty)) {
                map.set(q.difficulty, []);
            }
            map.get(q.difficulty).push(q);
        }
        for (let m of modules) {
            const q = await Modules.updateOne({ _id: m._id }, { $set: { questions: map.get(m.difficulty) } });
        }
        return res.json({
            success: true,
            data: await Modules.find({})
        })
    } catch (e) {
        console.log(e);
        return res.json({
            error: e?.message,
            success: false
        })
    }
}

export const getCourses = async (req, res) => {
    try {
        const courses = await Courses.find({});
        for (let c of courses) {
            const moduleObjects = await Modules.find({ course: c._id });
            const modules = [];
            for (let m of moduleObjects) {
                modules.push(m.topic);
            };
            c.modules = modules;
        }
        return res.json({
            success: true,
            courses
        })
    } catch (e) {
        console.log(e);
        return res.json({
            error: e?.message,
            success: false
        })
    }
}


export const getQuiz = async (req, res) => {
    try {
        const level = Number(req.params.level); // Ensure level is treated as a number
        
        // Find the user by username
        const user = await User.findOne({ username: req.body.username }).lean();
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Fetch user course details
        const userDetails = await UserCourseDetails.findById(user.userCourseDetails).lean();
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User course details not found",
            });
        }

        const { isLevel1, isLevel2 } = userDetails;

        // Check if the user has unlocked the required level
        if (level === 2 && !isLevel1) {
            return res.status(403).json({
                success: false,
                message: "Complete beginner level to unlock this level",
            });
        }
        if (level === 3 && (!isLevel1 || !isLevel2)) {
            return res.status(403).json({
                success: false,
                message: "Complete intermediate level to unlock this level",
            });
        }

        // Fetch the course for the requested level
        const course = await Courses.findOne({ level }).lean();
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found for this level",
            });
        }

        const { modules } = course;
        const quiz = [];

        // Fetch random questions from each module
        for (const moduleId of modules) {
            const module = await Modules.findById(moduleId).lean();
            if (!module) continue;

            const { questions } = module;
            if (questions.length > 0) {
                const randomIndex = Math.floor(Math.random() * questions.length);
                const question = await Questions.findById(questions[randomIndex]).lean();
                if (question) {
                    quiz.push(question);
                }
            }
        }

        return res.json({
            success: true,
            data: quiz,
        });
    } catch (error) {
        console.error("Error fetching quiz:", error.message);
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
};

export const recommendedModules =  async (req, res) => {
    try {
        const { wrongModuleIds } = req.body; // Get array of module _id from the request body

        if (!wrongModuleIds || wrongModuleIds.length === 0) {
            return res.json({ success: false, message: "No incorrect modules provided." });
        }

        // Fetch modules based on the wrong module IDs
        const recommendedModules = await Modules.find({ _id: { $in: wrongModuleIds } });

        res.json({ success: true, data: recommendedModules });
    } catch (error) {
        console.error("Error fetching recommended modules:", error);
        res.status(500).json({ success: false, message: "Server error while fetching modules." });
    }
};

export const getModules = async (req, res) => {
    try {
        const { moduleId } = req.params;
        const module = await Modules.findById(moduleId);
        return res.json({
            success: true,
            message: "module loaded",
            data: module
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
export const markLevel = async (req, res) => {
    try {
        const { level, userId } = req.params;
        const user = await UserCourseDetails.findById(userId);
        const temp = "isLevel" + level;
        user[temp] = true;
        user.save();
        res.json({
            success: true,
            message: `${level} completed`
        })
    } catch (e) {
        console.log(e);
        res.json({
            success: false,
            message: e?.message
        })
    }

}
export const getQuestions = async (req, res) => {
    try {
        const { moduleId } = req.body; // Extract moduleId from request body

        if (!moduleId) {
            return res.status(400).json({
                success: false,
                message: "Module ID is required."
            });
        }

        const module = await Modules.findById(moduleId);
        if (!module) {
            return res.status(404).json({
                success: false,
                message: "Module not found."
            });
        }

        const questions = await Questions.find({ _id: { $in: module.questions } });

        return res.json({
            success: true,
            data: questions
        });

    } catch (e) {
        console.error("Error fetching questions:", e);
        res.status(500).json({
            success: false,
            message: e?.message || "Internal Server Error"
        });
    }
};

// export const 