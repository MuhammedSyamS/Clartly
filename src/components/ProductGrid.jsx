import { Heart, Star, Eye } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductGrid({ products = [], onSelect }) {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((p) => {
          const isWishlisted = wishlist.some(w => w._id === p._id);
          const imageUrl = typeof p.image === "string" ? p.image : p.image?.url || "/placeholder.png";

          return (
            <div key={p._id} className="group relative bg-white rounded-3xl overflow-hidden border shadow-sm hover:shadow-lg transition">
              <div onClick={() => onSelect?.(p)} className="relative h-52 bg-gray-100 cursor-pointer">
                <img src={imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition" />
              </div>

              <button onClick={() => toggleWishlist(p)} className="absolute top-4 right-4 p-2 bg-white rounded-full shadow">
                <Heart size={18} className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"} />
              </button>

              <div className="p-5 space-y-3">
                <h4 className="font-semibold text-gray-800 line-clamp-1">{p.name}</h4>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className={i < Math.round(p.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
                  ))}
                </div>
                <p className="text-sm text-gray-500 line-clamp-2">{p.description}</p>
                <div className="flex items-center justify-between pt-2">
                  <p className="text-lg font-bold text-indigo-600">₹{p.price}</p>
                  <button onClick={() => addToCart(p._id)} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
