import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/cart";

function Layout() {
  return (
    <>
      <Navbar wishlistCount={0} />  {/* persistent Navbar */}
      <Outlet />                   {/* renders current route */}
      <Footer />                   {/* persistent Footer */}
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />   {/* "/" */}
        <Route path="login" element={<Login />} /> {/* "/login" */}
        <Route path="signup" element={<Signup />} /> {/* "/Signup" */}
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />

      </Route>
    </Routes>
  );
}
