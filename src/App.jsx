import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ResumeEditor from "./pages/ResumeEditor";
import ResumePreview from "./pages/ResumePreview";

function App() {
  const isAuth = !!localStorage.getItem("token");
  return (
    <Routes>
      <Route path="/" element={isAuth ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/" />} />
      <Route path="/resume/:id/edit" element={isAuth ? <ResumeEditor /> : <Navigate to="/" />} />
      <Route path="/resume/:id/preview" element={<ResumePreview />} />
    </Routes>
  );
}

export default App;
