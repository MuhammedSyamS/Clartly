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

  // -----------------------------
  // Redirect if not logged in or no shipping address
  // -----------------------------
  useEffect(() => {
    if (!token) return navigate("/login");
    if (!shippingAddress) return navigate("/checkout");
  }, [token, shippingAddress, navigate]);

  if (!shippingAddress || !token) return null;

  // -----------------------------
  // Prepare cart items safely
  // -----------------------------
  const cartItemsToSend = cart.map((i) => ({
    productId: i._id || i.id,
    quantity: Number(i.quantity) || 1,
    price: Number(i.price) || 0,
  }));

  const totalAmount = cartItemsToSend.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // -----------------------------
  // Load Razorpay SDK
  // -----------------------------
  const loadRazorpay = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  // -----------------------------
  // Place Order (COD / Razorpay)
  // -----------------------------
  const placeOrder = async (paymentMethod, paymentDetails = {}) => {
    if (!cartItemsToSend.length) return alert("Cart is empty");

    try {
      setLoading(true);

      const res = await fetch("/api/orders/place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          shippingAddress,
          paymentMethod,
          paymentDetails,
          cartItems: cartItemsToSend,
        }),
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Non-JSON response:", text);
        throw new Error("Server returned invalid response");
      }

      if (!res.ok) {
        throw new Error(data.message || "Order failed");
      }

      // Refresh cart
      await fetchCart();

      // Navigate to success page
      navigate("/order-success", { state: { order: data.order } });
    } catch (err) {
      console.error("Place order error:", err);
      alert(err.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Handle Pay Button Click
  // -----------------------------
  const handlePay = async () => {
    if (!cartItemsToSend.length) return alert("Cart is empty");

    setLoading(true);

    if (method === "cod") {
      await placeOrder("cod");
      setLoading(false);
      return;
    }

    // Online Payment (Razorpay)
    const loaded = await loadRazorpay();
    if (!loaded || !window.Razorpay) {
      setLoading(false);
      return alert("Razorpay SDK failed to load");
    }

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY || "rzp_test_S6PVlt2JlDWEtz",
      amount: Math.round(totalAmount * 100), // convert to paise
      currency: "INR",
      name: "Cartly",
      description: "Order Payment",
      handler: (response) => placeOrder("razorpay", response),
      theme: { color: "#6366f1" },
    };

    new window.Razorpay(options).open();
  };

  // -----------------------------
  // Render Payment UI
  // -----------------------------
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4 shadow-lg">
        <h2 className="text-xl font-bold">Payment</h2>

        <div
          onClick={() => setMethod("cod")}
          className={`border p-4 rounded cursor-pointer ${
            method === "cod" ? "border-indigo-600" : ""
          }`}
        >
          <b>Cash on Delivery</b>
          <p className="text-sm text-gray-500">Pay after delivery</p>
        </div>

        <div
          onClick={() => setMethod("online")}
          className={`border p-4 rounded cursor-pointer ${
            method === "online" ? "border-indigo-600" : ""
          }`}
        >
          <b>Pay Online</b>
          <p className="text-sm text-gray-500">Razorpay (UPI / Card)</p>
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

        <p className="text-gray-500 text-sm">
          Total Amount: ₹{totalAmount.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
