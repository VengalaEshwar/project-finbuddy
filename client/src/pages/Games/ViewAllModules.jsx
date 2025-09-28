import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Module from "./Module.jsx";
import "./ViewAllModules.css";
import { CoursesContext } from "../../Context/Courses.jsx";

const ViewAllModules = () => {
  const location = useLocation();
  const { level } = location.state || {};
  const { courses } = useContext(CoursesContext);
  const [selectedModules, setSelectedModules] = useState([]);

  useEffect(() => {
    if (!courses || courses.length === 0) return;

    // Map levels to course index (assuming first 3 courses = levels 1-3)
    const levelIndex = parseInt(level, 10) - 1;

    if (levelIndex >= 0 && levelIndex < courses.length) {
      setSelectedModules(courses[levelIndex].modules || []);
    } else {
      setSelectedModules([]); // invalid level
    }
  }, [level, courses]);

  return (
    <div className="modules-page">
      {selectedModules.length > 0 ? (
        <div className="module-container">
          {selectedModules.map((module, index) => (
            <Module key={index} module={module} />
          ))}
        </div>
      ) : (
        <p className="error-message">Invalid level selected.</p>
      )}
    </div>
  );
};

export default ViewAllModules;
