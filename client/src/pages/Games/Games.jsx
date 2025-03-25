import React from 'react'
import LevelCard from './LevelCard.jsx';
import "./Games.css";
export default function Games() {

    const course = {
        level: "Level 1",
        title: "Introduction to Finance",
        description:
            "Understand the basics of finance and why financial literacy matters in everyday life.",
        difficultyLevels: ["Easy", "Medium", "Hard"],
        modules: [
            "Basics of Budgeting",
            "Understanding Interest Rates",
            "Credit Scores & Their Impact",
            "Savings & Investments",
            "Introduction to Taxes",
            "Debt Management Strategies",
            "Retirement Planning Essentials",
            "Stock Market Fundamentals",
            "Real Estate & Mortgages",
            "Financial Fraud Awareness"
        ]
    };

    return (
        <div className='games-page'>
            <div className="head">
                <h1 className="games-heading">Financial Literacy Levels</h1>

                <div className="glass-card">
                    <p className="games-description">
                    Master these 15 levels to become financially literate. Each level has three difficulty stages to progress through.
                    </p>
                </div>
            </div>
            <div className="games-container">
                <LevelCard course={course} />
                <LevelCard course={course} />
                <LevelCard course={course} />
            </div>
        </div>
    )
}
