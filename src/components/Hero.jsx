import desktopImg from "../assets/styles/Shopping.png";
import mobileImg from "../assets/styles/hero-mobile-no-crop.png";

export default function Hero({ productRef }) {
  return (
    <section className="relative w-full overflow-hidden">

      {/* ===== MOBILE ===== */}
      <div className="md:hidden">
        <img
          src={mobileImg}
          alt="Hero mobile"
          className="w-full h-auto"
        />

        <div className="px-4 py-6 text-center">
          <h1 className="text-2xl font-bold mb-3">
            Smart Shopping <br />
            Starts with <span className="text-indigo-600">Cartly</span>
          </h1>

          <p className="text-sm text-gray-600 mb-4">
            Discover premium electronics, seamless checkout,
            and fast delivery — all in one platform.
          </p>

          <button
            onClick={() =>
              productRef?.current?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold"
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* ===== DESKTOP ===== */}
      <div className="hidden md:flex relative h-screen w-full">

        {/* IMAGE — FULL COVER */}
        <img
          src={desktopImg}
          alt="Hero desktop"
          className="
            absolute inset-0
            w-full h-full
            object-cover
          "
        />

        {/* CONTENT — PERFECTLY CENTERED */}
        
        {/* CONTENT — LEFT CENTERED */}
<div className="relative z-10 flex items-center w-full pl-24">
  <div className="max-w-xl text-black">

    <h1 className="text-5xl font-extrabold leading-tight mb-4">
      Smart Shopping <br />
      Starts with <span className="text-indigo-600">Cartly</span>
    </h1>

    <p className="text-lg text-gray-700 mb-6">
      Discover premium electronics, seamless checkout,
      and fast delivery — all in one modern platform.
    </p>

    <button
      onClick={() =>
        productRef?.current?.scrollIntoView({ behavior: "smooth" })
      }
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-semibold transition"
    >
      Shop Now
    </button>

  </div>
</div>



      </div>

    </section>
  );
}
