import React from 'react'
import LevelCard from './LevelCard.jsx';
import "./Games.css";
import { courses } from "./QuizData.js";


export default function Games() {



    return (
        <div className='games-page'>
            <div className="head">
                <h1 className="games-heading">Financial Literacy Levels</h1>

                <div className="glass-card">
                    <p className="games-description">
                        Master these 3 levels to become financially literate. Each level has three difficulty stages to progress through.
                    </p>
                </div>
            </div>
            <div className="games-container">
                <LevelCard course={courses[0]} />
                <LevelCard course={courses[1]} />
                <LevelCard course={courses[2]} />
            </div>
        </div>
    )
}
