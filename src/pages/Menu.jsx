import React, { useState, useEffect } from "react";
import { Card } from "../components/Card.jsx";

// useEffect fetches all my SupaBase menu_items one time when page loads 
// .filter() creates my categories (breakfast, lunch, dinner, drinks) 
// map() display each of my item’s name, price & image inside the Card
function MenuPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchAll() {
      const base = import.meta.env.VITE_SUPABASE_URL;
      const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
      const url = base.endsWith("/")
        ? base + "menu_items?select=*"
        : base + "/menu_items?select=*";

      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            apikey: key,
            Authorization: `Bearer ${key}`
          }
        });

        if (!res.ok) {
          setItems([]);
          return;
        }

        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } catch {
        setItems([]);
      }
    }

    fetchAll();
  }, []);

  const breakfast = items.filter((i) => i.category?.toLowerCase() === "breakfast");
  const lunch = items.filter((i) => i.category?.toLowerCase() === "lunch");
  const dinner = items.filter((i) => i.category?.toLowerCase() === "dinner");
  const drinks = items.filter((i) => i.category?.toLowerCase() === "drinks");

  return (
    <div>
      <h1>Menu</h1>

      <h2>Breakfast</h2>
      <div className="grid">
        {breakfast.map((item) => (
          <Card key={item.id} name={item.name} price={item.price} image={item.image_url} />
        ))}
      </div>

      <h2>Lunch</h2>
      <div className="grid">
        {lunch.map((item) => (
          <Card key={item.id} name={item.name} price={item.price} image={item.image_url} />
        ))}
      </div>

      <h2>Dinner</h2>
      <div className="grid">
        {dinner.map((item) => (
          <Card key={item.id} name={item.name} price={item.price} image={item.image_url} />
        ))}
      </div>

      <h2>Beverages & Drinks</h2>
      <div className="grid">
        {drinks.map((item) => (
          <Card key={item.id} name={item.name} price={item.price} image={item.image_url} />
        ))}
      </div>
    </div>
  );
}

export default MenuPage;
