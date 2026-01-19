import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { CreditCard, Banknote, Lock, ArrowRight, Loader2, MapPin, Smartphone, Globe } from "lucide-react";

export default function Payment() {
  const { cart, fetchCart } = useCart();
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const shippingAddress = location.state?.shippingAddress;

  // Default to 'razorpay' (covers UPI, Cards, Netbanking)
  const [method, setMethod] = useState("razorpay"); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!shippingAddress) navigate("/checkout");
  }, [shippingAddress, navigate]);

  if (!shippingAddress) return null;

  const totalAmount = cart.reduce((total, item) => {
    const product = item.productId || item;
    const price = Number(product.price) || 0;
    return total + (price * item.quantity);
  }, 0);

  // 1. DYNAMICALLY LOAD RAZORPAY SCRIPT
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // 2. MAIN PAYMENT HANDLER
  const handlePayment = async () => {
    setLoading(true);

    if (method === "cod") {
      // Direct API Call for COD
      await placeOrderInBackend("cod");
      return;
    }

    // --- RAZORPAY FLOW ---
    try {
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        alert("Razorpay SDK failed to load. Check your internet.");
        setLoading(false);
        return;
      }

      // A. Create Order on Backend (Returns Razorpay Order ID)
      // Make sure your backend has this route!
      const result = await fetch("http://localhost:5000/api/payment/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ amount: totalAmount }),
      });

      if (!result.ok) throw new Error("Server error: Could not create Razorpay order");
      const data = await result.json();

      // B. Open Razorpay Options
      const options = {
        key: "YOUR_RAZORPAY_KEY_ID", // ⚠️ REPLACE WITH YOUR TEST KEY ID
        amount: data.amount,
        currency: data.currency,
        name: "Cartly",
        description: "Payment for Order",
        order_id: data.id, // This comes from backend
        handler: async function (response) {
          // C. On Success: Save Order to Database
          await placeOrderInBackend("razorpay", response);
        },
        prefill: {
          name: shippingAddress.name,
          email: shippingAddress.email,
          contact: "9999999999", // You can add phone to shipping address to prefill here
        },
        theme: {
          color: "#4F46E5", // Indigo-600
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      setLoading(false); // Stop loader (modal is open)

    } catch (err) {
      console.error(err);
      alert("Payment initiation failed. Try again.");
      setLoading(false);
    }
  };

  // 3. SAVE ORDER TO DATABASE (Common for COD & Online)
  const placeOrderInBackend = async (paymentMethod, paymentDetails = {}) => {
    try {
      const orderPayload = {
        shippingAddress,
        paymentMethod,
        items: cart.map(item => ({
            productId: item.productId._id || item.productId,
            quantity: item.quantity,
            price: item.productId.price
        })),
        totalAmount,
        paymentDetails // Stores Razorpay payment_id and signature
      };

      const res = await fetch("http://localhost:5000/api/order/place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderPayload),
      });

      if (!res.ok) throw new Error("Order placement failed");
      
      const data = await res.json();
      await fetchCart(); // Clear Cart
      navigate("/order-success", { state: { order: data.order } });

    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
        
        {/* LEFT: Payment Methods */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Lock className="w-6 h-6 text-indigo-600" /> Payment Options
            </h2>

            {/* Option 1: Razorpay (Includes UPI, Card, Netbanking) */}
            <div 
              onClick={() => setMethod("razorpay")}
              className={`cursor-pointer border rounded-xl p-5 mb-4 transition-all ${
                method === "razorpay" 
                ? "border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600" 
                : "border-gray-200 hover:border-indigo-300"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full mt-1 ${method === "razorpay" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-500"}`}>
                  <Smartphone size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">Pay Online</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Accepts <strong>UPI (GPay, PhonePe, Paytm)</strong>, Credit/Debit Cards, Netbanking & Wallets.
                  </p>
                  
                  {/* Badges for Visual Trust */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {["UPI", "GPay", "PhonePe", "VISA", "MasterCard", "RuPay"].map(badge => (
                      <span key={badge} className="bg-white border border-gray-200 text-gray-600 text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Option 2: COD */}
            <div 
              onClick={() => setMethod("cod")}
              className={`cursor-pointer border rounded-xl p-5 transition-all ${
                method === "cod" 
                ? "border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600" 
                : "border-gray-200 hover:border-indigo-300"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${method === "cod" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-500"}`}>
                  <Banknote size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Cash on Delivery</h3>
                  <p className="text-sm text-gray-500">Pay cash upon delivery.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT: Confirmation Summary */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Confirm Order</h3>
            
            {/* Shipping Address Preview */}
            <div className="bg-gray-50 rounded-lg p-3 mb-4 text-sm text-gray-600 border border-gray-200">
               <div className="flex items-center gap-2 font-semibold text-gray-800 mb-1">
                 <MapPin size={16} className="text-indigo-600"/> Shipping to:
               </div>
               <p>{shippingAddress.name}</p>
               <p>{shippingAddress.address}</p>
               <p>{shippingAddress.city}, {shippingAddress.zip}</p>
            </div>

            <div className="space-y-3 text-sm text-gray-600 pb-4 border-b border-gray-100">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
            </div>

            <div className="flex justify-between items-center py-4 text-xl font-bold text-gray-900">
              <span>Total Pay</span>
              <span>₹{totalAmount}</span>
            </div>

            <button 
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-indigo-700 hover:shadow-xl transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> Processing...
                </>
              ) : (
                <>
                  {method === "cod" ? "Place COD Order" : "Proceed to Pay"} <ArrowRight size={20} />
                </>
              )}
            </button>
            
            <p className="text-xs text-center text-gray-400 mt-4 flex items-center justify-center gap-1">
              <Lock size={12} /> SSL Secure Payment via Razorpay
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}