import React, {
  createContext,
  useEffect,
  useState,
  useContext,
} from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const ShopContext = createContext();

const backendUrl = "https://e-commerce-31s-backend.onrender.com";

const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const delivery_fee = 150;

  const { user } = useContext(AuthContext);

  const cartKey = user ? `cart_${user._id}` : "cart_guest";

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  // ---------------- FETCH PRODUCTS ----------------
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/product/list`
        );

        const data = response.data; // ✅ FIX

        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("FETCH PRODUCTS ERROR:", error);
      }
    };

    fetchProducts();
  }, []);

  // ---------------- LOAD CART ----------------
  useEffect(() => {
    const storedCart = localStorage.getItem(cartKey);
    setCartItems(storedCart ? JSON.parse(storedCart) : []);
  }, [cartKey]);

  // ---------------- SAVE CART ----------------
  useEffect(() => {
    localStorage.setItem(cartKey, JSON.stringify(cartItems));
  }, [cartItems, cartKey]);

  // ---------------- ADD TO CART ----------------
  const addToCart = (product) => {
    setCartItems((prev) => {
      const found = prev.find((i) => i._id === product._id);

      if (found) {
        return prev.map((i) =>
          i._id === product._id
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  // ---------------- REMOVE ONE ----------------
  const removeFromCart = (id) => {
    setCartItems((prev) =>
      prev
        .map((i) =>
          i._id === id ? { ...i, qty: i.qty - 1 } : i
        )
        .filter((i) => i.qty > 0)
    );
  };

  // ---------------- DELETE ITEM ----------------
  const deleteFromCart = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => item._id !== id)
    );
  };

  // ---------------- CLEAR CART ----------------
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(cartKey);
  };

  // ---------------- TOTAL ----------------
  const getCartTotal = () =>
    cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <ShopContext.Provider
      value={{
        products,
        currency,
        delivery_fee,
        cartItems,
        addToCart,
        removeFromCart,
        deleteFromCart,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
