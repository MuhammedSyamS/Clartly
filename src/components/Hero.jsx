import Container from "./Container";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
      <Container className="py-32 grid md:grid-cols-2 gap-16 items-center">
        
        <div>
          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Smart Shopping <br /> Starts with Cartly
          </h1>

          <p className="text-lg opacity-90 mb-10 max-w-lg">
            Discover premium electronics, seamless checkout, and fast delivery —
            all in one modern platform.
          </p>

          <div className="flex gap-4">
            <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:scale-105 transition">
              Shop Now
            </button>
            <button className="border border-white/40 px-8 py-3 rounded-lg hover:bg-white/10 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Visual Placeholder */}
        <div className="hidden md:block h-96 bg-white/10 rounded-3xl backdrop-blur-sm"></div>

      </Container>
    </section>
  );
}
