import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();
const API_URL = "http://localhost:5001/api";

export const WishlistProvider = ({ children }) => {
  const { token } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  // ----------------------------
  // FETCH WISHLIST
  // ----------------------------
  const fetchWishlist = async () => {
    if (!token) {
      setWishlist([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch wishlist");

      const data = await res.json();
      setWishlist(Array.isArray(data.wishlist) ? data.wishlist : []);
    } catch (err) {
      console.error("Fetch wishlist error:", err);
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [token]);

  // ----------------------------
  // TOGGLE WISHLIST
  // ----------------------------
  const toggleWishlist = async (product) => {
    if (!token) {
      alert("Login required to manage wishlist");
      return;
    }

    if (!product || !product._id) {
      console.error("Invalid product:", product);
      return;
    }

    try {
      console.log("Toggling wishlist for product:", product._id, "with token:", token.substring(0, 20) + "...");
      
      const res = await fetch(`${API_URL}/wishlist/toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product._id }),
      });

      console.log("Wishlist toggle response status:", res.status);
      const data = await res.json();
      console.log("Wishlist toggle response data:", data);

      if (!res.ok) {
        throw new Error(data.message || "Toggle wishlist failed");
      }

      setWishlist(Array.isArray(data.wishlist) ? data.wishlist : []);
    } catch (err) {
      console.error("Toggle wishlist error:", err);
      alert("Failed to update wishlist. Please try again.");
    }
  };

  // ----------------------------
  // REMOVE FROM WISHLIST
  // ----------------------------
  const removeFromWishlist = async (productId) => {
    if (!token) return;

    if (!productId) {
      console.error("Invalid product ID:", productId);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/wishlist/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to remove wishlist item");

      const data = await res.json();
      setWishlist(Array.isArray(data.wishlist) ? data.wishlist : []);
    } catch (err) {
      console.error("Remove wishlist error:", err);
      alert("Failed to remove from wishlist");
      await fetchWishlist(); // Revert on error
    }
  };

  // Check if product is in wishlist
  const isWishlisted = (productId) => {
    return wishlist.some(item => item._id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        wishlistCount: wishlist.length,
        toggleWishlist,
        removeFromWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
};
