import { useCart } from "../context/CartContext";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, removeFromCart, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    card: "",
  });

  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleCheckout = async () => {
    if (cart.length === 0) return alert("Your cart is empty!");
    if (!formData.name || !formData.email || !formData.address)
      return alert("Please fill all required details");

    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("You must be logged in to place an order!");

      // Backend expects cart in DB; we just send optional info
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ customer: formData }),
      });

      // ✅ Always check for empty responses
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to place order");
      }

      const data = await res.json();

      // Clear cart locally
      clearCart();

      // Navigate to Orders page with newly created order
      navigate("/orders", { state: { order: data.order } });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-slate-800 mb-10">Checkout</h1>

      {cart.length === 0 ? (
        <p className="text-center text-slate-500 text-lg">
          Your cart is empty.
        </p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Billing Form */}
          <div className="flex-1 bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Billing & Shipping</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                ["name", "Full Name"],
                ["email", "Email"],
                ["address", "Address"],
                ["city", "City"],
                ["state", "State"],
                ["zip", "ZIP Code"],
                ["country", "Country"],
                ["card", "Card Number"],
              ].map(([name, placeholder]) => (
                <input
                  key={name}
                  type="text"
                  name={name}
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-indigo-500"
                />
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96 bg-white rounded-2xl shadow-md p-6 flex flex-col">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            <div className="flex-1 space-y-4 overflow-y-auto max-h-[400px]">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between border-b pb-2">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold">₹{item.price * item.quantity}</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between font-bold text-lg mt-4">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
