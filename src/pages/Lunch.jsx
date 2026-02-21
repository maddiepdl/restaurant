import React, { useState, useEffect } from "react";
import { Card } from "../components/Card.jsx";

function Lunch() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const base = import.meta.env.VITE_SUPABASE_URL;
      const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
      const url = base.endsWith("/")
        ? base + "menu_items?select=*&category=eq.Lunch"
        : base + "/menu_items?select=*&category=eq.Lunch";

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

    fetchData();
  }, []);

  return (
    <div>
      <h1>Lunch</h1>
      <div className="grid">
        {items.map((item) => (
          <Card key={item.id} name={item.name} price={item.price} image={item.image_url} />
        ))}
      </div>
    </div>
  );
}

export default Lunch;
