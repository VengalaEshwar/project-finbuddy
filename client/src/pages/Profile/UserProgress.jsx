import React, { useState } from "react";
import { Trophy, LineChart, ShieldCheck, Wallet, PiggyBank, Briefcase, CreditCard, Lock, BarChart3, Coins, Bell } from "lucide-react";
import "./UserProgress.css";

const UserProgress = () => {
    const [activeTab, setActiveTab] = useState("progress");

    function renderTab(label, id, Icon) {
        return (
            <button
                className={`tab ${activeTab === id ? "active" : ""}`}
                onClick={() => setActiveTab(id)}
            >
                <Icon size={18} style={{ marginRight: "8px" }} />
                <span>{label}</span>
            </button>
        );
    }

    function renderProgressBar(title, percentage) {
        return (
            <div className="progress-bar-container">
                <div className="top">
                    <span>{title}</span>
                    <span>{percentage}%</span>
                </div>
                <div className="progress-bar">
                    <div className="progress" style={{ width: `${percentage}%` }}></div>
                </div>
            </div>
        );
    }

    function renderBadge(title, Icon, locked = false) {
        return (
            <div className={`badge ${locked ? "locked" : ""}`}>
                <Icon size={20} className="badge-icon" />
                <span>{title}</span>
            </div>
        );
    }

    function renderContent() {
        switch (activeTab) {
            case "progress":
                return (
                    <div className="content">
                        <h2>Your Learning Progress</h2>
                        <p>Track your progress across different financial topics</p>
                        {renderProgressBar("Budgeting Basics", 100)}
                        {renderProgressBar("Investment Fundamentals", 65)}
                        {renderProgressBar("Credit Management", 80)}
                        {renderProgressBar("Retirement Planning", 30)}
                    </div>
                );
            case "achievements":
                return (
                    <div className="content">
                        <h2>Your Achievements</h2>
                        <p>Badges and rewards you've earned through learning</p>
                        <div className="achievements">
                            {renderBadge("Budget Master", CreditCard)}
                            {renderBadge("First Investment", BarChart3)}
                            {renderBadge("Credit Genius", Trophy)}
                            {renderBadge("Savings Guru", PiggyBank, true)}
                            {renderBadge("Tax Expert", Coins, true)}
                            {renderBadge("Market Wizard", LineChart, true)}
                        </div>
                    </div>
                );
            case "finances":
                return (
                    <div className="content">
                        <h2>Your Financial Dashboard</h2>
                        <p>Track your simulated portfolio and financial goals</p>
                        <div className="finance-box">Budget Overview</div>
                        <div className="finance-box">Investment Portfolio</div>
                    </div>
                );
            case "security":
                return (
                    <div className="content">
                        <h2>Security Settings</h2>
                        <p>Manage your account security settings</p>
                        <div className="security-box">
                            <div className="security-header">
                                <Lock size={20} />
                                <span>Password</span>
                                <button className="change-btn">Change</button>
                            </div>
                            <p>Last changed 3 months ago</p>
                        </div>

                        {/* Notifications Preference Section */}
                        <div className="security-box">
                            <div className="security-header">
                                <Bell size={20} />
                                <span>Notifications</span>
                                <input type="checkbox" className="toggle-checkbox" />
                            </div>
                            <p>Manage your notification preferences</p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    }

    return (
        <div className="user-progress">
            <div className="tabs">
                {renderTab("Progress", "progress", LineChart)}
                {renderTab("Achievements", "achievements", Trophy)}
                {renderTab("Finances", "finances", Wallet)}
                {renderTab("Security", "security", ShieldCheck)}
            </div>
            {renderContent()}
        </div>
    );
};

export default UserProgress;
