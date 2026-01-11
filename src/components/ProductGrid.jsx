import { Heart, Star, Eye } from "lucide-react";

export default function ProductGrid({
  products,
  wishlist = [],
  toggleWishlist,
  addToCart,
  onSelect,
}) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 max-sm:px-3 max-sm:py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-sm:grid-cols-2 max-sm:gap-4">
        {products.map((p) => {
          const isWishlisted = wishlist.some((item) => item.id === p.id);

          return (
            <div
              key={p.id}
              className="
                group relative bg-white rounded-3xl overflow-hidden
                border border-slate-200 hover:border-indigo-300
                transition-all duration-300 shadow-sm hover:shadow-lg
                max-sm:rounded-2xl
              "
            >
              {/* Product Image */}
              <div
                onClick={() => onSelect?.(p)}
                className="
                  relative h-52 bg-slate-100 overflow-hidden cursor-pointer
                  max-sm:h-36
                "
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Hover overlay – desktop ONLY */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4 max-sm:hidden">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect?.(p);
                    }}
                    className="p-3 rounded-full bg-white hover:scale-110 transition"
                  >
                    <Eye size={18} />
                  </button>
                </div>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist?.(p);
                }}
                className="
                  absolute top-4 right-4 z-10 p-2 rounded-full
                  bg-white shadow hover:scale-110 transition
                  max-sm:top-2 max-sm:right-2 max-sm:p-1.5
                "
              >
                <Heart
                  size={18}
                  className={
                    isWishlisted
                      ? "fill-red-500 text-red-500"
                      : "text-slate-400"
                  }
                />
              </button>

              {/* Product Info */}
              <div className="p-5 space-y-3 max-sm:p-3 max-sm:space-y-2">
                <h4 className="font-semibold text-slate-800 line-clamp-1 max-sm:text-sm">
                  {p.name}
                </h4>

                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < Math.round(p.rating || 0)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-slate-300"
                      }
                    />
                  ))}
                  <span className="text-xs text-slate-500 ml-1 max-sm:text-[10px]">
                    ({p.rating || 0})
                  </span>
                </div>

                {/* Description hidden ONLY on mobile */}
                <p className="text-sm text-slate-500 line-clamp-2 max-sm:hidden">
                  {p.description}
                </p>

                <div className="flex items-center justify-between pt-2 max-sm:pt-1">
                  <p className="text-lg font-bold text-indigo-600 max-sm:text-sm">
                    ₹{p.price}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart?.(p);
                    }}
                    className="
                      text-sm font-medium px-4 py-2 rounded-full
                      bg-indigo-600 text-white hover:bg-indigo-700 transition
                      max-sm:text-xs max-sm:px-3 max-sm:py-1.5
                    "
                  >
                    Add
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
