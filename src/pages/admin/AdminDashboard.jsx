import { useEffect, useState } from "react";
import { DollarSign, ShoppingBag, Users, Package } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin/stats", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchStats();
  }, [token]);

  // Fetch products for low stock calculation
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin/products", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        setLowStockCount(data.filter(p => p.stock < 10).length);
      } catch (err) {
        console.error(err);
      }
    };
    if (token) fetchProducts();
  }, [token]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!stats) return <div className="text-center py-10">Failed to load stats</div>;

  const statCards = [
    {
      icon: DollarSign,
      label: "Total Revenue",
      value: `₹${stats.totalRevenue?.toLocaleString() || 0}`,
      color: "bg-green-500"
    },
    {
      icon: ShoppingBag,
      label: "Total Orders",
      value: stats.totalOrders || 0,
      color: "bg-blue-500"
    },
    {
      icon: Users,
      label: "Total Customers",
      value: stats.totalUsers || 0,
      color: "bg-purple-500"
    },
    {
      icon: Package,
      label: "Low Stock Items",
      value: lowStockCount,
      color: lowStockCount > 0 ? "bg-red-500" : "bg-orange-500"
    }
  ];

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow flex items-center gap-4 hover:shadow-lg transition">
            <div className={`p-4 rounded-xl text-white ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-2xl shadow">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Stats</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="border-l-4 border-indigo-600 pl-4">
            <p className="text-gray-600">Average Order Value</p>
            <p className="text-2xl font-bold">
              ₹{stats.totalOrders > 0 ? Math.round(stats.totalRevenue / stats.totalOrders) : 0}
            </p>
          </div>
          <div className="border-l-4 border-green-600 pl-4">
            <p className="text-gray-600">Products Available</p>
            <p className="text-2xl font-bold">{stats.totalProducts}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
