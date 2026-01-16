import { useState, useRef, useEffect } from "react";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";
import CategoryBar from "../components/CategoryBar";
import ProductDetails from "./ProductDetails";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function HomePage({ wishlist, toggleWishlist }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]); // fetched from backend
  const [user, setUser] = useState(null);
  const productRef = useRef(null);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  // ✅ Check login state
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  // ✅ Fetch products from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => console.error("Fetch products error:", err));
  }, []);

  // Filter products by category
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  if (!user) return null; // optional: show loader while checking login

  return (
    <>
      {/* Hero Section */}
      <Hero productRef={productRef} />

      {/* Page Content */}
      <div
        ref={productRef}
        className="bg-slate-50 min-h-screen px-4 sm:px-6 lg:px-8 py-8"
      >
        <CategoryBar active={activeCategory} setActive={setActiveCategory} />

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
