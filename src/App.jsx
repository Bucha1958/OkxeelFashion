import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserContextProvider } from './UserContext';
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import FAQ from "./pages/FAQ";
import CategoryPage from "./pages/CategoryPage";

const App = () => {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/frequently_asked_questions" element={<FAQ />} />
          <Route path="/category/:name" element={<CategoryPage />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
};

export default App;
