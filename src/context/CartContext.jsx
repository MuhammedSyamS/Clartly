import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // -------------------------------
  // Get token safely
  // -------------------------------
  const getToken = () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;
    try {
      return JSON.parse(storedUser).token;
    } catch {
      return null;
    }
  };

  // -------------------------------
  // Fetch cart from backend
  // -------------------------------
  const fetchCart = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch("http://localhost:5000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch cart");

      const data = await res.json();
      setCart(data.items || []);
    } catch (err) {
      console.error("Fetch cart error:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // -------------------------------
  // Add to cart
  // -------------------------------
  const addToCart = async (productId) => {
    const token = getToken();
    if (!token) {
      alert("You must be logged in to add to cart");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (!res.ok) throw new Error("Add to cart failed");

      await fetchCart(); // refresh cart
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
