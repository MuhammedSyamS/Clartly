import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { Heart, Search, ShoppingCart, Menu, X, Package, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/styles/Cartly.png";
import { useState } from "react";

export default function Navbar() {
  const { cart } = useCart() || { cart: [] };
  const { wishlist } = useWishlist() || { wishlist: [] };
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const isLoggedIn = !!user;
  const cartCount = cart.reduce((t, i) => t + i.quantity, 0);
  const wishlistCount = wishlist.length;

  // Helper to safely get the name
  const userName = user?.name || "User";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Cartly" className="h-10 sm:h-12 md:h-14 w-auto" />
          </Link>

          {isLoggedIn && (
            <div className="hidden md:flex flex-1 mx-8 max-w-xl">
              <div className="relative w-full">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full rounded-full border border-gray-300 pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 md:gap-6">
            {isLoggedIn && (
              <>
                <Link
                  to="/orders"
                  className="flex items-center gap-1 text-gray-700 hover:text-indigo-600 transition"
                >
                  <Package className="w-5 h-5" />
                  <span className="hidden md:inline text-sm font-medium">Orders</span>
                </Link>

                <Link to="/wishlist" className="relative">
                  <Heart className="w-5 h-5 text-gray-700 hover:text-red-500 transition" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                <Link to="/cart" className="relative">
                  <ShoppingCart className="w-5 h-5 text-gray-700 hover:text-indigo-600 transition" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 bg-indigo-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </>
            )}

            <div className="hidden md:flex items-center gap-4">
              {!isLoggedIn ? (
                <>
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
                </>
              ) : (
                <>
                  {/* ✅ DESKTOP: User Name Display */}
                  <div className="flex items-center gap-2 text-gray-700 border-r pr-4 mr-1">
                    <User size={18} className="text-indigo-600" />
                    <span className="text-sm font-bold truncate max-w-[150px]">
                      Hi, {userName}
                    </span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              )}
            </div>

            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-5 py-4 space-y-3">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center py-2 rounded-lg bg-indigo-600 text-white font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center py-2 rounded-lg bg-gray-200 font-medium"
                >
                  Signup
                </Link>
              </>
            ) : (
              <>
                {/* ✅ MOBILE: User Name Display */}
                <div className="flex items-center justify-center gap-2 py-2 text-indigo-700 font-bold bg-indigo-50 rounded-lg mb-2">
                   <User size={18} />
                   <span>Welcome, {userName}</span>
                </div>

                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-red-500 text-white font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}