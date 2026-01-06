import { Heart, Star, ShoppingCart } from "lucide-react";

export default function ProductGrid({
  products,
  wishlist,
  toggleWishlist,
  addToCart,
}) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h3 className="text-3xl font-extrabold mb-12 text-center text-slate-900">
        Featured Products
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((p) => {
          const isWishlisted = wishlist.some((item) => item.id === p.id);

          return (
            <div
              key={p.id}
              className="group bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 relative flex flex-col"
            >
              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(p)}
                className="absolute top-4 right-4 z-10"
                aria-label="Add to wishlist"
              >
                <Heart
                  size={22}
                  className={`transition-all duration-200 ${
                    isWishlisted
                      ? "fill-red-500 text-red-500 scale-110"
                      : "text-gray-400 group-hover:text-red-400"
                  }`}
                />
              </button>

              {/* Image */}
              <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {p.discount && (
                  <span className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {p.discount}% OFF
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="mt-4 space-y-2 flex-1">
                <h4 className="font-semibold text-slate-800 line-clamp-1">
                  {p.name}
                </h4>

                <p className="text-sm text-slate-500 line-clamp-2">
                  {p.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < Math.round(p.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-slate-300"
                      }
                    />
                  ))}
                  <span className="text-xs text-slate-500 ml-1">
                    ({p.rating})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <p className="text-indigo-600 font-bold text-lg">₹{p.price}</p>
                  {p.originalPrice && (
                    <p className="text-sm text-slate-400 line-through">
                      ₹{p.originalPrice}
                    </p>
                  )}
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => addToCart(p)}
                disabled={!p.inStock}
                className={`mt-5 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium transition ${
                  p.inStock
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
              >
                <ShoppingCart size={18} />
                {p.inStock ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
