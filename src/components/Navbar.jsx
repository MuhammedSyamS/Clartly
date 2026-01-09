import { useCart } from "../context/CartContext";
import { Heart, Search, ShoppingCart, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/styles/Cartly.png";
import { useState } from "react";

export default function Navbar({ wishlistCount }) {
  const { cart } = useCart() || { cart: [] };
  const cartCount = cart.reduce((t, i) => t + i.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* MAIN BAR */}
        <div className="flex h-16 md:h-20 items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Cartly"
              className="h-10 sm:h-12 md:h-14 w-auto"
            />
          </Link>

          {/* SEARCH (DESKTOP) */}
          <div className="hidden md:flex flex-1 mx-8 max-w-xl">
            <div className="relative w-full">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search products..."
                className="
                  w-full
                  rounded-full
                  border border-gray-300
                  pl-11 pr-4 py-2.5
                  text-sm
                  focus:outline-none
                  focus:ring-2 focus:ring-indigo-500
                "
              />
            </div>
          </div>

          {/* DESKTOP ACTIONS */}
          <div className="hidden md:flex items-center gap-6">

            <Link
              to="/orders"
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
            >
              Orders
            </Link>

            <Link
              to="/login"
              className="px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-4 py-2 rounded-full bg-gray-100 text-sm font-medium hover:bg-gray-200 transition"
            >
              Signup
            </Link>

            {/* ICONS */}
            <div className="flex items-center gap-4">

              {/* WISHLIST */}
              <Link to="/wishlist" className="relative">
                <Heart className="w-5 h-5 text-gray-700 hover:text-red-500 transition" />
                {wishlistCount > 0 && (
                  <span className="
                    absolute -top-2 -right-2
                    min-w-[18px] h-[18px]
                    px-1
                    bg-red-500 text-white
                    text-[11px] font-bold
                    rounded-full
                    flex items-center justify-center
                  ">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* CART */}
              <Link to="/cart" className="relative">
                <ShoppingCart className="w-5 h-5 text-gray-700 hover:text-indigo-600 transition" />
                {cartCount > 0 && (
                  <span className="
                    absolute -top-2 -right-2
                    min-w-[18px] h-[18px]
                    px-1
                    bg-indigo-600 text-white
                    text-[11px] font-bold
                    rounded-full
                    flex items-center justify-center
                  ">
                    {cartCount}
                  </span>
                )}
              </Link>

            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-5 py-4 space-y-4">

            <Link
              to="/orders"
              onClick={() => setMenuOpen(false)}
              className="block text-center py-2 rounded-lg bg-gray-100 font-medium"
            >
              Orders
            </Link>

            <div className="flex gap-3">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center py-2 rounded-lg bg-indigo-600 text-white font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center py-2 rounded-lg bg-gray-200 font-medium"
              >
                Signup
              </Link>
            </div>

            <div className="flex justify-center gap-6 pt-2">

              <Link to="/wishlist" className="relative">
                <Heart className="w-6 h-6" />
                {wishlistCount > 0 && (
                  <span className="
                    absolute -top-2 -right-2
                    min-w-[18px] h-[18px]
                    bg-red-500 text-white
                    text-[11px] font-bold
                    rounded-full
                    flex items-center justify-center
                  ">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="relative">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="
                    absolute -top-2 -right-2
                    min-w-[18px] h-[18px]
                    bg-indigo-600 text-white
                    text-[11px] font-bold
                    rounded-full
                    flex items-center justify-center
                  ">
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
