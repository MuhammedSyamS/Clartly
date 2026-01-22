import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useCart } from "./CartContext";

const WishlistContext = createContext();
const API_URL = "http://localhost:5000/api";

export const WishlistProvider = ({ children }) => {
  const { token } = useAuth();
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState([]);

  // ----------------------------
  // FETCH WISHLIST
  // ----------------------------
  const fetchWishlist = async () => {
    if (!token) return setWishlist([]);
    try {
      const res = await fetch(`${API_URL}/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch wishlist");

      const data = await res.json();
      setWishlist(data.wishlist || []);
    } catch (err) {
      console.error("Fetch wishlist error:", err);
      setWishlist([]);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [token]);

  // ----------------------------
  // TOGGLE WISHLIST
  // ----------------------------
  const toggleWishlist = async (product) => {
    if (!token) return alert("Login required to manage wishlist");

    try {
      const res = await fetch(`${API_URL}/wishlist/toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product._id }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Toggle wishlist failed");
      }

      const data = await res.json();
      setWishlist(data.wishlist || []);
    } catch (err) {
      console.error("Toggle wishlist error:", err);
      alert(err.message || "Wishlist action failed");
      fetchWishlist(); // revert on error
    }
  };

  // ----------------------------
  // REMOVE FROM WISHLIST
  // ----------------------------
  const removeFromWishlist = async (productId) => {
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/wishlist/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to remove wishlist item");

      const data = await res.json();
      setWishlist(data.wishlist || []);
    } catch (err) {
      console.error("Remove wishlist error:", err);
      fetchWishlist(); // revert on error
    }
  };

  // ----------------------------
  // MOVE ITEM TO CART
  // ----------------------------
  const moveToCart = async (product) => {
    try {
      await addToCart(product._id); // Add to cart
      await removeFromWishlist(product._id); // Remove from wishlist
    } catch (err) {
      console.error("Move to cart error:", err);
      alert("Failed to move item to cart");
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        toggleWishlist,
        removeFromWishlist,
        moveToCart,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
