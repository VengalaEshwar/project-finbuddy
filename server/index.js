import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import mongoose from "mongoose";
import chatbot from "./endpoints/chatbot.js";
import latestNews from "./endpoints/news.js";
import signup,{validateSignup} from "./auth/signup.js";
import verifyOtp from "./auth/verifyOtp.js";
import login,{validateLogin} from "./auth/login.js";

dotenv.config();

const app = express();
const PORT = 5000;


//connecting to mongoDB
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));


// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(cors());
app.use(express.json());

//auth 
app.post("/signup",validateSignup,signup)
app.post("/verifyOtp",verifyOtp);
app.post("/login",validateLogin,login);

//endpoints
app.post("/chat",chatbot);
app.post("/news",latestNews);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
//testing
app.get("/",(req,res)=>{
    res.send("Server is running");
})
