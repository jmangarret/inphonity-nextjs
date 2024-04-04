import HeroVideo from "@/components/HeroVideo";

// const HeroVideo = dynamic(() => import("@/components/HeroVideo"), { ssr: false });

export default function HeroSection() {
  return (
    <section className="container mx-auto text-center my-20 md:mb-16 lg:mb-20 xl:mb-24">
      <h2 className="mx-auto font-medium text-2xl sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl mb-5">
      Consume inteligente con <span className="text-highlight">cashback</span>
      </h2>

      <div className="text-lg sm:text-3xl lg:text-4xl xl:text-5xl mb-5 sm:mb-10 lg:mb-20">
      ¿Cuánto te paga tu línea telefónica por usarla?
      </div>

      <HeroVideo />

      <div className="sm:flex">
        <div className="w-full px-3 md:px-5 lg:px-10 my-10 sm:my-20 md:my-20 lg:my-20 mx-5 xl:mx-24">
          <p className="text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl text-center">
          ¿Aún tienes dudas? <span className="font-medium ">Dale clic al siguiente botón</span> y descubre más información.
          </p>
        </div>
      </div>
      <div className="col-span-12 md:col-span-4 mb-10 sm:mb-20 md:mb-30 lg:mb-40">
        <div className="button-container text-center lg:w-72 mx-auto mb-30 flex justify-center">
          <button className={`btn-width multi-border font-medium block`}>
            CONOCE MÁS
          </button>
        </div>
      </div>
    </section>
  );
}
