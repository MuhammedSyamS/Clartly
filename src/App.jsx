import { Routes, Route, Outlet } from "react-router-dom";

// Contexts
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBot from "./components/Chatbot";

// User Pages
import HomePage from "./pages/Home";
import WishlistPage from "./pages/wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/checkout";
import Orders from "./pages/MyOrders";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ProductDetails from "./pages/ProductDetails"; 
import Payment from "./pages/payment";
import OrderSuccess from "./pages/OrderSuccess";

// ✅ ADMIN IMPORTS (Based on your file paths)
import AdminLayout from "./layouts/AdminLayout"; 
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Routes>
          {/* USER ROUTES */}
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="wishlist" element={<WishlistPage />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="payment" element={<Payment />} />
            <Route path="order-success" element={<OrderSuccess />} />
            <Route path="orders" element={<Orders />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>

          {/* ✅ ADMIN ROUTES */}
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
        </Routes>

        <ChatBot />
      </WishlistProvider>
    </CartProvider>
  );
}