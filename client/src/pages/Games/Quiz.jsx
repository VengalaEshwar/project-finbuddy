import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Quiz.css";
import { UserDetailsContext } from "../../Context/UserDetails";
import { NavLink } from "react-router-dom";
const BASE_URL = "http://localhost:5000/learn";

const Quiz = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { level } = location.state || {};
    const { user } = useContext(UserDetailsContext);

    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (!user?.username) return;

        const fetchQuestions = async () => {
            try {
                const response = await fetch(`${BASE_URL}/quiz/${level}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username: user.username }),
                });

                let  data = await response.json();
                data.data = [data.data[0]]
                if (response.ok && data.success) {
                    setQuestions(data.data.map(q => ({ ...q, selectedAnswer: null })));
                    console.log(data.data);
                } else {
                    setError(data.message || "Failed to load questions");
                }
            } catch (err) {
                setError("Error fetching quiz data");
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [level, user?.username]);

    if (loading) return <p>Loading questions...</p>;
    if (error) return <p>Error: {error}</p>;
    if (questions.length === 0) return <p>No questions available.</p>;

    const handleSelect = (index) => {
        if (!submitted) {
            setQuestions(prev => prev.map((q, i) =>
                i === currentQuestion ? { ...q, selectedAnswer: index } : q
            ));
        }
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    const handleNext = () => {
        setCurrentQuestion(prev => prev + 1);
        setSubmitted(false);
    };



  

    const question = questions[currentQuestion];
    const isLastQuestion = currentQuestion === questions.length - 1;

    return (
        <div className="main-quiz-container">
            <div className="quiz-container">
                <h2>Question {currentQuestion + 1} of {questions.length}</h2>
                <p>{question.question}</p>
                <div className="options">
                    {question.options.map((option, index) => (
                        <div
                            key={index}
                            className={`option ${submitted
                                ? index === question.correctAnswer
                                    ? "correct-answer"
                                    : index === question.selectedAnswer
                                        ? "wrong"
                                        : ""
                                : index === question.selectedAnswer
                                    ? "selected"
                                    : ""
                                }`}
                            onClick={() => handleSelect(index)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
                {submitted && <p className="explanation">Explanation:<br />{question.explanation}</p>}
                <div className="quiz-buttons">
                    {!isLastQuestion ? (
                        <button className="btn-next" onClick={handleNext} disabled={!submitted}>
                            Next Question
                        </button>
                    ) : (
                        <NavLink to="/learn/recommendedModules" state={{ questions ,level}}>
                            <button className="btn-submit" disabled={!submitted}>
                                Submit Quiz
                            </button>
                        </NavLink>

                    )}
                    <button className="btn-check" onClick={handleSubmit} disabled={submitted || question.selectedAnswer === null}>
                        Check Answer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Quiz;
