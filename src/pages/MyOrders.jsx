import { useEffect, useState } from "react";
import axios from "axios";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/order", // Backend route
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setOrders(res.data);
      } catch (err) {
        console.error("Fetch orders error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;

  if (orders.length === 0) return <p>No orders found</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      {orders.map((order) => (
        <div
          key={order._id}
          className="border p-4 rounded-lg mb-6 bg-white shadow hover:shadow-lg transition cursor-pointer"
        >
          <p className="font-semibold mb-1">Order ID: {order._id}</p>
          <p className="text-sm text-gray-600 mb-2">
            Status: <span className="font-medium">{order.status}</span>
          </p>
          <p className="font-semibold mb-4">Total: ₹{order.totalAmount}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {order.items.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center border p-3 rounded-lg bg-gray-50"
              >
                <img
                  src={item.image || "/placeholder.png"}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded mb-2"
                />
                <p className="font-medium text-center">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity} × ₹{item.price}
                </p>
              </div>
            ))}
          </div>

          {/* Shipment / Dispatch Info */}
          <div className="mt-4 p-3 bg-indigo-50 rounded-lg text-indigo-700 text-sm">
            {/* Example info - you can dynamically populate these from backend */}
            <p>
              <span className="font-semibold">Shipment Status:</span>{" "}
              {order.status === "Pending"
                ? "Order confirmed, preparing for dispatch"
                : order.status}
            </p>
            <p>
              <span className="font-semibold">Courier Service:</span>{" "}
              {order.courier || "Will be updated soon"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
