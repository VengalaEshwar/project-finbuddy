import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Module from "./Module.jsx"; // Import Module component
import "./RecommendedModulesCard.css";

const BASE_URL = "http://localhost:5000/learn"; // Change if necessary

const RecommendedModulesCard = () => {
    const location = useLocation();
    const { wrongModuleIds = [], level = "1" } = location.state || {};

    const [recommendedModules, setRecommendedModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (wrongModuleIds.length === 0) {
            setLoading(false);
            return;
        }

        const fetchRecommendedModules = async () => {
            try {
                const response = await fetch(`${BASE_URL}/recommendModules`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ wrongModuleIds }),
                });

                const data = await response.json();
                if (response.ok && data.success) {
                    setRecommendedModules(data.data); // Store the fetched module data
                } else {
                    setError(data.message || "Failed to fetch recommended modules.");
                }
            } catch (err) {
                setError("Error fetching modules.");
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendedModules();
    }, [wrongModuleIds]);

    if (loading) return <p>Loading recommended modules...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="recommended-modules-container">
            <h2>Recommended Modules</h2>
            <NavLink to="/games/viewAllModules" state={{ level }}>
                <button>View All Modules</button>
            </NavLink>
            {recommendedModules.length > 0 ? (
                <div className="module-container">
                    {recommendedModules.map((module) => (
                        <Module key={module._id} module={module} />
                    ))}
                </div>
            ) : (
                <p>No recommended modules. Review all modules!</p>
            )}
        </div>
    );
};

export default RecommendedModulesCard;
