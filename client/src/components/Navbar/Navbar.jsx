import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome, FaNewspaper, FaRobot, FaChartBar,
  FaBook, FaGamepad, FaBriefcase, FaUser, FaBars, FaTimes
} from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle menu function
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu when a link is clicked
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">
          Fin<span className="bold">Buddy</span>
        </div>

        {/* Hamburger Menu Icon */}
        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>
            <NavLink to="/" onClick={closeMenu}><FaHome />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/news" onClick={closeMenu}>
              <FaNewspaper />
              News
            </NavLink>
          </li>
          <li>
            <NavLink to="/chatbot" onClick={closeMenu}>
              <FaRobot />
              chatbot
            </NavLink>
          </li>
          <li>
            <NavLink to="/simulators" onClick={closeMenu}>
              <FaChartBar />
              Simulator
            </NavLink>
          </li>
          <li>
            <NavLink to="/books" onClick={closeMenu}>
              <FaBook />
              Books
            </NavLink>
          </li>
          <li>
            <NavLink to="/games" onClick={closeMenu}>
              <FaGamepad />
              Games
            </NavLink>
          </li>
          <li>
            <NavLink to="/career" onClick={closeMenu}>
              <FaBriefcase />
              Career
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" onClick={closeMenu}>
              <FaUser />
              Profile
            </NavLink>
          </li>
        <li>
          <NavLink to="/auth" onClick={closeMenu}>
            <button className="get-started">Get Started</button>
          </NavLink>
        </li>
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;
