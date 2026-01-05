import attractionImg from "../assets/styles/Shopping.png";

export default function Hero() {
  return (
    <section
      className="relative h-[720px] flex items-center"
      style={{
        backgroundImage: `url(${attractionImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* FULL WIDTH WRAPPER */}
      <div className="relative z-10 w-full px-6 md:px-24 lg:px-32">
        <div className="max-w-xl text-left">
          <h1 className="text-5xl font-extrabold leading-tight text-black mb-6">
            Smart Shopping <br /> Starts with Cartly
          </h1>

          <p className="text-lg text-black/90 mb-10">
            Discover premium electronics, seamless checkout, and fast delivery
            all in one modern platform.
          </p>

          <div className="flex gap-4">
            <button className="bg-indigo-600 text-black px-8 py-3 rounded-full font-semibold hover:scale-105 transition">
              Shop Now
            </button>
            <button className="text-black font-medium hover:underline">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
