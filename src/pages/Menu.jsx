import React from "react";
// Supabase connection using my .env values
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,     // uses my .env URL
  import.meta.env.VITE_SUPABASE_ANON_KEY   // uses my .env key
);

function Menu() {
  return (
    <div>
      <h1>Creole Restaurant Menu</h1>
    </div>
  );
}

export default Menu;
