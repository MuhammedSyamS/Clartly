import { Link } from "react-router-dom";

export default function AdminNavbar() {
  return (
    <nav className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/admin" className="font-bold text-xl">Cartly Admin</Link>
      <div className="space-x-4">
        <Link to="/admin/products">Products</Link>
        <Link to="/admin/orders">Orders</Link>
        <Link to="/admin/users">Users</Link>
        <Link to="/">Back to Shop</Link>
      </div>
    </nav>
  );
}
