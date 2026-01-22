import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function MyOrders() {
  const { token, loading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (loading) return;

    if (!token) {
      setError("Please login to view your orders");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await axios.get("/api/orders/my-orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Orders fetch error:", err);
        setError("Unable to load orders");
      }
    };

    fetchOrders();
  }, [token, loading]);

  if (loading) return <p className="text-center mt-20">Loading orders…</p>;
  if (error) return <p className="text-center mt-20 text-red-600">{error}</p>;
  if (orders.length === 0)
    return <p className="text-center mt-20">No orders yet.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="space-y-8">
        {orders.map(order => (
          <div
            key={order._id}
            className="bg-white border rounded-xl shadow-sm overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-5 bg-gray-50 border-b">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-semibold break-all">{order._id}</p>
              </div>
              <div className="text-right">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {order.status}
                </span>
                <p className="mt-2 font-bold text-lg">₹{order.totalAmount}</p>
              </div>
            </div>

            {/* Items */}
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {order.items.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 border rounded-lg p-4 bg-gray-50"
                >
                  <img
                    src={item.image || "/placeholder.png"}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md border"
                  />
                  <div className="flex flex-col justify-between">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                    <p className="font-medium">₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 bg-indigo-50 text-sm text-indigo-700">
              <p>
                <b>Payment:</b> {order.paymentMethod.toUpperCase()}
              </p>
              <p>
                <b>Payment Status:</b> {order.paymentStatus}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
