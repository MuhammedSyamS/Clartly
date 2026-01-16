import { Heart, Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext"; // ✅ use context

export default function WishlistPage() {
  const { addToCart } = useCart(); 
  const { wishlist, removeFromWishlist } = useWishlist(); // ✅ get wishlist from context

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 py-20 text-center">
        <Heart size={60} className="text-slate-300 mb-6" />
        <h2 className="text-2xl sm:text-3xl font-semibold text-slate-700">
          Your wishlist is empty
        </h2>
        <p className="mt-2 text-slate-500 text-sm sm:text-base">
          Save items you like — they’ll show up here.
        </p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-10">
        Wishlist
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {wishlist.map((p) => (
          <div
            key={p._id} // ✅ use _id
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg border border-slate-200 overflow-hidden transition hover:-translate-y-1"
          >
            {/* Product Image */}
            <div className="relative h-56 bg-slate-100">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover"
              />

              {/* Remove from wishlist */}
              <button
                onClick={() => removeFromWishlist(p._id)} // ✅ use _id
                className="absolute top-4 right-4 p-2 rounded-full bg-white shadow hover:scale-110 transition"
              >
                <Trash2 size={16} className="text-red-500" />
              </button>
            </div>

            {/* Product Info */}
            <div className="p-5 flex flex-col justify-between h-56">
              <div className="space-y-2">
                <h3 className="font-semibold text-slate-800 text-lg line-clamp-2">
                  {p.name}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-3">
                  {p.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="text-lg font-bold text-indigo-600">
                  ₹{p.price}
                </span>

                <button
                  onClick={() => addToCart(p._id)} // ✅ pass _id to addToCart
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                  <ShoppingCart size={16} />
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
