import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";
import { X, ShoppingCart } from "lucide-react";

export default function ProductDetailsModal({ product, onClose }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  // UI States
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([{ rating: 4, text: "Great quality!" }]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  if (!product) return null;

  // Logic: Add to cart and go to cart page
  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    onClose(); // Close the popup
    navigate("/cart"); // Go to Cart Page
  };

  const submitReview = () => {
    if (!rating || !reviewText.trim()) return;
    setReviews([...reviews, { rating, text: reviewText }]);
    setRating(0);
    setReviewText("");
  };

  return (
    // 1. Black Transparent Background
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      
      {/* 2. White Modal Box */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-300">
        
        {/* Close Button (X) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-red-100 hover:text-red-600 transition z-10"
        >
          <X size={24} />
        </button>

        <div className="p-8 grid md:grid-cols-2 gap-8">
          
          {/* Image */}
          <div className="flex justify-center items-start bg-gray-50 rounded-xl p-4">
            <img
              src={product.image || "https://placehold.co/400"}
              alt={product.name}
              className="w-full object-contain max-h-[350px]"
            />
          </div>

          {/* Info & Actions */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>
              <p className="text-2xl font-bold text-indigo-600 mt-2">₹{product.price}</p>
              <p className="text-gray-600 mt-4">{product.description}</p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="font-semibold">Quantity:</span>
              <div className="flex border rounded-lg">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1 hover:bg-gray-100">-</button>
                <span className="px-4 py-1">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1 hover:bg-gray-100">+</button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 flex justify-center gap-2 shadow-lg"
            >
              <ShoppingCart /> Add to Cart
            </button>

            {/* Reviews (Mini Version) */}
            <div className="border-t pt-4 mt-4">
              <h3 className="font-bold mb-2">Write a Review</h3>
              <div className="flex gap-1 mb-2">
                {[1,2,3,4,5].map(star => (
                   <button key={star} onMouseEnter={()=>setHoverRating(star)} onMouseLeave={()=>setHoverRating(0)} onClick={()=>setRating(star)} className={`text-xl ${ (hoverRating || rating) >= star ? "text-yellow-400" : "text-gray-300" }`}>★</button>
                ))}
              </div>
              <div className="flex gap-2">
                <input 
                  value={reviewText} 
                  onChange={(e)=>setReviewText(e.target.value)} 
                  placeholder="Review..." 
                  className="flex-1 border p-2 rounded" 
                />
                <button onClick={submitReview} className="bg-black text-white px-4 rounded">Post</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}