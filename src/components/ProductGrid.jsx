import { Heart } from "lucide-react";

export default function ProductGrid({ products, wishlist, toggleWishlist }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h3 className="text-2xl font-bold mb-10 text-center">
        Featured Products
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p) => {
          const isWishlisted = wishlist.some(
            (item) => item.id === p.id
          );

          return (
            <div
              key={p.id}
              className="bg-white rounded-2xl p-4 shadow hover:shadow-lg transition relative"
            >
              {/* ❤️ Wishlist icon */}
              <button
                onClick={() => toggleWishlist(p)}
                className="absolute top-4 right-4"
              >
                <Heart
                  size={22}
                  className={`transition ${
                    isWishlisted
                      ? "fill-red-500 text-red-500"
                      : "text-gray-400 hover:text-red-500"
                  }`}
                />
              </button>

              <div className="h-32 bg-gray-100 mb-4 rounded-xl"></div>

              <h4 className="font-semibold">{p.name}</h4>
              <p className="text-indigo-600 font-bold">
                ₹{p.price}
              </p>

              <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-xl">
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
