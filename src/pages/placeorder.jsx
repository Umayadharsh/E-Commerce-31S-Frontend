import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../config";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { getCartTotal, delivery_fee, currency, cartItems, clearCart } =
    useContext(ShopContext);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  // ---------------- INPUT ----------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // ---------------- VALIDATION ----------------
  const validateForm = () => {
    let newErrors = {};

    Object.keys(form).forEach((key) => {
      if (!form[key].trim()) newErrors[key] = "Required";
    });

    if (!paymentMethod) newErrors.paymentMethod = "Select payment method";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------------- COD ----------------
  const placeCODOrder = async (token, orderData) => {
    const res = await axios.post(
      `${backendUrl}/api/order/place`,
      orderData,
      { headers: { token } }
    );

    if (res.data.success) {
      clearCart();
      navigate("/orders");
    } else {
      alert(res.data.message || "Order failed");
    }
  };

  // ---------------- RAZORPAY ----------------
  const placeRazorpayOrder = async (token, orderData) => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded");
      return;
    }

    const { data } = await axios.post(
      `${backendUrl}/api/order/razorpay`,
      { amount: orderData.amount },
      { headers: { token } }
    );

    if (!data.success) {
      alert("Failed to create Razorpay order");
      return;
    }

    const options = {
      key: data.key,
      amount: data.order.amount,
      currency: "INR",
      name: "Your Store",
      description: "Order Payment",
      order_id: data.order.id,
      handler: async function (response) {
        const verify = await axios.post(
          `${backendUrl}/api/order/verify`,
          { ...response, orderData },
          { headers: { token } }
        );

        if (verify.data.success) {
          clearCart();
          navigate("/orders");
        } else {
          alert("Payment verification failed");
        }
      },
      theme: { color: "#000000" },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  // ---------------- PLACE ORDER ----------------
  const handlePlaceOrder = async () => {
  console.log("🔥 CLICKED PLACE ORDER");

  console.log("🧾 FORM:", form);
  console.log("🛒 CART:", cartItems);
  console.log("💳 PAYMENT:", paymentMethod);

  if (!validateForm()) {
    console.log("❌ VALIDATION FAILED");
    return;
  }

  const token = localStorage.getItem("userToken");
  console.log("🔐 TOKEN:", token);

  if (!token) {
    console.log("❌ NO TOKEN → REDIRECT LOGIN");
    navigate("/login");
    return;
  }

  const orderData = {
    items: cartItems.map((item) => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.qty,
      image: item.images?.[0],
    })),
    address: `${form.street}, ${form.city}, ${form.state}, ${form.country} - ${form.zipcode}`,
    amount: getCartTotal() + delivery_fee,
    paymentMethod,
  };

  console.log("📦 ORDER DATA:", orderData);

  try {
    if (paymentMethod === "cod") {
      console.log("🟢 COD FLOW");
      await placeCODOrder(token, orderData);
    } else {
      console.log("🔵 RAZORPAY FLOW");
      await placeRazorpayOrder(token, orderData);
    }
  } catch (err) {
    console.error("❌ ORDER ERROR:", err);
  }
};


  return (
    <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16">
      {/* LEFT */}
      <div>
        <h2 className="text-xl mb-6">Delivery Information</h2>

        {Object.keys(form).map((field) => (
          <input
            key={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field}
            className="w-full border px-3 py-2 mb-3"
          />
        ))}

        <h2 className="text-sm tracking-widest uppercase mb-6">
          Payment Method
        </h2>

        <div className="flex gap-6 mb-4">
          {["cod", "razorpay"].map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => setPaymentMethod(method)}
              className={`flex-1 h-[80px] border flex items-center justify-center ${
                paymentMethod === method
                  ? "border-black bg-gray-100"
                  : "border-gray-300"
              }`}
            >
              {method === "razorpay" ? "Razorpay" : "Cash on Delivery"}
            </button>
          ))}
        </div>

        {errors.paymentMethod && (
          <p className="text-xs text-red-500">{errors.paymentMethod}</p>
        )}
      </div>

      {/* RIGHT */}
      <div className="border p-6 rounded">
        <h2 className="text-lg mb-4">Order Summary</h2>
        <p>Subtotal: {currency}{getCartTotal()}</p>
        <p>Delivery: {currency}{delivery_fee}</p>
        <hr className="my-3" />
        <p className="font-semibold">
          Total: {currency}{getCartTotal() + delivery_fee}
        </p>

        <button
          onClick={handlePlaceOrder}
          className="w-full mt-6 py-3 bg-black text-white"
        >
          PLACE ORDER
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
