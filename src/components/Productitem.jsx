import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Productitem = ({ id, name, price, image, bestseller }) => {
  const { addToCart } = useContext(ShopContext);
  const navigate = useNavigate();

  const [hovered, setHovered] = useState(false);

  // product object for cart
  const product = {
    _id: id,
    name,
    price,
    images: [image], // cart safe
    bestseller,
  };

  return (
    <Link
      to={`/product/${id}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden bg-gray-100 rounded-xl">

        {bestseller && (
          <span className="absolute top-4 right-4 bg-white text-xs px-3 py-1 z-10">
            SAVE 50%
          </span>
        )}

        {/* IMAGE */}
        <img
          src={hovered && image ? image : image}
          alt={name}
          className="w-full object-fit transition duration-300"
        />

        {/* QUICK ADD */}
        <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
              navigate("/cart");
            }}
            className="w-full bg-white py-3 text-sm font-medium hover:bg-black hover:text-white transition"
          >
            QUICK ADD
          </button>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm">{name}</p>
        <p className="text-sm font-semibold">₹{price}</p>
      </div>
    </Link>
  );
};

export default Productitem;
