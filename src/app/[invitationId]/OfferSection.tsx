"use client";
import dynamic from "next/dynamic";
import PlusDecoration from "@/components/PlusDecoration";
import Planes from "@/components/Planes";

const Sliders = dynamic(() => import("@/components/Sliders"), { ssr: false });

export default function OfferSection() {

  return (
    <section className="mx-auto bg-white">
      <div className="grid grid-cols-12">
        <div className="col-span-2">
        </div>
        <div className="col-span-8">
          <div className="planes-content">
            <h2 className="mx-auto text-center text-3xl xl:text-5xl mb-5 sm:mb-10 lg:mb-20">
              Elige <span className="font-medium"> nuestros planes</span>
            </h2>
          </div>
        </div>
        <div className="col-span-2">
        </div>
        <div className="col-span-12">
          <Planes />
        </div>
      </div>
    </section>
  );
}
