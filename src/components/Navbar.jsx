import React, { useContext, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { cartItems } = useContext(ShopContext);
  const { user, logout } = useContext(AuthContext);

  const [showMenu, setShowMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");

  const cartCount = cartItems.reduce(
    (total, item) => total + (item.qty || item.quantity || 1),
    0
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    navigate(`/search?q=${search}`);
    setSearch("");
    setMobileOpen(false);
  };

  return (
    <div className="flex items-center justify-between h-16 sm:h-20 px-3 sm:px-6 bg-white sticky top-0 z-40 border-b">
      {/* LOGO */}
      <Link to="/">
        <img src={assets.logo1} className="w-24 sm:w-28" alt="Logo" />
      </Link>

      {/* DESKTOP NAV */}
      <ul className="hidden sm:flex gap-6 md:gap-8 text-sm font-medium">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/Allproducts">Products</NavLink>
        <NavLink to="/about">About</NavLink>
      </ul>

      {/* DESKTOP SEARCH */}
      <form
        onSubmit={handleSearch}
        className="hidden md:flex items-center border rounded-full px-4 py-2 w-[260px] lg:w-[280px]"
      >
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none text-sm"
        />
        <button type="submit">
          <img
            src={assets.searchicon}
            className="w-4 cursor-pointer"
            alt="search"
          />
        </button>
      </form>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4 sm:gap-6 relative">
        {/* USER */}
        {!user ? (
          <button onClick={() => navigate("/login")}>
            <img src={assets.usericon} className="w-5" alt="Login" />
          </button>
        ) : (
          <div className="relative">
            <button
              onClick={() => setShowMenu((prev) => !prev)}
              className="text-sm font-medium cursor-pointer"
            >
              Hi, {user.name}
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white border shadow-md z-50 rounded-md overflow-hidden">
                <button
                  onClick={() => {
                    setShowMenu(false);
                    navigate("/profile");
                  }}
                  className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                >
                  Profile
                </button>

                <button
                  onClick={() => {
                    setShowMenu(false);
                    navigate("/orders");
                  }}
                  className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                >
                  Orders
                </button>

                <button
                  onClick={() => {
                    setShowMenu(false);
                    logout();
                    navigate("/");
                  }}
                  className="block w-full px-4 py-2 text-sm text-left text-red-500 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {/* CART */}
        <Link to="/cart" className="relative">
          <img src={assets.carticon} className="w-5" alt="Cart" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </Link>

        {/* MOBILE MENU ICON */}
        <img
          src={assets.menuicon}
          className="w-5 cursor-pointer sm:hidden"
          onClick={() => setMobileOpen(true)}
          alt="Menu"
        />
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-white z-50 p-5 sm:hidden overflow-y-auto">
          <button
            className="mb-6 text-sm font-medium text-gray-700"
            onClick={() => setMobileOpen(false)}
          >
            Close
          </button>

          {/* MOBILE SEARCH */}
          <form
            onSubmit={handleSearch}
            className="flex items-center border rounded-full px-4 py-2 mb-6"
          >
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full outline-none text-sm"
            />
            <button type="submit">
              <img
                src={assets.searchicon}
                className="w-4"
                alt="search"
              />
            </button>
          </form>

          <nav className="flex flex-col gap-5 text-base font-medium">
            <NavLink to="/" onClick={() => setMobileOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/Allproducts" onClick={() => setMobileOpen(false)}>
              Products
            </NavLink>
            <NavLink to="/about" onClick={() => setMobileOpen(false)}>
              About
            </NavLink>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
