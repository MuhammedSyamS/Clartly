import { CheckCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Orders() {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-500 text-lg">No order found</p>
        <Link
          to="/"
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="bg-white max-w-3xl w-full p-8 rounded-3xl shadow-lg">
        <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-center mb-2">
          Order Placed Successfully
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Order ID: {order.id} • {order.date}
        </p>

        <div className="space-y-3">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between border-b pb-2"
            >
              <span>{item.name}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between font-bold text-lg mt-4">
          <span>Total</span>
          <span>₹{order.total}</span>
        </div>

        <Link
          to="/"
          className="block mt-6 text-center bg-indigo-600 text-white py-3 rounded-lg font-semibold"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
