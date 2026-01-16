import { Routes, Route, Outlet } from "react-router-dom";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBot from "./components/Chatbot";

import HomePage from "./pages/Home";
import WishlistPage from "./pages/wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/checkout";
import Orders from "./pages/Orders";
import Login from "./pages/login";
import Signup from "./pages/Signup";

/* ---------- Layout ---------- */
function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

/* ---------- App ---------- */
export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="wishlist" element={<WishlistPage />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="orders" element={<Orders />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Routes>

        {/* CHATBOT — GLOBAL */}
        <ChatBot />
      </WishlistProvider>
    </CartProvider>
  );
}
