import React from "react";

// reusable card for each of my SupaBase items
export function Card({ id, name, price, image }) {
  return (
    <div className="card">
      <img
        src={image}
        alt={name}
        onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/150")}
      />
      <h3>{name}</h3>
      <p>${price}</p>
    </div>
  );
}
