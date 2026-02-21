import React from "react";
import { Routes, Route } from "react-router-dom";
import { Menu } from "./components/Menu.jsx";
import Home from "./pages/Home.jsx";
import MenuPage from "./pages/Menu.jsx";
import Breakfast from "./pages/Breakfast.jsx";
import Lunch from "./pages/Lunch.jsx";
import Dinner from "./pages/Dinner.jsx";
import Drinks from "./pages/Drinks.jsx";
import Error from "./pages/Error.jsx";

// For Day 2 exercise, I'm using path /menu under my App.jsx router
// App sets up all my routes
function App() {
  return (
    <>
      <Menu />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/breakfast" element={<Breakfast />} />
          <Route path="/lunch" element={<Lunch />} />
          <Route path="/dinner" element={<Dinner />} />
          <Route path="/drinks" element={<Drinks />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
