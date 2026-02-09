import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // 🔍 DEBUGGING: Check your console (F12) to see exactly what data we have!
  useEffect(() => {
    console.log("🛒 CHECKOUT CART DATA:", cart);
  }, [cart]);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  // Calculate Total (Safe Version)
  const total = cart.reduce((sum, item) => {
    const product = item.productId || item; // Fallback if structure is flat
    const price = Number(product.price) || 0;
    return sum + (price * item.quantity);
  }, 0);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Your cart is empty!");
    
    if (!formData.name || !formData.email || !formData.address || !formData.zip) {
      return alert("Please fill in all shipping details.");
    }

    navigate("/payment", { state: { shippingAddress: formData } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-10 text-gray-900">Checkout</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT: Shipping Form */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Shipping Details</h2>

            <form id="checkout-form" onSubmit={handleProceedToPayment} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                ["name", "Full Name"],
                ["email", "Email"],
                ["address", "Street Address"],
                ["city", "City"],
                ["state", "State"],
                ["zip", "ZIP Code"],
                ["country", "Country"],
              ].map(([name, placeholder]) => (
                <div key={name} className={name === "address" ? "sm:col-span-2" : ""}>
                  <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                    {placeholder}
                  </label>
                  <input
                    type={name === "email" ? "email" : "text"}
                    name={name}
                    placeholder={placeholder}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                    required
                  />
                </div>
              ))}
            </form>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="w-full lg:w-[450px]">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6 text-gray-800">Order Summary</h2>

              {/* Product List */}
              <div className="flex-1 space-y-5 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                {cart.map((item) => {
                  
                  // ✅ SMART EXTRACTION LOGIC
                  // If item.productId exists (Populated), use it. 
                  // If NOT, try using 'item' itself (Flat structure).
                  // If NOT, ensure we don't crash by using an empty object {}.
                  const product = item.productId && typeof item.productId === 'object' 
                                  ? item.productId 
                                  : item;

                  // ✅ SAFE FALLBACKS
                  const image = product.image || "https://placehold.co/100?text=No+Image";
                  const name = product.name || "Unknown Product";
                  const price = Number(product.price) || 0;
                  const qty = Number(item.quantity) || 1;
                  const lineTotal = price * qty;

                  return (
                    <div key={item._id || Math.random()} className="flex gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      
                      {/* 1. Image */}
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                        <img
                          src={image}
                          alt={name}
                          className="w-full h-full object-cover"
                          onError={(e) => e.target.src = "https://placehold.co/100?text=Error"} // Fallback on broken link
                        />
                      </div>

                      {/* 2. Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <p className="font-semibold text-gray-800 text-sm truncate">
                          {name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          ₹{price} × {qty}
                        </p>
                      </div>

                      {/* 3. Price */}
                      <div className="flex items-center font-bold text-gray-900 text-sm">
                        ₹{lineTotal}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Totals Section */}
              <div className="border-t border-gray-200 mt-6 pt-4 space-y-2">
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-dashed mt-2">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                className="mt-8 w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg hover:shadow-xl"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}