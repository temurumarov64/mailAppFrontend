import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./App.css";
import { Login } from "./pages/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Mail from "./pages/Mail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mail/:sender" element={<Mail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
