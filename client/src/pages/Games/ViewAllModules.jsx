import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Module from "./Module.jsx";
import "./ViewAllModules.css";
import { level1, level2, level3 } from "./QuizData.js";

const ViewAllModules = () => {
  const location = useLocation();
  const { level } = location.state || {}; 
  const [selectedCourse, setSelectedCourse] = useState([]);

  useEffect(() => {
    if (level === "level1") setSelectedCourse(level1);
    else if (level === "level2") setSelectedCourse(level2);
    else if (level === "level3") setSelectedCourse(level3);
  }, [level]);

  return (
    <div className="modules-page">
      {selectedCourse.length > 0 ? (
        <>
          {/* Level Info */}
          {/* <div className="level-info">
            <h1 className="level-title">{level}</h1>
            <p className="level-description">
              Explore the modules available for {level}.
            </p>
          </div> */}

          {/* Display Modules for Selected Level */}
          <div className="module-container">
            {selectedCourse.map((module, index) => (
              <Module key={index} module={module} />
            ))}
          </div>
        </>
      ) : (
        <p className="error-message">Invalid level selected.</p>
      )}
    </div>
  );
};

export default ViewAllModules;
