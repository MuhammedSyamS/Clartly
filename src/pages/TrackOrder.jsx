import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TrackOrder() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `https://verda-foregone-noncruciformly.ngrok-free.dev/api/orders/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrder(res.data);
      } catch (err) {
        setError("Failed to track order");
      }
    };

    fetchOrder();
  }, [orderId]);

  if (error) return <p>{error}</p>;
  if (!order) return <p>Loading...</p>;

  return (
    <div>
      <h2>Order Status: {order.status}</h2>
      <p>Total: ₹{order.totalAmount}</p>

      <ul>
        {order.items.map((item) => (
          <li key={item._id}>
            {item.product.name} × {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}
