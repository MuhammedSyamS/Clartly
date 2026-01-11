export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Top section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold text-white mb-3">Cartly</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Smart shopping made simple. Discover premium products,
              seamless checkout, and fast delivery.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-indigo-400 cursor-pointer">About</li>
              <li className="hover:text-indigo-400 cursor-pointer">Careers</li>
              <li className="hover:text-indigo-400 cursor-pointer">Blog</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-indigo-400 cursor-pointer">Help Center</li>
              <li className="hover:text-indigo-400 cursor-pointer">Orders</li>
              <li className="hover:text-indigo-400 cursor-pointer">Returns</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-indigo-400 cursor-pointer">Privacy Policy</li>
              <li className="hover:text-indigo-400 cursor-pointer">Terms of Service</li>
              <li className="hover:text-indigo-400 cursor-pointer">Cookies</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
          © 2026 <span className="text-white font-medium">Cartly</span>. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
