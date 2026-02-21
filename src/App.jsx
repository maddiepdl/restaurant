import React from "react";
import { Routes, Route } from "react-router-dom";
import { Menu } from "./components/Menu.jsx";
import Home from "./pages/Home.jsx";
import MenuPage from "./pages/Menu.jsx";
import OrderPage from "./pages/OrderPage.jsx";
import Error from "./pages/Error.jsx";

// sets up my required routes
function App() {
  return (
    <>
      <Menu />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
