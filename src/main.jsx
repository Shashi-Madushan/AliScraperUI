import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import "./index.css";
import PrivateRoute from "./components/PrivateRoute";
import ProductEdit from "./components/ProductEdit";
ReactDOM.createRoot(document.getElementById("root")).render(

    <Router>
      <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

      </Routes>
    </Router>

);