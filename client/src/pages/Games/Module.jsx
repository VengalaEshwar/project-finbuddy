import React from "react";
import "./Module.css";
import { FaLock } from "react-icons/fa"; 

const Module = ({ module }) => {
  return (
    <div className={`module-card ${module.lock ? "locked" : ""}`}>
      {module.lock && (
        <div className="lock-overlay">
          <FaLock className="lock-icon" />
        </div>
      )}

      <h2 className="module-title">{module.title}</h2>
      <p className="module-description">{module.description}</p>

      <div className="module-info">
        <p><strong>Level:</strong> {module.level}</p>
        <p><strong>Status:</strong> {module.userStatus}</p>
        <p><strong>Quiz:</strong> {module.quizStatus}</p>
        {module.quizStatus === "Attempted" && (
          <p>
            <strong>Performance:</strong> {module.correctAnswers}/{module.totalQuestions}
          </p>
        )}
      </div>

      <button className="quiz-button" disabled={module.lock}>
        {module.quizStatus === "Not Attempted" ? "Start" : "Retake Quiz"}
      </button>
    </div>
  );
};

export default Module;
