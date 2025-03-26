import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { level1Quiz, level2Quiz, level3Quiz } from "./QuizData.js";
import "./Quiz.css";
import PageTransition from "../../components/layouts/PageTransition/PageTransition";
const Quiz = () => {
    const location = useLocation();
    const { level } = location.state || {};

    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]);

    useEffect(() => {
        if (level === "level1") setQuestions(level1Quiz);
        else if (level === "level2") setQuestions(level2Quiz);
        else if (level === "level3") setQuestions(level3Quiz);
    }, [level]);

    if (questions.length === 0) {
        return <p>Loading questions...</p>;
    }

    const handleSelect = (index) => {
        if (!submitted) setSelectedAnswer(index);
    };

    const handleSubmit = () => {
        const question = questions[currentQuestion];
        const isCorrect = selectedAnswer === question.correct;
        setUserAnswers([...userAnswers, {
            question: question.question,
            userAnswer: question.options[selectedAnswer],
            correctAnswer: question.options[question.correct],
            isCorrect,
            module: question.module
        }]);
        setSubmitted(true);
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setSubmitted(false);
        }
    };

    const incorrectAnswers = userAnswers.filter(answer => !answer.isCorrect);
    const recommendedModules = [...new Set(incorrectAnswers.map(answer => answer.module))];

    const question = questions[currentQuestion];
    const isLastQuestion = currentQuestion === questions.length - 1;

    return (
        <PageTransition>
            <div className="main-quiz-container">
                <div className="quiz-container">
                    <h2>Question {currentQuestion + 1} of {questions.length}</h2>
                    <p>{question.question}</p>
                    <div className="options">
                        {question.options.map((option, index) => (
                            <div
                                key={index}
                                className={`option ${submitted
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
                    {submitted && <p className="explanation">Explanation :<br/>{question.explanation}</p>}  `   `
                    <div className="quiz-buttons">
                        {!isLastQuestion ? (
                            <button className="btn-next" onClick={handleNext} disabled={!submitted}>
                                Next Question
                            </button>
                        ) : (
                            <NavLink
                                to="/learn/recommendedModules"
                                state={{ recommendedModules, level }}
                            >
                                <button className="btn-submit" disabled={!submitted}>
                                    Submit Quiz
                                </button>
                            </NavLink>
                        )}
                        <button className="btn-check" onClick={handleSubmit} disabled={submitted || selectedAnswer === null}>
                            Check Answer
                        </button>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Quiz;
