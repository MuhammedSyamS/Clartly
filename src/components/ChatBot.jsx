import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function ChatBot() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* CHAT WINDOW */}
      {open && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between bg-indigo-600 text-white px-4 py-3">
            <span className="font-semibold">AI Assistant</span>
            <button onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Chat Body (placeholder for now) */}
          <div className="p-4 h-64 overflow-y-auto text-sm text-gray-700">
            <p className="mb-2">
              👋 Hi am Cartly! I’m your shopping assistant.
            </p>
            <p>
              Ask me about products, orders, or checkout.
            </p>
          </div>

          {/* Input */}
          <div className="border-t p-3">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      )}

      {/* FLOATING ICON */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          bg-indigo-600
          hover:bg-indigo-700
          text-white
          p-4
          rounded-full
          shadow-lg
          transition
        "
        aria-label="Open chat"
      >
        <MessageCircle size={22} />
      </button>
    </div>
  );
}
