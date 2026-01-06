import { useState, useRef } from "react";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import CategoryBar from "../components/CategoryBar";
import ProductDetails from "./ProductDetails";
import { products } from "../components/Products";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [wishlist, setWishlist] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
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
          onSelect={setSelectedProduct} // <-- NEW: pass click handler
        />
      </div>

      {/* ProductDetails Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-start pt-20 z-50 overflow-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full p-6 relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-2xl font-bold"
            >
              ×
            </button>
            <ProductDetails
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
