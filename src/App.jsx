import { Routes, Route, Outlet } from "react-router-dom";

// Contexts
import { CartProvider } from "./context/CartContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

// Components
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ChatBot from "./components/ChatBot.jsx";

// User Pages
import HomePage from "./pages/Home.jsx";
import WishlistPage from "./pages/wishlist.jsx";
import Cart from "./pages/cart.jsx";
import Checkout from "./pages/checkout.jsx";
import Orders from "./pages/MyOrders.jsx";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import ProductDetails from "./pages/ProductDetails.jsx"; 
import Payment from "./pages/payment.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";

// Admin Pages & Routes
import AdminLayout from "./layouts/AdminLayout.jsx"; 
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminProducts from "./pages/admin/AdminProducts.jsx";
import AdminOrders from "./pages/admin/AdminOrders.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import AdminRoutes from "./routes/AdminRoutes.jsx";

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
