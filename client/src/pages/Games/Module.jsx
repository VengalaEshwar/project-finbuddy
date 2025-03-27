import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Module.css";
import { FaLock } from "react-icons/fa"; 

const Module = ({ module }) => {
  console.log(module,"module");
  const navigate = useNavigate();
  // const handleStartClick = (e) => {
  //   if (module?.lock) {
  //     e.preventDefault(); // Prevent navigation for locked modules
  //     alert("This module is locked. Complete previous modules to unlock it.");
  //   } else {
  //     navigate("/learn/moduleDetails", { state: { module } });
  //   }
  // };

  return (
    <div className={`module-card ${module?.lock ? "locked" : ""}`}>
      {module?.lock && (
        <div className="lock-overlay">
          <FaLock className="lock-icon" />
        </div>
      )}

      <h2 className="module-title">{module?.title}</h2>
      <p className="module-description">{module?.description}</p>

      <div className="module-info">
        {/* <p><strong>Level:</strong> {module?.level}</p>
        <p><strong>Status:</strong> {module?.userStatus}</p>
        <p><strong>Quiz:</strong> {module?.quizStatus}</p> */}
        {module.quizStatus === "Attempted" && (
          <p>
            <strong>Performance:</strong> {module?.correctAnswers}/{module?.totalQuestions}
          </p>
        )}
      </div>

     <NavLink to="/learn/moduleDetails" state= { module } >
     <button 
        className="quiz-button"
        disabled={module?.lock}
        // onClick={handleStartClick} // Start button now handles navigation
      >
        {module?.quizStatus === "Not Attempted" ? "Start" : "start"}
      </button>
     </NavLink>
    </div>
  );
};

export default Module;
