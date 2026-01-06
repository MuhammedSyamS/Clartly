import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link
          to="/"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Go Shopping
        </Link>
      </div>
    );
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Shopping Cart</h1>

      {cart.map((item) => (
        <div key={item.id} className="flex justify-between items-center border rounded-lg p-4">
          <img src={item.image} alt={item.name} className="w-24 h-24 object-contain" />
          <div className="flex-1 px-4">
            <h2 className="font-semibold">{item.name}</h2>
            <p className="text-gray-600">₹{item.price} × {item.quantity}</p>
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="flex justify-between items-center font-bold text-xl">
        <span>Total:</span>
        <span>₹{total}</span>
      </div>

      <div className="flex gap-4">
        <button
          onClick={clearCart}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Clear Cart
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
          Checkout
        </button>
      </div>
    </div>
  );
}
