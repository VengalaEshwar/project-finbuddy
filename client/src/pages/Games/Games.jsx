import React, { useContext } from "react";
import LevelCard from "./LevelCard.jsx";
import "./Games.css";
import { CoursesContext } from "../../context/Courses.jsx";

export default function Games() {
  const { courses } = useContext(CoursesContext);

  return (
    <div className="games-page">
      <div className="head">
        <h1 className="games-heading">Financial Literacy Levels</h1>
        <div className="glass-card">
          <p className="games-description">
            Master these 3 levels to become financially literate. Each level has three difficulty stages to progress through.
          </p>
        </div>
      </div>

      <div className="games-container">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <LevelCard key={course._id || index} course={course} />
          ))
        ) : (
          <p>Loading courses...</p>
        )}
      </div>
    </div>
  );
}
