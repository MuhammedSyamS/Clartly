import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { token } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  // Fetch Wishlist
  const fetchWishlist = async () => {
    if (!token) return setWishlist([]);
    try {
      const res = await fetch("https://verda-foregone-noncruciformly.ngrok-free.dev/api/wishlist", {
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

  // ------------------------------------------
  // YOUR EXISTING TOGGLE LOGIC (UNTOUCHED)
  // ------------------------------------------
  const toggleWishlist = async (product) => {
    if (!token) return alert("Login required to manage wishlist");
    try {
      const res = await fetch("https://verda-foregone-noncruciformly.ngrok-free.devapi/wishlist/toggle", {
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

  // ------------------------------------------
  // ✅ NEW: REMOVE FUNCTION (For Trash Button)
  // ------------------------------------------
  const removeFromWishlist = async (productId) => {
    if (!token) return;
    try {
      // 1. Optimistic Update (Remove from screen instantly)
      setWishlist((prev) => prev.filter((p) => p._id !== productId));

      // 2. Call Backend DELETE Endpoint
      const res = await fetch(`https://verda-foregone-noncruciformly.ngrok-free.dev/api/wishlist/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete");
      
      // 3. Sync with server
      const data = await res.json();
      if(data.wishlist) setWishlist(data.wishlist);

    } catch (err) {
      console.error("Delete wishlist error:", err);
      fetchWishlist(); // Revert on error
    }
  };

  return (
    <WishlistContext.Provider
      value={{ 
        wishlist, 
        toggleWishlist, 
        removeFromWishlist, // ✅ Exported here
        wishlistCount: wishlist.length 
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);