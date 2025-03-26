import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import mongoose from "mongoose";
import moduleKnowledge from "./modularKnowledge.js"
import {addQuestion,addModule,addQuestionToModule,getQuiz,addCourse, recommendedModules, getModules, markLevel,getQuestions} from "./endpoints/learn.js"
import chatbot from "./endpoints/chatbot.js";
import latestNews from "./endpoints/news.js";
import signup, { validateSignup } from "./auth/signup.js";
import verifyOtp from "./auth/verifyOtp.js";
import login, { validateLogin } from "./auth/login.js";
import {getSymbols, getStockData} from "./endpoints/stocks.js"

import { verifyToken } from "./auth/verifyToken.js";
dotenv.config();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//  Send Module Knowledge to Gemini at Startup**
let systemChat;
async function initializeSystemChat() {
    systemChat = model.startChat({ history: [{ role: "user", parts: [{ text: moduleKnowledge }] }] });
    console.log(" Module knowledge sent to Gemini at startup.");
}


initializeSystemChat();


app.post("/chat", (req, res) => chatbot(req, res, systemChat));

app.post("/news", latestNews);
app.post("/signup", validateSignup, signup);
app.post("/verifyOtp", verifyOtp);
app.post("/login", validateLogin, login);
app.post("/verifyToken",verifyToken);
app.get("/stocks/getSymbols", getSymbols);
app.get("/stocks/getStockData/:symbol", getStockData);

app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});

//learn apis
//-------------------admin operations---------------------
app.post("/learn/addQuestion",addQuestion);
app.post("/learn/createModule",addModule);
app.post("/learn/addQuestionToModule",addQuestionToModule);
app.post("/learn/addCourse",addCourse);
//----------------------------------------
app.post("/learn/quiz/:level",getQuiz); 
app.post("/learn/recommendModules",recommendedModules);
app.get("/learn/getModules/:moduleId",getModules);
app.post("/learn/getQuestions",getQuestions);
app.post("/learn/marklevel/:userId/:level",markLevel);
//testing
app.get("/",(req,res)=>{
    res.send("Server is running");
})