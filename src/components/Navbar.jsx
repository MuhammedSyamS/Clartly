import Container from "./Container";

export default function Navbar() {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <Container className="h-16 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-indigo-600">
          Cartly
        </h1>

        <nav className="flex items-center gap-8 text-sm font-medium">
          <a className="hover:text-indigo-600 transition">Products</a>
          <a className="hover:text-indigo-600 transition">Wishlist</a>
          <a className="hover:text-indigo-600 transition">Cart</a>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition">
            Login
          </button>
        </nav>
      </Container>
    </header>
  );
}
