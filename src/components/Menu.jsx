import React from "react";
import { Link } from "react-router-dom";

// navbar shows Home, Menu & Order
export function Menu() {
  return (
    <nav className="navbar">
      <h2>Creole Restaurant</h2>
      <Link to="/">Home</Link>
      <Link to="/menu">Menu</Link>
      <Link to="/order">Order Now</Link>
    </nav>
  );
}
