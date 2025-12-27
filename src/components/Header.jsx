import React from "react";
import TopBar from "./Topbar";
import Navbar from "./Navbar.jsx";
import CollectionsBar from "./Collectionbar";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


const Header = () => {
    const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white">
      <TopBar />
      <Navbar />
      <CollectionsBar />
    </div>
  );
};

export default Header;
