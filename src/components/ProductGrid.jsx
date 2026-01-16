import { Heart, Star, Eye } from "lucide-react";


export default function ProductGrid({
  products = [],
  wishlist = [],
  toggleWishlist,
  addToCart,
  onSelect,
}) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((p) => {
          const isWishlisted = wishlist.some(item => item._id === p._id);

          return (
            <div
              key={p._id}
              className="group relative bg-white rounded-3xl overflow-hidden border shadow-sm hover:shadow-lg transition"
            >
              {/* Image */}
              <div
                onClick={() => onSelect?.(p)}
                className="relative h-52 bg-gray-100 cursor-pointer"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect?.(p);
                    }}
                    className="p-3 rounded-full bg-white"
                  >
                    <Eye size={18} />
                  </button>
                </div>
              </div>

              {/* Wishlist */}
             
             <button
  onClick={(e) => {
    e.stopPropagation();
    toggleWishlist?.(p); // 🔹 full product object
  }}
  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow"
>
  <Heart
    size={18}
    className={wishlist.some((item) => item._id === p._id) ? "fill-red-500 text-red-500" : "text-gray-400"}
  />
</button>


              {/* Info */}
              <div className="p-5 space-y-3">
                <h4 className="font-semibold text-gray-800 line-clamp-1">{p.name}</h4>

                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.round(p.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>

                <p className="text-sm text-gray-500 line-clamp-2">{p.description}</p>

                <div className="flex items-center justify-between pt-2">
                  <p className="text-lg font-bold text-indigo-600">₹{p.price}</p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(p._id);
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
                  >
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
