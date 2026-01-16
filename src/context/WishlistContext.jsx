import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const getToken = () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;
    try {
      return JSON.parse(storedUser).token;
    } catch {
      return null;
    }
  };

  // Fetch wishlist from backend
  const fetchWishlist = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch("http://localhost:5000/api/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setWishlist(data.wishlist || []); // full product objects
    } catch (err) {
      console.error("Fetch wishlist error:", err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // Toggle wishlist on backend and update local state
  const toggleWishlist = async (product) => {
    const token = getToken();
    if (!token) {
      alert("Login required to manage wishlist");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/wishlist/toggle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product._id }),
      });
      const data = await res.json();

      // Update wishlist in context using full product objects
      const exists = wishlist.some((p) => p._id === product._id);
      setWishlist((prev) =>
        exists ? prev.filter((p) => p._id !== product._id) : [...prev, product]
      );
    } catch (err) {
      console.error("Toggle wishlist error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        wishlistCount: wishlist.length,
        loading,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
