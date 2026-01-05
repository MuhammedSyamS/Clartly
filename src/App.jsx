import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import CategoryBar from "./components/CategoryBar";
import { products } from "./components/Products"

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [wishlist, setWishlist] = useState([]);



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

     {/* 🔥 HERO SECTION */}
      <Hero />


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
