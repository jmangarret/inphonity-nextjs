import dynamic from "next/dynamic";
import PlusDecoration from "@/components/PlusDecoration";

const Sliders = dynamic(() => import("@/components/Sliders"), { ssr: false });

export default function SelectOfferSection() {
  return (
    <section className="xl:container mx-auto py-4 sm:py-5 md:py-6 lg:py-7 xl:py-8">
      <div className="grid grid-cols-12">
        <div className="col-span-2 flex justify-center items-center">
          <PlusDecoration
            className="inline-block w-6 sm:w-9 md:w-12 lg:w-16 xl:w-20"
          />
        </div>
        {/* title */}
        <div className="col-span-8">
          <h2
            className="mx-auto text-center font-medium mb-5 sm:mb-10 lg:mb-20"
          >
            <span className={'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl'}>
              Conoce <span className="text-highlight">nuestros planes</span>
            </span>
          </h2>
        </div>
        <div className="col-span-2">
          <div className={'relative'}>
            <PlusDecoration
              className="inline-block w-12 sm:w-16 md:w-20 lg:w-24 xl:w-28"
              style={{position: 'absolute', top: '-15px'}}
            />
          </div>
        </div>
        <div className="col-span-12">
          <Sliders/>
        </div>
      </div>
    </section>
  );
}
