import HeroVideo from "@/components/HeroVideo";

// const HeroVideo = dynamic(() => import("@/components/HeroVideo"), { ssr: false });

export default function HeroSection() {
  return (
    <section className="mx-auto text-center my-20 md:mb-16 lg:mb-20 xl:mb-24">
      <h2 className="mx-auto font-medium text-2xl sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl mb-5">
      Consume inteligente con <span className="text-highlight">cashback</span>
      </h2>

      <div className="text-lg sm:text-3xl lg:text-4xl xl:text-5xl mb-5 sm:mb-10 lg:mb-20">
      ¿Cuánto te paga tu línea telefónica por usarla?
      </div>

      <HeroVideo />
    </section>
  );
}
