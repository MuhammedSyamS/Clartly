const categories = [
  "All",
  "Headphones",
  "Watches",
  "Accessories",
  "Speakers",
  "Gaming"
];

export default function CategoryBar({ active, setActive }) {
  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition
                ${
                  active === cat
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
