import React from "react";
import "./LevelCard.css";
import { useNavigate } from "react-router-dom";

const LevelCard = ({ course, lock = false }) => {
  const navigate = useNavigate();
  const handleLevelClick = () => {
    navigate("/games/quiz");
  };
  return (
    <div className={`finance-card ${lock ? "locked" : ""}`} onClick={handleLevelClick}>
      <div className="finance-icon-wrapper">
        <span role="img" aria-label="icon" className="finance-icon">🔗</span>
      </div>
      <span className="finance-level-badge">{course.level}</span>
      <h3 className="finance-title">{course.title}</h3>
      <p className="finance-description">{course.description}</p>
      <div className="finance-difficulty-container">
        {course.difficultyLevels.map((level) => (
          <span
            key={level}
            className={`finance-difficulty-badge ${level.toLowerCase()}`}
          >
            {level}
          </span>
        ))}
      </div>
      <div className="finance-modules">
        <h4>Modules</h4>
        <ul>
          {course.modules.map((module, i) => (
            <li key={i} className="finance-module">
              {module} {lock && <span className="lock-icon">🔒</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LevelCard;
