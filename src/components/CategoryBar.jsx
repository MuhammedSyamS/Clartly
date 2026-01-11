const categories = [
  "All",
  "Headphones",
  "Watches",
  "Phones",
  "Laptops",
  "Speakers",
  "Gaming",
];

export default function CategoryBar({ active, setActive }) {
  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">

        {/* Scroll container */}
        <div
          className="
            flex gap-3
            overflow-x-auto
            scrollbar-hide
            md:flex-wrap md:justify-center
          "
        >
          {categories.map((cat) => {
            const isActive = active === cat;

            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`
                  whitespace-nowrap
                  px-5 py-2
                  rounded-full
                  text-sm
                  font-medium
                  transition
                  ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                {cat}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
