import React from "react";
import { NavLink } from "react-router-dom";  // highlights which page the user is currently on

// navbar shows Home, Menu, Order & Chat with active highlighting
export function Menu() {
  return (
    <nav className="navbar">
      <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
        Home
      </NavLink>
      <NavLink to="/menu" className={({ isActive }) => (isActive ? "active" : "")}>
        Menu
      </NavLink>
      <NavLink to="/order" className={({ isActive }) => (isActive ? "active" : "")}>
        Order Now
      </NavLink>
      <NavLink to="/chat" className={({ isActive }) => (isActive ? "active" : "")}>
        Chat
      </NavLink>
    </nav>
  );
}
