import React from "react";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Scrolltop from "./components/Scrolltop";
import Search from "./pages/Search";
import Home from "./pages/home";
import Collection from "./pages/collection";
import About from "./pages/about";
import Product from "./pages/product";
import Allproducts from "./pages/Allproducts";
import Cart from "./pages/cart";
import Login from "./pages/login";
import Placeorder from "./pages/placeorder";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Register from "./pages/register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Forgot from "./components/Forgot";
import ResetPass from "./pages/ResetPass";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ ADD THIS

const App = () => {
  return (
    <>
    <Scrolltop /> 
      {/* FIXED HEADER */}
      <Header />

      {/* PAGE CONTENT */}
      <main className="pt-[180px] px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/collection/:collectionName" element={<Collection />} />
          <Route path="/Allproducts" element={<Allproducts />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Forgot" element={<Forgot />} />
          <Route path="/reset-password/:token" element={<ResetPass />} />
          <Route path="/Search" element= {<Search/>}/>
          

          {/* 🔒 PROTECTED ROUTES */}
          <Route
            path="/placeorder"
            element={
              <ProtectedRoute>
                <Placeorder />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/Orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </>
  );
};

export default App;
