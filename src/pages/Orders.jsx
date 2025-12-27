import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../config";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchUserOrders = async () => {
    try {
      const token = localStorage.getItem("userToken");

      const res = await axios.get(
        `${backendUrl}/api/order/user`,
        { headers: { token } }
      );

      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (error) {
      console.log("Failed to load user orders");
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-2xl font-light mb-10">My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border p-5 rounded bg-white"
            >
              <div className="flex justify-between mb-2">
                <p className="font-medium">
                  Order #{order._id.slice(-6)}
                </p>
                <span className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </span>
              </div>

              <p className="text-sm">
                <strong>Total:</strong> ₹{order.amount}
              </p>

              <p className="text-sm">
                <strong>Status:</strong>{" "}
                <span className="font-medium">
                  {order.orderStatus}
                </span>
              </p>

              <p className="text-sm">
                <strong>Payment:</strong>{" "}
                {order.paymentMethod} ({order.paymentStatus})
              </p>

              <div className="mt-3">
                <p className="font-medium mb-1">Items:</p>
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-sm mb-1"
                  >
                    <img
                      src={item.image}
                      className="w-10 h-10 object-cover"
                      alt=""
                    />
                    <span>{item.name}</span>
                    <span>x{item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
