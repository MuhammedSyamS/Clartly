import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../utils/axios";
import { useState } from "react";

export default function Payment() {
  const { cart, fetchCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [loadingCOD, setLoadingCOD] = useState(false);
  const [loadingOnline, setLoadingOnline] = useState(false);

  const shippingAddress = location.state?.shippingAddress;
  if (!shippingAddress) {
    navigate("/checkout");
    return null;
  }

  // Total amount
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCOD = async () => {
    try {
      setLoadingCOD(true);
      const cartItems = cart.map(item => ({
        productId: item.id || item._id || item.productId,
        quantity: item.quantity
      }));

      const res = await api.post(
        "/payment/cod",
        {
          shippingAddress,
          paymentMethod: "COD",
          cartItems
        },
        { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` } }
      );
      setLoadingCOD(false);

      if (res.data.success) {
        alert("COD order placed successfully!");
        await fetchCart();
        navigate("/orders");
      }
    } catch (err) {
      setLoadingCOD(false);
      console.error("COD Error:", err);
      alert("COD failed");
    }
  };

  const handleOnline = async () => {
    try {
      setLoadingOnline(true);
      const { data: razorpayData } = await api.post(
        "/payment/razorpay",
        { shippingAddress },
        { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` } }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayData.amount,
        currency: "INR",
        order_id: razorpayData.id,
        name: "Cartly Shop",
        description: "Order Payment",
        handler: async (response) => {
          try {
            const verifyRes = await api.post(
              "/payment/razorpay/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` } }
            );

            if (verifyRes.data.success) {
              alert("Payment successful!");
              await fetchCart();
              navigate("/orders");
            } else {
              alert("Payment verification failed");
            }
          } catch (err) {
            console.error("Payment verify error:", err);
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: shippingAddress.name || "",
          email: shippingAddress.email || "",
          contact: shippingAddress.phone || "",
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      setLoadingOnline(false);
    } catch (err) {
      setLoadingOnline(false);
      console.error("Razorpay Error:", err);
      alert("Online payment failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Checkout - Payment</h2>

      <div style={styles.card}>
        <h3>Shipping Address</h3>
        <p>{shippingAddress.name}</p>
        <p>{shippingAddress.address}</p>
        <p>
          {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pinCode}
        </p>
        <p>{shippingAddress.phone}</p>
      </div>

      <div style={styles.card}>
        <h3>Cart Items</h3>
        {cart.map((item) => (
          <div key={item._id} style={styles.cartItem}>
            <span>{item.name} x {item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
        <hr />
        <div style={styles.cartTotal}>
          <strong>Total:</strong>
          <strong>₹{totalAmount}</strong>
        </div>
      </div>

      <div style={styles.card}>
        <h3>Select Payment Method</h3>
        <button style={styles.button} onClick={handleCOD} disabled={loadingCOD}>
          {loadingCOD ? "Processing..." : "Cash on Delivery"}
        </button>
        <button
          style={{ ...styles.button, backgroundColor: "#3399cc" }}
          onClick={handleOnline}
          disabled={loadingOnline}
        >
          {loadingOnline ? "Processing..." : "Pay Online"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: 700, margin: "40px auto", padding: 20, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
  heading: { textAlign: "center", marginBottom: 30 },
  card: { backgroundColor: "#f8f8f8", padding: 20, borderRadius: 10, marginBottom: 20, boxShadow: "0px 2px 10px rgba(0,0,0,0.1)" },
  cartItem: { display: "flex", justifyContent: "space-between", marginBottom: 8 },
  cartTotal: { display: "flex", justifyContent: "space-between", fontSize: 16, marginTop: 10 },
  button: { width: "100%", padding: "12px 0", margin: "10px 0", border: "none", borderRadius: 8, backgroundColor: "#27ae60", color: "#fff", fontSize: 16, cursor: "pointer" },
};
