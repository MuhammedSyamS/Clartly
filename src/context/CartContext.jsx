import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();
const API_URL = "http://localhost:5001/api";

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
      const res = await fetch(`${API_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const text = await res.text(); // read raw response
      let data;
      try {
        data = JSON.parse(text); // try parsing JSON
      } catch {
        console.error("Fetch cart returned non-JSON:", text);
        throw new Error("Invalid response from server");
      }

      if (!res.ok) throw new Error(data.message || "Failed to fetch cart");

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
  const addToCart = async (productId, quantity = 1) => {
    if (!token) return alert("Login required");
    try {
      const res = await fetch(`${API_URL}/cart/add`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ productId, quantity }),
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Add to cart returned non-JSON:", text);
        throw new Error("Invalid response from server");
      }

      if (!res.ok) throw new Error(data.message || "Add to cart failed");

      fetchCart();
    } catch (err) {
      console.error("Add cart error:", err);
      alert(err.message || "Add to cart failed");
    }
  };

  // =====================
  // REMOVE FROM CART
  // =====================
  const removeFromCart = async (productId) => {
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/cart/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Remove cart returned non-JSON:", text);
        throw new Error("Invalid response from server");
      }

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
      const res = await fetch(`${API_URL}/cart/clear`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Clear cart returned non-JSON:", text);
        throw new Error("Clear cart failed");
      }

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
        cartCount: cart.reduce((sum, i) => sum + (i.quantity || 1), 0),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
