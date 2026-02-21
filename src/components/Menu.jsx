import React from "react";
import { Link } from "react-router-dom";

// navbar shows Home & Menu 
export function Menu() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/menu">Menu</Link>
    </nav>
  );
}
