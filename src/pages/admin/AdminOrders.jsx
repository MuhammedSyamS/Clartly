import { useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Orders Management</h2>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
        <p className="text-gray-500 text-lg">Order management interface coming soon.</p>
        <p className="text-sm text-gray-400 mt-2">Connect to backend /api/orders to see data.</p>
      </div>
    </div>
  );
}