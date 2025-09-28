import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import "./ModuleQuiz.css";

const BASE_URL = "http://localhost:5000/learn"; // Change if necessary

const ModuleQuiz = ({ module, nextTab }) => {
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const fetchQuizQuestions = async () => {
            try {
                if (!module?.questions || module.questions.length === 0) {
                    setError("No questions found for this module.");
                    setLoading(false);
                    return;
                }

                const response = await fetch(`${BASE_URL}/getQuestions`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ questionIds: module.questions })
                });

                const data = await response.json();
                if (response.ok && data.success) {
                    setQuizQuestions(data.data);
                } else {
                    setError(data.message || "Failed to fetch quiz questions.");
                }
            } catch (err) {
                setError("Error fetching quiz questions.");
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        if (module) {
            fetchQuizQuestions();
        }
    }, [module]);

    if (loading) return <p className="loading-message">Loading quiz...</p>;
    if (error) return <p className="error-message">{error}</p>;
    if (quizQuestions.length === 0) return <p className="error-message">No quiz available for this module.</p>;

    const question = quizQuestions[currentQuestion];
    const isLastQuestion = currentQuestion === quizQuestions.length - 1;

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
            <h2>Question {currentQuestion + 1} of {quizQuestions.length}</h2>
            <p>{question.question}</p>

            <div className="options">
                {question.options.map((option, index) => (
                    <div
                        key={index}
                        className={`option ${submitted
                            ? index === question.correctAnswer ? "correct" : index === selectedAnswer ? "wrong" : ""
                            : index === selectedAnswer ? "selected" : ""
                        }`}
                        onClick={() => handleSelect(index)}
                    >
                        {option}
                    </div>
                ))}
            </div>

            {submitted && question.explanation && (
                <p className="explanation">
                    Explanation:<br />
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                        {question.explanation}
                    </ReactMarkdown>
                </p>
            )}

            <div className="quiz-buttons">
                <button
                    className="btn-check"
                    onClick={handleSubmit}
                    disabled={submitted || selectedAnswer === null}
                >
                    Check Answer
                </button>
                <button
                    className="btn-next"
                    onClick={handleNext}
                    disabled={!submitted}
                >
                    {isLastQuestion ? "View Summary" : "Next Question"}
                </button>
            </div>
        </div>
    );
};

export default ModuleQuiz;
