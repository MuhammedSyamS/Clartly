import { Link, useNavigate } from "react-router-dom";
import { Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingCart size={48} className="mx-auto text-gray-300" />
        <h2 className="mt-6 text-2xl font-bold text-gray-700">
          Your cart is empty
        </h2>
        <Link
          to="/"
          className="mt-4 inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-white rounded-2xl shadow"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-contain rounded-lg"
              />

              <div className="flex-1 px-4">
                <h2 className="font-semibold text-gray-800">
                  {item.name}
                </h2>
                <p className="text-gray-500">
                  ₹{item.price} × {item.quantity}
                </p>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
                title="Remove item"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-2xl shadow space-y-4 h-fit">
          <h2 className="text-xl font-bold">Order Summary</h2>

          <div className="flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>

          <div className="border-t pt-4 flex flex-col gap-2">
            <button
              onClick={handleCheckout}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={clearCart}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
