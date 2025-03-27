import React, { useContext } from "react";
import "./UserDetailsCard.css";
import { FaUser } from 'react-icons/fa';
import { UserDetailsContext } from "../../Context/UserDetails";

const ProfileCard = () => {
    const {user} = useContext(UserDetailsContext);
    const userData = {
        name: user?.username,
        role: "Student",
        financialKnowledge: 20,
        lessons: 0,
        badges: 0,
    };
    return (
        <div className="profile-card">
            <div className="avatar" >
                <FaUser />
            </div>
            <h2>{userData.name}</h2>
            <p className="role">{userData.role}</p>
            <div className="progress-container">
                <span>Financial Knowledge</span>
                <div className="progress-bar">
                    <div className="progress" style={{ width: `${userData.financialKnowledge}%` }}></div>
                </div>
                <span className="percentage">{userData.financialKnowledge}%</span>
            </div>
            <div className="stats">
                <div>
                    <h3>{userData.lessons}</h3>
                    <p>Lessons</p>
                </div>
                <div>
                    <h3>{userData.badges}</h3>
                    <p>Badges</p>
                </div>
            </div>
            <button className="edit-profile">⚙ Edit Profile</button>
        </div>
    );
};

export default ProfileCard;
