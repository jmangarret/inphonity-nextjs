import HeroVideo from "@/components/HeroVideo";

// const HeroVideo = dynamic(() => import("@/components/HeroVideo"), { ssr: false });

export default function HeroSection() {
  return (
    <section className="container mx-auto text-center mb-10 md:mb-16 lg:mb-20 xl:mb-24">
      <h2 className="w-3/5 mx-auto font-medium text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl mb-5 sm:mb-10 lg:mb-20">
        ¿Por qué conformarse con lo que <span className="text-highlight">todos tienen?</span>
      </h2>
      <HeroVideo />
    </section>
  );
}
