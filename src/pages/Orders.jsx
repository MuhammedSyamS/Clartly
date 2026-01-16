import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch("/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch orders");

        setOrders(data.orders || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-center py-20">Loading orders...</p>;

  if (orders.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-500 text-lg">No orders found</p>
        <Link
          to="/"
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Go Home
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center px-4 py-12 space-y-8">
      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white max-w-3xl w-full p-8 rounded-3xl shadow-lg"
        >
          <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />

          <h1 className="text-3xl font-bold text-center mb-2">
            Order Placed Successfully 🎉
          </h1>

          <p className="text-center text-gray-500 mb-6">
            Order ID: {order._id} • {new Date(order.createdAt).toLocaleString()}
          </p>

          <div className="space-y-3">
            {order.items.map((item) => (
              <div
                key={item.product._id}
                className="flex justify-between border-b pb-2"
              >
                <span>
                  {item.product.name} × {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between font-bold text-lg mt-4">
            <span>Total</span>
            <span>₹{order.totalAmount}</span>
          </div>

          <Link
            to="/"
            className="block mt-6 text-center bg-indigo-600 text-white py-3 rounded-lg font-semibold"
          >
            Continue Shopping
          </Link>
        </div>
      ))}
    </div>
  );
}
