import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token } = useAuth();
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    if (!token) return setCart([]);
    try {
      const res = await fetch("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
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
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Add to cart failed");
      }
      await fetchCart();
    } catch (err) {
      console.error("Add to cart error:", err);
      alert(err.message || "Add to cart failed");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        cartCount: cart.reduce((total, item) => total + item.quantity, 0),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
