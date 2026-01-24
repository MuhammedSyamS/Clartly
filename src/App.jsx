import { Routes, Route, Outlet } from "react-router-dom";

// Contexts
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";

// User Pages
import HomePage from "./pages/Home";
import WishlistPage from "./pages/wishlist";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import Orders from "./pages/MyOrders";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ProductDetails from "./pages/ProductDetails"; 
import Payment from "./pages/payment";
import OrderSuccess from "./pages/OrderSuccess";

// Admin Pages & Routes
import AdminLayout from "./layouts/AdminLayout"; 
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminRoutes from "./routes/AdminRoutes";

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
    <AuthProvider>
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

            {/* ADMIN ROUTES */}
            <Route 
              path="admin"  
              element={
                <AdminRoutes>
                  <AdminLayout />
                </AdminRoutes>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="users" element={<AdminUsers />} />
            </Route>
          </Routes>

          <ChatBot />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
