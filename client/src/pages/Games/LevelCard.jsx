import React from "react";
import "./LevelCard.css";
import { NavLink } from "react-router-dom";

const LevelCard = ({ course }) => {
  return (
    <div className={`finance-card ${course.lock ? "locked" : ""}`}>
      <NavLink to="/learn/quiz" state={{ level: course.level }} className="finance-card-link">
        <div className="finance-icon-wrapper">
          <span role="img" aria-label="icon" className="finance-icon">🔗</span>
        </div>
        <span className="finance-level-badge">Level {course.level}</span>
        <h3 className="finance-title">{course.title}</h3>
        <p className="finance-description">{course.description}</p>
        <div className="finance-difficulty-container">
          {course.difficultyLevels.map((level) => (
            <span key={level} className={`finance-difficulty-badge ${level.toLowerCase()}`}>
              {level}
            </span>
          ))}
        </div>
      </NavLink>
      
      <NavLink to="/learn/viewAllModules" state={{ level: course.level }} className="view-all-btn">
        View All Modules
      </NavLink>

      <div className="finance-modules">
        <h4>Modules</h4>
        <ul>
          {course.modules.map((module, i) => (
            <li key={i} className="finance-module">
              {module.title} {course.lock && <span className="lock-icon">🔒</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LevelCard;
