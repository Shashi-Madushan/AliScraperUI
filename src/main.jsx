import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import "./index.css";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute"
import AdminLogin from "./pages/AdminLogin";
ReactDOM.createRoot(document.getElementById("root")).render(

    <Router>
      <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/products" element={<Dashboard />} />
          <Route path="/stores" element={<Dashboard />} />
          <Route path="/account" element={<Dashboard />} />
          <Route path="/settings" element={<Dashboard />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin/>} />

          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/products" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/stats" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/settings" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      </Routes>
    </Router>

);
