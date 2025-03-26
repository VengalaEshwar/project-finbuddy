import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import "./ModuleQuiz.css";

import { moduleQuizData } from "./QuizData";

const ModuleQuiz = ({ module, nextTab }) => {
    module.quiz = moduleQuizData.questions;
    if (!module || !module.quiz || module.quiz.length === 0) {
        return <p className="error-message">No quiz available for this module.</p>;
    }

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const question = module.quiz[currentQuestion];
    const isLastQuestion = currentQuestion === module.quiz.length - 1;

    const handleSelect = (index) => {
        if (!submitted) setSelectedAnswer(index);
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    const handleNext = () => {
        if (!isLastQuestion) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setSubmitted(false);
        } else {
            nextTab(); // Move to Summary after last question
        }
    };

    return (
        
            <div className="module-quiz-container">
                <h2>Question {currentQuestion + 1} of {module.quiz.length}</h2>
                <p>{question.question}</p>

                <div className="options">
                    {question.options.map((option, index) => (
                        <div
                            key={index}
                            className={`option ${submitted
                                ? index === question.correct ? "correct" : index === selectedAnswer ? "wrong" : ""
                                : index === selectedAnswer ? "selected" : ""
                                }`}
                            onClick={() => handleSelect(index)}
                        >
                            {option}
                        </div>
                    ))}
                </div>

                {submitted && <p className="explanation">Explanation:<br /><ReactMarkdown rehypePlugins={[rehypeRaw]}>{question.explanation}</ReactMarkdown></p>}

                <div className="quiz-buttons">
                    <button className="btn-check" onClick={handleSubmit} disabled={submitted || selectedAnswer === null}>
                        Check Answer
                    </button>
                    <button className="btn-next" onClick={handleNext} disabled={!submitted}>
                        {isLastQuestion ? "View Summary" : "Next Question"}
                    </button>
                </div>
            </div>
     
    );
};

export default ModuleQuiz;
