import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import "./Navbar.css"
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false); 
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
      <div className="navbar ">
        <div className="logo">FinBuddy</div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/news">News</NavLink>
        <NavLink to="/simulators">Simulators</NavLink>
        <NavLink to="/books">Books</NavLink>
        <NavLink to="/career">Career</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </div>
  )
}

export default Navbar