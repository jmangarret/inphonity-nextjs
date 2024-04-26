"use client";
import dynamic from "next/dynamic";
import PlusDecoration from "@/components/PlusDecoration";
import Planes from "@/components/Planes";

const Sliders = dynamic(() => import("@/components/Sliders"), { ssr: false });

export default function OfferSection() {

  return (
    <section className="mx-auto mb-10 md:mb-16 lg:mb-20 xl:mb-24 bg-white">
      <div className="grid grid-cols-10 items-center">
        <div className="col-span-2 flex justify-end">

        </div>
        <div className="col-span-12 lg:col-span-6 planes-content">
          <h2 className="mx-auto text-center text-2xl lg:text-3xl xl:text-5xl mb-5 sm:mb-10 lg:mb-20">
            Conoce <span className="font-medium"> nuestros planes</span>
          </h2>
        </div>
        <div className="col-span-2 text-right">

        </div>
        <div className="col-span-12 lg:col-span-10 planes-container">
          <Planes />
        </div>
      </div>
    </section>
  );
}
