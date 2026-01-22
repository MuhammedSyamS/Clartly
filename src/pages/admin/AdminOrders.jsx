export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/admin/orders")
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold">Orders</h2>
      {orders.map(order => (
        <div key={order._id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
          <div>
            <p><b>Order ID:</b> {order._id}</p>
            <p><b>User:</b> {order.user?.name}</p>
            <p><b>Total:</b> ₹{order.totalAmount}</p>
          </div>
          <p className="text-indigo-600">{order.status}</p>
        </div>
      ))}
    </div>
  );
}
