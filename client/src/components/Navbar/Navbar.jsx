import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome, FaNewspaper, FaChartBar, FaBook,
  FaGamepad, FaBriefcase, FaUser, FaBars, FaTimes
} from "react-icons/fa";
import { UserDetailsContext } from  "../../Context/UserDetails.jsx";
import "./Navbar.css";

const Navbar = () => {
  const { user } = useContext(UserDetailsContext); // Get user details
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
            <NavLink to="/learn" onClick={closeMenu}>
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
            <NavLink to={user ? "/learn" : "/login"} onClick={closeMenu}>
              <button className="get-started">
                {user ? "Start Learning" : "Get Started"}
              </button>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
