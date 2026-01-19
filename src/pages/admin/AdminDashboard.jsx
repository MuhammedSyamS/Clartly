import { DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  // Static stats for now (You can connect API later)
  const stats = [
    { label: "Total Revenue", value: "₹1,24,000", icon: DollarSign, color: "bg-green-500" },
    { label: "Total Orders", value: "45", icon: ShoppingBag, color: "bg-blue-500" },
    { label: "Active Users", value: "120", icon: Users, color: "bg-indigo-500" },
    { label: "Growth", value: "+12%", icon: TrendingUp, color: "bg-purple-500" },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`p-4 rounded-xl text-white ${stat.color} shadow-lg shadow-gray-200`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}