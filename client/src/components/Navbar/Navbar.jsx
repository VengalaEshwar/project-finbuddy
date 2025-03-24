import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome, FaNewspaper, FaRobot, FaChartBar,
  FaBook, FaGamepad, FaBriefcase, FaUser, FaBars, FaTimes
} from "react-icons/fa";
import "./Navbar.css";


const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };
  
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          Fin<span className="bold">Buddy</span>
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>
            <NavLink to="/" onClick={closeMenu}>
              <FaHome />
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
            <NavLink to="/login" onClick={closeMenu}>
              <button className="get-started" onClick={() => navigate("/login")}>Get Started</button>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
