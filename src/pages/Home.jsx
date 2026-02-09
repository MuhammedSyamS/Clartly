import { useState, useRef, useEffect } from "react";
import Hero from "../components/Hero.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
import CategoryBar from "../components/CategoryBar.jsx";
import ProductDetails from "./ProductDetails.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const productRef = useRef(null);

  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  // ✅ Check login
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  // ✅ Fetch products
  useEffect(() => {
    fetch("http://localhost:5001/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(p => p.category === activeCategory);

  if (!user) return null;

  return (
    <>
      <Hero productRef={productRef} />

      <div ref={productRef} className="bg-slate-50 min-h-screen px-4 sm:px-6 lg:px-8 py-8">
        <CategoryBar active={activeCategory} setActive={setActiveCategory} />

        <ProductGrid
          products={filteredProducts}
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
