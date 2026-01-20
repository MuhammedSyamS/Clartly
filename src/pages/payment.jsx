import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, fetchCart } = useCart();
  const { token } = useAuth();

  const shippingAddress = location.state?.shippingAddress;

  const [method, setMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) navigate("/login");
    if (!shippingAddress) navigate("/checkout");
  }, [token, shippingAddress, navigate]);

  if (!shippingAddress || !token) return null;

  const totalAmount = cart.reduce(
    (sum, item) =>
      sum +
      (item.productId?.price || 0) * (item.quantity || 1),
    0
  );

  // =============================
  // LOAD RAZORPAY
  // =============================
  const loadRazorpay = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  // =============================
  // PLACE ORDER (COMMON)
  // =============================
  const placeOrder = async (paymentMethod, paymentDetails = {}) => {
    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/api/order/place",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            shippingAddress,
            paymentMethod,
            paymentDetails,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Order failed");
      }

      await fetchCart();
      navigate("/order-success", { state: { order: data.order } });
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // =============================
  // HANDLE PAY
  // =============================
  const handlePay = async () => {
    if (method === "cod") {
      placeOrder("cod");
      return;
    }

    const loaded = await loadRazorpay();
    if (!loaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    // ⚠️ TEMP CLIENT SIDE PAYMENT (TEST)
    const options = {
      key: "rzp_test_xxxxxxxx", // 🔴 REPLACE WITH YOUR TEST KEY
      amount: totalAmount * 100,
      currency: "INR",
      name: "Cartly",
      description: "Order Payment",
      handler: function (response) {
        placeOrder("razorpay", response);
      },
      theme: { color: "#6366f1" },
    };

    new window.Razorpay(options).open();
  };

  // =============================
  // UI
  // =============================
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold">Payment</h2>

        {/* COD */}
        <div
          onClick={() => setMethod("cod")}
          className={`border p-4 rounded cursor-pointer ${
            method === "cod" ? "border-indigo-600" : ""
          }`}
        >
          <b>Cash on Delivery</b>
          <p className="text-sm text-gray-500">
            Pay after delivery
          </p>
        </div>

        {/* ONLINE */}
        <div
          onClick={() => setMethod("online")}
          className={`border p-4 rounded cursor-pointer ${
            method === "online" ? "border-indigo-600" : ""
          }`}
        >
          <b>Pay Online</b>
          <p className="text-sm text-gray-500">
            Razorpay (UPI / Card)
          </p>
        </div>

        <button
          disabled={loading}
          onClick={handlePay}
          className="w-full bg-indigo-600 text-white py-3 rounded font-bold"
        >
          {loading
            ? "Processing..."
            : method === "cod"
            ? "Place Order"
            : "Pay Now"}
        </button>
      </div>
    </div>
  );
}
