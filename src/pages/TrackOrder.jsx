import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function TrackOrder() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { token, loading } = useAuth();

  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (loading) return;

    if (!token) {
      setError("Please login to track your order.");
      setFetching(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const res = await axios.get(`/api/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrder(res.data);
      } catch (err) {
        console.error("Track order error:", err);

        if (err.response?.status === 404) {
          setError("Order not found.");
        } else if (err.response?.status === 401) {
          setError("Session expired. Please login again.");
        } else {
          setError("Failed to fetch order details.");
        }
      } finally {
        setFetching(false);
      }
    };

    fetchOrder();
  }, [orderId, token, loading]);

  if (loading || fetching)
    return <p className="text-center mt-20">Loading order…</p>;

  if (error)
    return (
      <div className="text-center mt-20">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => navigate("/my-orders")}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Go to My Orders
        </button>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">
        Order Status:{" "}
        <span className="text-indigo-600">{order.status}</span>
      </h2>

      <div className="mb-4">
        <p>
          <b>Order ID:</b> {order._id}
        </p>
        <p>
          <b>Total Amount:</b> ₹{order.totalAmount}
        </p>
        <p>
          <b>Payment Method:</b> {order.paymentMethod.toUpperCase()}
        </p>
        <p>
          <b>Payment Status:</b> {order.paymentStatus}
        </p>
      </div>

      <h3 className="text-xl font-semibold mb-3">Items</h3>
      <div className="space-y-3">
        {order.items.map((item, i) => (
          <div
            key={i}
            className="flex gap-4 items-center border rounded-lg p-3 bg-gray-50"
          >
            <img
              src={item.image || "/placeholder.png"}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-600">
                Qty: {item.quantity}
              </p>
              <p className="font-medium">₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
