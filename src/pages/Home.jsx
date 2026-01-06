import { useState, useRef } from "react";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import CategoryBar from "../components/CategoryBar";
import { products } from "../components/Products";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [wishlist, setWishlist] = useState([]);
  const productRef = useRef(null);

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const toggleWishlist = (product) => {
    setWishlist((prev) =>
      prev.some((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product]
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen p-4">
      <Hero productRef={productRef} />

      <div ref={productRef}>
        <CategoryBar active={activeCategory} setActive={setActiveCategory} />
        <ProductGrid
          products={filteredProducts}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
        />
      </div>
    </div>
  );
}
