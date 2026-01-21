import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();
const API_URL = "http://localhost:5000";

export const CartProvider = ({ children }) => {
  const { token } = useAuth();
  const [cart, setCart] = useState([]);

  // =====================
  // FETCH CART
  // =====================
  const fetchCart = async () => {
    if (!token) {
      setCart([]);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
    fetchCart();
  }, [token]);

  // =====================
  // ADD TO CART
  // =====================
  const addToCart = async (productId) => {
    if (!token) {
      alert("Login required");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Add to cart failed");

      fetchCart();
    } catch (err) {
      console.error("Add to cart error:", err);
      alert(err.message);
    }
  };

  // =====================
  // REMOVE FROM CART
  // =====================
  const removeFromCart = async (productId) => {
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/api/cart/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Remove failed");

      fetchCart();
    } catch (err) {
      console.error("Remove cart error:", err);
    }
  };

  // =====================
  // CLEAR CART
  // =====================
  const clearCart = async () => {
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/api/cart/clear`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Clear cart failed");
      setCart([]);
    } catch (err) {
      console.error("Clear cart error:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        fetchCart,
        cartCount: cart.reduce((sum, i) => sum + i.quantity, 0),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
