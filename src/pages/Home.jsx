import { useState, useRef } from "react";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import CategoryBar from "../components/CategoryBar";
import ProductDetails from "./ProductDetails";
import { products } from "../components/Products";
import { useCart } from "../context/CartContext";

export default function HomePage({ wishlist, toggleWishlist }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const productRef = useRef(null);

  const { addToCart } = useCart();

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* ✅ FULL-WIDTH HERO (NO PADDING, NO BG) */}
      <Hero productRef={productRef} />

      {/* ✅ NORMAL PAGE CONTENT */}
      <div
        ref={productRef}
        className="bg-slate-50 min-h-screen px-4 sm:px-6 lg:px-8 py-8"
      >
        <CategoryBar
          active={activeCategory}
          setActive={setActiveCategory}
        />

        <ProductGrid
          products={filteredProducts}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
          addToCart={addToCart}
          onSelect={setSelectedProduct}
        />
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 overflow-auto flex justify-center items-start pt-20">
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
    </>
  );
}
