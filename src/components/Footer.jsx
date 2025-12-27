import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-white mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        
        {/* BRAND */}
        <div className="flex flex-col items-center md:items-start">
          <img src={assets.logo1} className="w-28 mb-4" alt="Logo" />
          <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
            Minimal jewellery designed for everyday wear. Clean forms,
            premium finishes and effortless style — built to move with you.
          </p>
        </div>

        {/* COMPANY */}
        <div>
          <h3 className="text-sm font-semibold mb-4 uppercase tracking-wide ">
            Company
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-black transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/Allproducts" className="hover:text-black transition">
                Products
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-black transition">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* GET IN TOUCH */}
        <div>
          <h3 className="text-sm font-semibold mb-4 uppercase tracking-wide">
            Get in Touch
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>+91 90000 00000</li>
            <li>support@thirtyoneS.in</li>
            <li className="hover:text-black cursor-pointer transition">
              Instagram
            </li>
          </ul>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t py-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} ThirtyOneS®. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
