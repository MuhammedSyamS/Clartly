import { useState } from "react";
import { Heart } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";
import { useNavigate } from "react-router-dom";

export default function ProductDetails({ product, onClose }) {
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([{ rating: 4, text: "Great quality!" }]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  if (!product) return null;

  const isWishlisted = wishlist.some(w => w._id === product._id);

  const submitReview = () => {
    if (!rating || !reviewText.trim()) return;
    setReviews([...reviews, { rating, text: reviewText }]);
    setRating(0);
    setReviewText("");
  };

  const handleAddToCart = () => {
    if (product.stock < 1) return alert("Product is out of stock!");
    addToCart(product._id, quantity);
    navigate("/cart");
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Image */}
      <div className="flex justify-center items-center relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full max-w-[400px] object-contain hover:scale-105 transition"
        />
        <button
          onClick={() => toggleWishlist(product)}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow hover:shadow-lg transition"
        >
          <Heart
            size={20}
            className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}
          />
        </button>
      </div>

      {/* Details */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-2xl font-bold text-indigo-600">₹{product.price}</p>

        <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
          {product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock'}
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-4">
          <span className="font-semibold">Quantity:</span>
          <div className="flex border rounded-lg overflow-hidden">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-1 hover:bg-slate-100"
            >
              −
            </button>
            <span className="px-4 py-1">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-1 hover:bg-slate-100"
            >
              +
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Add to Cart
          </button>

          <button
            onClick={onClose}
            className="flex-1 bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition"
          >
            Close
          </button>
        </div>

        {/* Reviews */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Customer Reviews</h2>
          {reviews.map((r, i) => (
            <div key={i} className="border rounded-lg p-2 mb-2">
              <div className="text-yellow-400">
                {"★".repeat(r.rating)}
                <span className="text-gray-300">
                  {"★".repeat(5 - r.rating)}
                </span>
              </div>
              <p className="text-gray-600">{r.text}</p>
            </div>
          ))}

          {/* Add review */}
          <div className="mt-2 border rounded-lg p-2">
            <div className="flex gap-1 mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className={`text-xl ${(hoverRating || rating) >= star ? "text-blue-500" : "text-gray-300"
                    }`}
                >
                  ★
                </button>
              ))}
            </div>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review..."
              className="w-full border rounded-lg p-2"
            />
            <button
              onClick={submitReview}
              className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded-lg"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
