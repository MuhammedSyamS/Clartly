import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductGrid from "./components/ProductGrid";
import CategoryBar from "./components/CategoryBar";

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");

  const products = [
    { id: 1, name: "Wireless Headphones", price: 2999, category: "Headphones" },
    { id: 2, name: "Smart Watch", price: 4999, category: "Watches" },
    { id: 3, name: "Gaming Mouse", price: 1999, category: "Gaming" },
    { id: 4, name: "Bluetooth Speaker", price: 2599, category: "Speakers" }
  ];

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-28 text-center">
          <h1 className="text-5xl font-extrabold mb-6">
            Shop Smarter with Cartly
          </h1>
          <p className="text-lg opacity-90 max-w-xl mx-auto">
            Premium gadgets, clean UI, fast checkout.
          </p>
        </div>
      </section>

      {/* Categories */}
      <CategoryBar
        active={activeCategory}
        setActive={setActiveCategory}
      />

      {/* Products */}
      <ProductGrid products={filteredProducts} />

      <Footer />
    </div>
  );
}
