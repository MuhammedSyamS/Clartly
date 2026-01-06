import { Heart, Star, ShoppingCart } from "lucide-react";

export default function ProductGrid({
  products,
  wishlist,
  toggleWishlist,
  addToCart,
  onSelect, // NEW: click handler for product modal
}) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((p) => {
          const isWishlisted = wishlist.some((item) => item.id === p.id);

          return (
            <div
              key={p.id}
              className="group bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 relative flex flex-col cursor-pointer"
            >
              {/* Wishlist button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(p);
                }}
                className="absolute top-4 right-4 z-10"
              >
                <Heart
                  size={22}
                  className={
                    isWishlisted
                      ? "fill-red-500 text-red-500"
                      : "text-gray-400"
                  }
                />
              </button>

              {/* Product image */}
              <div
                onClick={() => onSelect && onSelect(p)}
                className="relative w-full h-48 rounded-2xl overflow-hidden bg-slate-100"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div
                onClick={() => onSelect && onSelect(p)}
                className="mt-4 space-y-2 flex-1"
              >
                <h4 className="font-semibold text-slate-800 line-clamp-1">
                  {p.name}
                </h4>
                <p className="text-sm text-slate-500 line-clamp-2">
                  {p.description}
                </p>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < Math.round(p.rating || 0)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-slate-300"
                      }
                    />
                  ))}
                </div>
                <p className="text-indigo-600 font-bold text-lg mt-1">
                  ₹{p.price}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
