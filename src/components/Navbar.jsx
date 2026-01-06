import { useCart } from "../context/CartContext";
import { Heart, Search, ShoppingCart, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/styles/Cartly.png";
import { useState } from "react";

export default function Navbar({ wishlistCount }) {
  const { cart } = useCart() || { cart: [] };
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Cartly" className="h-12 w-auto" />
          </Link>

          {/* Search bar (desktop only) */}
          <div className="hidden md:flex flex-1 mx-4 max-w-xl">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full border border-gray-300 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>

          {/* Desktop nav links & icons */}
          <div className="hidden md:flex items-center gap-4 sm:gap-6">

            <Link
              to="/products"
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm sm:text-base font-medium hover:bg-gray-200 transition"
            >
              Products
            </Link>

            <Link
              to="/login"
              className="px-4 py-1 bg-indigo-600 text-white rounded-lg text-sm sm:text-base font-medium hover:bg-indigo-700 transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-4 py-1 bg-gray-200 text-black rounded-lg text-sm sm:text-base font-medium hover:text-indigo-700 transition"
            >
              Signup
            </Link>

            <div className="flex items-center gap-3 relative">
              <Heart size={20} className="text-gray-700 hover:text-red-500 transition cursor-pointer" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                  {wishlistCount}
                </span>
              )}

              <Link to="/cart" className="relative">
                <ShoppingCart size={20} className="text-gray-700 hover:text-indigo-600 transition cursor-pointer" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <Menu size={24} className="text-gray-700" />
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <div className="px-4 py-3 flex flex-col gap-3">

            {/* Navigation Links */}
            <Link
              to="/products"
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 text-center transition"
            >
              Products
            </Link>

            {/* Login & Signup */}
            <div className="flex gap-3">
              <Link
                to="/login"
                className="flex-1 text-center px-3 py-1 bg-indigo-600 text-white rounded-full text-sm font-medium hover:bg-indigo-700 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="flex-1 text-center px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm font-medium hover:bg-gray-300 transition"
              >
                Signup
              </Link>
            </div>

            {/* Wishlist & Cart Icons */}
            <div className="flex items-center gap-4 mt-2">
              <Heart size={20} className="text-gray-700 hover:text-red-500 transition cursor-pointer" />
              
              <Link to="/cart" className="relative">
                <ShoppingCart size={20} className="text-gray-700 hover:text-indigo-600 transition cursor-pointer" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

          </div>
        </div>
      )}

    </header>
  );
}
