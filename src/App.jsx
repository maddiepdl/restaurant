import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./pages/Menu.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/menu" element={<Menu />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;