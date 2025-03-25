import React, { useState } from "react";
import "./Quiz.css";

const quizData = {
    beginner: [
        {
            question: "What is money?",
            options: [
                "Only cash and coins",
                "Anything accepted as payment",
                "Only banknotes",
                "Only digital currency"
            ],
            correct: 1,
            explanation: "Money is anything that is widely accepted as a medium of exchange."
        },
        {
            question: "What is the 50/30/20 rule?",
            options: [
                "A rule for stock investment",
                "A budgeting strategy",
                "A tax-saving scheme",
                "A loan repayment method"
            ],
            correct: 1,
            explanation: "The 50/30/20 rule suggests allocating income into needs (50%), wants (30%), and savings (20%)."
        }
    ]
};

const Quiz = () => {
    

    const questions = quizData["beginner"] || [];
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const handleSelect = (index) => {
        if (!submitted) setSelectedAnswer(index);
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setSubmitted(false);
        }
    };

    const question = questions[currentQuestion];

    return (
        <div className="main-quiz-container">
            <div className="quiz-container">
                <h2>Question {currentQuestion + 1} of {questions.length}</h2>
                <p>{question.question}</p>
                <div className="options">
                    {question.options.map((option, index) => (
                        <div
                            key={index}
                            className={`option ${
                                submitted
                                    ? index === question.correct
                                        ? "correct"
                                        : index === selectedAnswer
                                        ? "wrong"
                                        : ""
                                    : index === selectedAnswer
                                    ? "selected"
                                    : ""
                            }`}
                            onClick={() => handleSelect(index)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
                {submitted && <p className="explanation">{question.explanation}</p>}
                <div className="quiz-buttons">
                    <button className="btn-check" onClick={handleSubmit} disabled={submitted || selectedAnswer === null}>
                        Check Answer
                    </button>
                    <button className="btn-next" onClick={handleNext} disabled={!submitted}>
                        Next Question
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Quiz;
