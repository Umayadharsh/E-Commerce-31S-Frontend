import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  const {
    cartItems,
    currency,
    delivery_fee,
    addToCart,
    removeFromCart,
    deleteFromCart,
    getCartTotal,
  } = useContext(ShopContext);

  if (cartItems.length === 0) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-light mb-4">Your cart is empty</h2>
        <Link
          to="/Allproducts"
          className="inline-block mt-4 px-6 py-3 bg-black text-white text-sm"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="text-2xl font-light mb-10">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* LEFT: CART ITEMS */}
        <div className="flex-1 space-y-8">
          {cartItems.map((item) => (
            <div key={item._id} className="flex gap-6 border-b pb-6">
              <img
                src={item.images?.[0]}
                alt={item.name}
                className="w-28 h-36 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h3 className="text-sm font-medium mb-1">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-3">
                  {currency}{item.price}
                </p>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="w-8 h-8 border text-sm"
                  >
                    −
                  </button>

                  <span className="text-sm">{item.qty}</span>

                  <button
                    onClick={() => addToCart(item)}
                    className="w-8 h-8 border text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => deleteFromCart(item._id)}
                className="text-xs text-gray-400 hover:text-black"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* RIGHT: SUMMARY */}
        <div className="w-full lg:w-[360px] border p-6 rounded-lg">
          <h2 className="text-lg font-medium mb-6">Order Summary</h2>

          <div className="flex justify-between text-sm mb-4">
            <span>Subtotal</span>
            <span>{currency}{getCartTotal()}</span>
          </div>

          <div className="flex justify-between text-sm mb-4">
            <span>Delivery</span>
            <span>{currency}{delivery_fee}</span>
          </div>

          <div className="border-t pt-4 flex justify-between font-medium">
            <span>Total</span>
            <span>{currency}{getCartTotal() + delivery_fee}</span>
          </div>

          <button
            onClick={() => navigate("/placeorder")}
            className="w-full bg-black text-white py-3 mt-6 text-sm hover:opacity-90"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
