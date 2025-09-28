import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import "./ModuleDetails.css";

import { moduleDetails } from "./QuizData";
import { useLocation } from "react-router-dom";
import ModuleQuiz from "./ModuleQuiz"; // Import Quiz Component

const ModuleDetail = () => {
    const location = useLocation();
    const module = location.state;
    // console.log(module,"from 000");
    const [activeTab, setActiveTab] = useState("module");
    const [quizCompleted, setQuizCompleted] = useState(false);

    const tabs = ["module", "quiz", "summary"];

    const nextTab = () => {
        const currentIndex = tabs.indexOf(activeTab);

        if (activeTab === "module") {
            setActiveTab("quiz");
        } else if (activeTab === "quiz" && quizCompleted) {
            setActiveTab("summary");
        }
    };

    return (
        <div className="module">
            <div className="module-detail-page">
                <div className="head">
                    <h1 className="module-title">{module.title}</h1>
                    <p className="module-description">{module.description}</p>
                </div>

                {/* Tabs */}
                <div className="tabs">
                    <button
                        className={activeTab === "module" ? "active" : ""}
                        onClick={() => activeTab !== "quiz" && setActiveTab("module")}
                        disabled={activeTab === "quiz"}
                    >
                        Module
                    </button>
                    <button
                        className={activeTab === "quiz" ? "active" : ""}
                        onClick={() => activeTab !== "quiz" && setActiveTab("quiz")}
                        disabled={activeTab === "quiz"}
                    >
                        Quiz
                    </button>
                    <button
                        className={activeTab === "summary" ? "active" : ""}
                        onClick={() => activeTab !== "quiz" && setActiveTab("summary")}
                        disabled={activeTab === "quiz"}
                    >
                        Summary
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="tab-content">
                    {activeTab === "module" && (
                        <div className="module-content">
                            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                {module.content}
                            </ReactMarkdown>
                        </div>
                    )}

                    {activeTab === "quiz" && (
                        <ModuleQuiz module={module} nextTab={() => setQuizCompleted(true)} />
                    )}

                    {activeTab === "summary"  &&  (
                        <div className="module-summary">
                            <h2>Summary</h2>
                            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                {module.summary || "No summary available for this module."}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>

                {/* Next Button */}
                {activeTab !== "summary" && (
                    <button
                        className="next-button"
                        onClick={nextTab}
                        disabled={activeTab === "quiz" && !quizCompleted}
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default ModuleDetail;
