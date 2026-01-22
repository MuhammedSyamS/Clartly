import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import axios from "axios";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "ai", text: "👋 Hi! I’m your Cartly assistant. Ask me about products, orders, or checkout." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("/api/chat", { message: input });
      const aiMessage = { sender: "ai", text: res.data.reply || "Sorry, I didn't get that." };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      const aiMessage = { sender: "ai", text: "❌ Failed to get response. Try again later." };
      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between bg-indigo-600 text-white px-4 py-3">
            <span className="font-semibold">AI Assistant</span>
            <button onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 h-64">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[80%] ${msg.sender === "user" ? "bg-indigo-100 text-right self-end" : "bg-gray-100 text-left self-start"}`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="p-2 bg-gray-100 rounded-lg text-left self-start animate-pulse">
                Typing...
              </div>
            )}
            <div ref={messagesEndRef}></div>
          </div>

          {/* Input */}
          <div className="border-t p-3 flex gap-2">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 border rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg flex items-center justify-center"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Icon */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition"
        aria-label="Open chat"
      >
        <MessageCircle size={22} />
      </button>
    </div>
  );
}
