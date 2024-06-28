
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { UserContextProvider } from './UserContext';
import { CartContextProvider } from './CartContext';
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import FAQ from "./pages/FAQ";
import CategoryPage from "./pages/CategoryPage";
import AccountPage from "./pages/AccountPage";
import ProductPage from "./pages/ProductPage";
import ProductDetails from "./pages/ProductDetails"; 
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";

const App = () => {
  return (
    <UserContextProvider>
      <CartContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/frequently_asked_questions" element={<FAQ />} />
            <Route path="/category/:name" element={<CategoryPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </Router>
      </CartContextProvider>
    </UserContextProvider>
  );
};

export default App;
