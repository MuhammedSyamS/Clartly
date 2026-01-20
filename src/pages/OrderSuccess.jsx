import { Link, useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Package, Home } from "lucide-react";
import { useEffect } from "react";

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 1. Get real data passed from Payment Page (or use defaults for testing)
  const orderData = location.state?.order || {};
  const orderId = orderData._id || "ORD-" + Math.floor(Math.random() * 10000);
  
  // Calculate delivery date (e.g., 5 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);
  const formattedDate = deliveryDate.toLocaleDateString("en-US", { 
    month: "short", day: "numeric", year: "numeric" 
  });

  // 2. Safety Redirect: If accessed directly without state (optional)
  useEffect(() => {
    if (!location.state) {
      // You can uncomment the line below to force redirect if they didn't pay
      // navigate("/"); 
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-gray-100 animate-in fade-in zoom-in duration-500">
        
        {/* Animated Success Icon */}
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600 animate-bounce" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-500 mb-8">
          Thank you for your purchase. Your order <span className="font-bold text-indigo-600">#{orderId.slice(-8).toUpperCase()}</span> has been placed.
        </p>

        {/* Order Details Box */}
        <div className="bg-gray-50 rounded-xl p-5 mb-8 text-left border border-gray-200 shadow-sm">
          <div className="flex justify-between mb-3 border-b border-gray-200 pb-2">
            <span className="text-gray-500 text-sm">Estimated Delivery</span>
            <span className="font-semibold text-gray-900 text-sm">{formattedDate}</span>
          </div>
          <div className="flex justify-between items-center">
             <span className="text-gray-500 text-sm">Amount Paid</span>
             <span className="font-bold text-green-600 text-lg">
                {orderData.totalAmount ? `₹${orderData.totalAmount}` : "Paid"}
             </span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link 
            to="/orders" 
            className="block-w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg flex items-center justify-center gap-2"
          >
            <Package size={20} /> Track My Order
          </Link>
          
          <Link 
            to="/" 
            className="block-w-full bg-white text-gray-700 border border-gray-300 py-3.5 rounded-xl font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2"
          >
            <Home size={20} /> Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  );
}