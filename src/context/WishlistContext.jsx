import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { token } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    if (!token) return setWishlist([]);
    try {
      const res = await fetch("http://localhost:5000/api/wishlist", {
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

  const toggleWishlist = async (product) => {
    if (!token) return alert("Login required to manage wishlist");
    try {
      const res = await fetch("http://localhost:5000/api/wishlist/toggle", {
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

      setWishlist((prev) => {
        const exists = prev.some(p => p._id === product._id);
        return exists ? prev.filter(p => p._id !== product._id) : [...prev, product];
      });
    } catch (err) {
      console.error("Toggle wishlist error:", err);
      alert(err.message || "Wishlist action failed");
    }
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, wishlistCount: wishlist.length }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
