import dynamic from "next/dynamic";
import PlusDecoration from "@/components/PlusDecoration";

const Sliders = dynamic(() => import("@/components/Sliders"), { ssr: false });

export default function OfferSection() {
  return (
    <section className="mx-auto mb-10 md:mb-16 lg:mb-20 xl:mb-24">
      <div className="grid grid-cols-10 items-center">
        <div className="col-span-2 flex justify-end">
          <PlusDecoration
            className="inline-block mt-3 sm:mt-4 md:mt-5 lg:mt-6 xl:mt-7 w-6 sm:w-9 md:w-12 lg:w-16 xl:w-20 mx-3"
          />
          <PlusDecoration
            className="inline-block mt-1 w-3 sm:w-6 md:w-8 lg:w-10 xl:w-12 mx-3 md:mx-6 lg:mx-8 xl:mx-10"
          />
        </div>
        <div className="col-span-6">
          <h2 className="mx-auto w-4/5 sm:w-3/5 text-center font-medium text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl mb-5 sm:mb-10 lg:mb-20">
            Conoce
            <br/>
            nuestros <span className="text-highlight">planes:</span>
          </h2>
        </div>
        <div className="col-span-2 text-right">
          <PlusDecoration
            className="inline-block mt-1 w-3 sm:w-6 md:w-8 lg:w-10 xl:w-12 mx-3 md:mx-6 lg:mx-8 xl:mx-10"
          />
        </div>
        <div className="col-span-10">
          <Sliders/>
        </div>
      </div>
    </section>
  );
}
