import Container from "./Container";
import attractionImg from "../assets/styles/Shopping.png";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-indigo-600 to-purple-600 text-white overflow-hidden">
      <Container className="relative z-10 py-32 grid md:grid-cols-2 gap-16 items-center">
        
        {/* LEFT CONTENT */}
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

        {/* RIGHT IMAGE (INSIDE BLUE AREA) */}
        <div className="hidden md:flex justify-center items-center">
          <img
            src={attractionImg}
            alt="Shopping Illustration"
            className="max-h-[460px] w-auto object-contain drop-shadow-2xl"
          />
        </div>

      </Container>
    </section>
  );
}
