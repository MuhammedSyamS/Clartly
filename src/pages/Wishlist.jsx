import { useState } from "react"; 
import { Heart, Trash2, ShoppingCart, Eye } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext"; 

// ✅ IMPORT THE NEW POPUP
import ProductDetailsModal from "../components/ProductDetailsModal";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  
  // ✅ STATE: Keeps track of which product to show in the popup
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
        <Heart size={60} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700">Wishlist is Empty</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Wishlist</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => {
          if (!product || !product._id) return null;

          return (
            <div key={product._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
              
              <div className="relative h-48 bg-gray-50 group">
                <img
                  src={product.image || "https://placehold.co/400"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                <button
                  onClick={() => removeFromWishlist(product._id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow hover:bg-red-50 hover:text-red-600 transition z-10"
                >
                  <Trash2 size={18} />
                </button>

                {/* ✅ VIEW BUTTON: Opens the Popup */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  <button 
                    onClick={() => setSelectedProduct(product)} 
                    className="flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-full font-medium hover:bg-gray-100 cursor-pointer"
                  >
                    <Eye size={18} /> View
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-800 truncate">{product.name}</h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-bold text-indigo-600">₹{product.price}</span>
                  <button
                    onClick={() => addToCart(product._id)}
                    className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ✅ RENDER POPUP: If a product is selected, show it */}
      {selectedProduct && (
        <ProductDetailsModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

    </div>
  );
}