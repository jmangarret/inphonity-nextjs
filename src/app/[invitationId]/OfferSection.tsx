import dynamic from "next/dynamic";
import PlusDecoration from "@/components/PlusDecoration";

const Sliders = dynamic(() => import("@/components/Sliders"), { ssr: false });

export default function OfferSection() {
  return (
    <section className="mx-auto mb-10 md:mb-16 lg:mb-20 xl:mb-24">
      <div className="grid grid-cols-10 items-center">
        <div className="col-span-2 flex justify-end">

        </div>
        <div className="col-span-6">
          <h2 className="mx-auto text-center font-medium text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl mb-5 sm:mb-10 lg:mb-20">
            Conoce nuestros <span className="text-highlight">planes</span>
          </h2>
        </div>
        <div className="col-span-2 text-right">

        </div>
        <div className="col-span-10">
          <Sliders />
        </div>
      </div>
    </section>
  );
}
