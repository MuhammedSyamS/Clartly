import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductGrid from "./components/ProductGrid";
import CategoryBar from "./components/CategoryBar";

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [wishlist, setWishlist] = useState([]);

  const products = [
    { id: 1, name: "Wireless Headphones", price: 2999, category: "Headphones" },
    { id: 2, name: "Smart Watch", price: 4999, category: "Watches" },
    { id: 3, name: "Gaming Mouse", price: 1999, category: "Gaming" },
    { id: 4, name: "Bluetooth Speaker", price: 2599, category: "Speakers" }
  ];

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  // ✅ Toggle wishlist logic
  const toggleWishlist = (product) => {
    setWishlist((prev) =>
      prev.some((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product]
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar wishlistCount={wishlist.length} />

      <CategoryBar
        active={activeCategory}
        setActive={setActiveCategory}
      />

      <ProductGrid
        products={filteredProducts}
        wishlist={wishlist}
        toggleWishlist={toggleWishlist}
      />

      <Footer />
    </div>
  );
}
