import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

// Store user chat history
const sessions = {};

const chatbot = async (req, res, systemChat) => {
    try {
        let { sessionId, message } = req.body;
        console.log(`Session: ${sessionId}, Message: ${message}`);

        if (!message) return res.status(400).json({ error: "Message is required" });

        // If no session ID is provided, generate a new one
        if (!sessionId) {
            sessionId = uuidv4();
            sessions[sessionId] = {
                chat: systemChat,  
                history: [],
            };
        }

        // Retrieve or create a chat instance for the session
        if (!sessions[sessionId]) {
            sessions[sessionId] = {
                chat: systemChat,
                history: [],
            };
        }

        const chatSession = sessions[sessionId];

        // Append user message to history
        chatSession.history.push({ role: "user", parts: [{ text: message }] });

        // Send message to the chat session
        const result = await chatSession.chat.sendMessage(message);
        const reply = result.response.text();

        // Append model reply to history
        chatSession.history.push({ role: "model", parts: [{ text: reply }] });

        res.json({ sessionId, reply });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default chatbot;
