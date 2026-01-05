import { Heart } from "lucide-react";

export default function ProductGrid({ products, wishlist, toggleWishlist }) {
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
              className="group bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 relative"
            >
              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(p)}
                className="absolute top-4 right-4 z-10"
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
              </div>

              {/* Content */}
              <div className="mt-4 space-y-2">
                <h4 className="font-semibold text-slate-800 line-clamp-1">
                  {p.name}
                </h4>
                <p className="text-indigo-600 font-bold text-lg">
                  ₹{p.price}
                </p>
              </div>

              {/* CTA */}
              <button className="mt-5 w-full bg-indigo-600 text-white py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition">
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
