import { useState, useEffect } from "react";
import { Eye, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    fetchOrders();
  }, [token]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/orders", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        console.error("API Error:", data);
        setOrders([]);
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewOrder = async (order) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/orders/${order._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setSelectedOrder(data);
      setNewStatus(data.status);
      setShowModal(true);
    } catch (err) {
      console.error("Failed to fetch order details:", err);
    }
  };

  const handleUpdateStatus = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/orders/${selectedOrder._id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ status: newStatus })
        }
      );

      if (response.ok) {
        const updatedOrder = await response.json();
        setOrders(orders.map(o => o._id === updatedOrder._id ? updatedOrder : o));
        setShowModal(false);
        alert("Order status updated!");
      } else {
        alert("Failed to update order");
      }
    } catch (err) {
      console.error("Error updating order:", err);
      alert("Error updating order");
    }
  };

  const statusOptions = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-50 text-yellow-700";
      case "Processing":
        return "bg-blue-50 text-blue-700";
      case "Shipped":
        return "bg-purple-50 text-purple-700";
      case "Delivered":
        return "bg-green-50 text-green-700";
      case "Cancelled":
        return "bg-red-50 text-red-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  if (loading) return <div className="text-center py-10">Loading orders...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Orders</h2>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase font-bold">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-mono text-sm">{order._id.slice(-8)}</td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium">{order.user?.name || "N/A"}</p>
                    <p className="text-gray-500 text-sm">{order.user?.email || "N/A"}</p>
                  </div>
                </td>
                <td className="px-6 py-4 font-bold">₹{order.totalAmount}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleViewOrder(order)}
                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition inline-flex items-center gap-1"
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
              <h3 className="text-xl font-bold">Order Details</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm">Order ID</p>
                  <p className="font-mono font-bold">{selectedOrder._id}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Date</p>
                  <p className="font-bold">{new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Customer Info */}
              <div className="border-t pt-4">
                <p className="font-bold text-gray-800 mb-2">Customer Details</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Name</p>
                    <p className="font-bold">{selectedOrder.user?.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Email</p>
                    <p className="font-bold">{selectedOrder.user?.email}</p>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="border-t pt-4">
                <p className="font-bold text-gray-800 mb-2">Order Items</p>
                <div className="space-y-2">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="border-t pt-4 flex justify-between">
                <p className="font-bold">Total Amount:</p>
                <p className="text-2xl font-bold text-indigo-600">₹{selectedOrder.totalAmount}</p>
              </div>

              {/* Status Update */}
              <div className="border-t pt-4">
                <p className="font-bold text-gray-800 mb-2">Update Status</p>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleUpdateStatus}
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-bold hover:bg-indigo-700"
                >
                  Update Status
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-bold hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
