import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Navbar.css"
function Navbar() {
  return (
      <div className="navbar">
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