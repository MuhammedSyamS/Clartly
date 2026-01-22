export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/admin/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Users</h2>
      <table className="w-full text-left border rounded-lg overflow-hidden">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Joined</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {users.map(u => (
            <tr key={u._id}>
              <td className="px-4 py-2">{u.name}</td>
              <td>{u.email}</td>
              <td>{u.isAdmin ? "✅" : "❌"}</td>
              <td>{new Date(u.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
