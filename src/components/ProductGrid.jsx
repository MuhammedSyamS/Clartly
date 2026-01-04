export default function ProductGrid({ products }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h3 className="text-2xl font-bold mb-8 text-center">
        Featured Products
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition"
          >
            <div className="h-32 bg-gray-100 mb-4 rounded"></div>
            <h4 className="font-semibold">{p.name}</h4>
            <p className="text-indigo-600 font-bold">₹{p.price}</p>
            <button className="mt-3 w-full bg-indigo-600 text-white py-2 rounded">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
