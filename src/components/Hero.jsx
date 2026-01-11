import desktopImg from "../assets/styles/Shopping.png";
import mobileImg from "../assets/styles/Shopping.png";

export default function Hero({ productRef }) {
  return (
    <section className="relative w-full overflow-hidden">

      {/* ===== MOBILE ===== */}
<div className="md:hidden relative w-full">

  {/* Image */}
  <img
    src={mobileImg}
    alt="Hero mobile"
    className="w-full h-auto"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

  {/* Text on Image */}
  <div className="absolute inset-0 flex flex-col justify-end px-4 pb-6  text-black">
    <h1 className="text-xl font-extrabold leading-tight mb-3">
      Smart Shopping <br />
      Starts with <span className="text-indigo-600">Cartly</span>
    </h1>

    <p className="text-sm text-gray-700/90 mb-4">
      Discover premium electronics, seamless checkout,
      and fast delivery,all in one platform.
    </p>

    <button
      onClick={() =>
        productRef?.current?.scrollIntoView({ behavior: "smooth" })
      }
      className="
       bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full font-semibold transition
      "
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
