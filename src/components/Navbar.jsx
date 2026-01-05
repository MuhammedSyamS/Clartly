import { Heart, Search, ShoppingCart } from "lucide-react";
import logo  from "../assets/styles/Cartly.png";

import Container from "./Container";

export default function Navbar({ wishlistCount }) {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <Container className="h-16 flex items-center justify-between">
        
        {/* Logo */}
        <button> <img src={logo} alt="Logo" className="h-20 w-auto " />
        </button>
      
        {/* Navigation */}
        <nav className="flex items-center gap-8 text-sm font-medium">
        
          <Search size={20}/>
        
        
      
          <button className="hover:text-indigo-600 transition">
            Products
          </button>

          {/* Wishlist */}
          <div className="relative cursor-pointer hover:text-indigo-600 transition">
            <Heart size={20} />

            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {wishlistCount}
              </span>
            )}
          </div>

          {/* Cart */}
          <button className="relative hover:text-indigo-600 transition">
            <ShoppingCart size={20} />
          </button>

          {/* Login */}
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition">
            Login
          </button>
        </nav>

      </Container>
    </header>
  );
}
