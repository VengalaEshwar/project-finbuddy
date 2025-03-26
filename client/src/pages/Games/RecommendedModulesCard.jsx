import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Module from "./Module.jsx";
import { level1, level2, level3 } from "./QuizData.js";
import "./RecommendedModulesCard.css";

const RecommendedModulesCard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { recommendedModules = [],level ="level1"} = location.state || {};

    // Combine all levels into a single list for lookup
    const allModules = [...level1, ...level2, ...level3];

    // Find actual module data
    const matchedModules = allModules.filter(module =>
        recommendedModules.includes(module.title)
    );

    return (
        <div className="recommended-modules-container">

            <h2>Recommended Modules</h2>
            <NavLink  to="/games/viewAllModules" state={{level}}>
                <button >
                    View All Modules
                </button>
            </NavLink>
            {matchedModules.length > 0 ? (
                <div className="module-container">
                    {matchedModules.map((module, index) => (
                        <Module key={index} module={module} />
                    ))}
                </div>
            ) : (
                <p>No recommended modules. Review all modules!</p>
            )}

        </div>
    );
};

export default RecommendedModulesCard;
