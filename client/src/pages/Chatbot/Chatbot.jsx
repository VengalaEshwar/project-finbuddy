import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import "./Chatbot.css";
import chatbotIcon from './chatbot.webp';
import { FaTimes } from "react-icons/fa";
import Loader from "../../components/Loader/Loader.jsx";

const BASE_URL = "http://localhost:5000";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [sessionId, setSessionId] = useState(null);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            sendInitialMessage();
        }
    }, [isOpen]);

    const sendInitialMessage = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: "Hi", sessionId })
            });
            const data = await response.json();
            setSessionId(data.sessionId);
            setMessages([{ text: data.reply, sender: "bot" }]);
        } catch (error) {
            console.error("Error fetching chatbot response:", error);
            setMessages([{ text: "Error getting response.", sender: "bot" }]);
        }
        setLoading(false);
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, sender: "user" };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const response = await fetch(`${BASE_URL}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input, sessionId })
            });
            const data = await response.json();
            setSessionId(data.sessionId);
            const botMessage = { text: data.reply, sender: "bot" };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Error fetching chatbot response:", error);
            setMessages((prev) => [...prev, { text: "Error getting response.", sender: "bot" }]);
        }

        setLoading(false);
    };

    return (
        
        <div className="chatbot-container">
            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <span>Fin-Buddy Chatbot</span>
                        <button onClick={() => setIsOpen(false)} className="close"><FaTimes /></button>
                    </div>
                    <div className="chat-body">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{msg.text}</ReactMarkdown>
                            </div>
                        ))}
                        {loading && <div className="message bot loading"><Loader /></div>}
                    </div>
                    <div className="chat-footer">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                        />
                        <button onClick={sendMessage} disabled={loading}>Send</button>
                    </div>
                </div>
            )}
            <button className="chatbot-icon" onClick={() => setIsOpen(!isOpen)}>
                <img src={chatbotIcon} alt="💬" />
            </button>
        </div>
    );
};

export default Chatbot;
