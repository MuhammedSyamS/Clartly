import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token } = useAuth(); // always get the latest token
  const [cart, setCart] = useState([]);

  // Fetch cart from backend
  const fetchCart = async () => {
    if (!token) return setCart([]); // clear cart if logged out
    try {
      const res = await fetch("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch cart");
      const data = await res.json();
      setCart(data.items || []);
    } catch (err) {
      console.error("Fetch cart error:", err);
      setCart([]);
    }
  };

  useEffect(() => {
    fetchCart(); // run whenever token changes (login/logout)
  }, [token]);

  // Add item to cart
  const addToCart = async (productId) => {
    if (!token) return alert("Login required to add to cart");

    try {
      const res = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Add to cart failed");

      await fetchCart(); // refresh cart after adding
    } catch (err) {
      console.error("Add to cart error:", err);
      alert(err.message || "Add to cart failed");
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    if (!token) return alert("Login required to remove from cart");

    try {
      const res = await fetch(`http://localhost:5000/api/cart/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Remove failed");

      await fetchCart(); // refresh cart after removing
    } catch (err) {
      console.error("Remove cart error:", err);
      alert(err.message || "Remove from cart failed");
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    if (!token) return alert("Login required to clear cart");

    try {
      const res = await fetch("http://localhost:5000/api/cart/clear", {
        method: "POST", // your backend route uses POST
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Clear cart failed");

      setCart([]); // clear local state
    } catch (err) {
      console.error("Clear cart error:", err);
      alert(err.message || "Failed to clear cart");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart, // ✅ added
        cartCount: cart.reduce((total, item) => total + item.quantity, 0),
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
