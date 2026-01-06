import { FilterIcon, Heart, Search, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/styles/Cartly.png";
import Container from "./Container";

export default function Navbar({ wishlistCount }) {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <Container className="h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" className="h-20 w-auto cursor-pointer" />
        </Link>

        {/* Search Form */}
        <form className="relative flex items-center mx-6">
          <input
            type="search"
            placeholder="Search products"
            className="w-56 sm:w-72 md:w-96 lg:w-[32rem] pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search size={18} className="absolute left-3 text-gray-400" />
        </form>

        {/* Navigation */}
        <nav className="flex items-center gap-4 sm:gap-8 text-sm font-medium">
          <button className="hover:text-indigo-600 transition">
            Products
          </button>

          <button className="relative cursor-pointer hover:text-indigo-600 transition">
            <FilterIcon size={20} />
          </button>

          <div className="relative cursor-pointer hover:text-indigo-600 transition">
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {wishlistCount}
              </span>
            )}
          </div>

          <button className="relative hover:text-indigo-600 transition">
            <ShoppingCart size={20} />
          </button>

          {/* SPA Login Link */}
          <Link
            to="/login"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition"
          >
            Login
          </Link>

          <Link
            to="/signup" 
            className="bg-gray-200 text-black px-4 py-2 rounded-lg text-sm hover:text-indigo-700 transition">
            Signup
          </Link>
        </nav>

      </Container>
    </header>
  );
}
