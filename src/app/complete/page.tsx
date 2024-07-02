import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import React from "react";
import FloatingDecoration from "@/components/FloatingDecoration";
import PlusDecoration from "@/components/PlusDecoration";

export default function Complete() {
  return (
    <section className="bg-white text-black text-center h-screen">
      <main>
        <FloatingDecoration
          className={`w-24 md:w-40 lg:w-48 absolute top-[0%] right-[0%]`}
          img="/img/sign-eclipse-green-1.svg"
        />

        <div className={`px-9 pt-16 md:pt-9 pb-9 lg:w-3/4 mx-auto`}>
          <Image
            src="/Logo3.svg"
            alt="Logotipo de Inphonity"
            width={203}
            height={29.4}
            priority
            className={`mx-auto`}
          />
        </div>


        <div
          className={`p-9 md:p-24 lg:w-3/4 mx-auto`}
        >
          <h1
            className={`text-4xl md:text-6xl font-bold mb-8 md:mb-12 font-medium`}
          >
            ¡Esta invitación <span className="text-highlight">ya fue aceptada</span>!
          </h1>

          <Image
            src={'/img/invitation-accepted.svg'}
            alt={`Icono de reloj`}
            width={150}
            height={150}
            className={`mx-auto mb-12`}
          />

          <p
            className={`text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl text-center mb-6 md:mb-10 lg:mb-14 font-light`}
          >
            Si quieres <span className={`font-medium text-highlight`}>una línea adicional</span>, puedes
            contratarla entrando a la <span className={`font-medium`}>App.</span>
          </p>

          <div className="col-span-12 md:col-span-4">
            <div className="button-container text-center lg:w-72 mx-auto flex justify-center">
              <a className={`btn-width multi-border text-white bg-black font-medium block pointer`}>
                DA CLICK AQUÍ
              </a>
            </div>
          </div>

          <FloatingDecoration
            className={`w-12 md:w-24 lg:w-32 absolute bottom-[40%] md:bottom-[40%] lg:bottom-[30%] xl:bottom-[35%] left-[0%]`}
            img="/img/sign-eclipse-green-2.svg"
          />

          <FloatingDecoration
            className={`w-12 md:w-16 lg:w-48 absolute hidden lg:block bottom-[33%] md:bottom-[30%] lg:bottom-[25%] right-[1%] md:right-[3%] lg:right-[5%]`}
            img="/img/sign-eclipse-green-3.svg"
          />

          <PlusDecoration
            className="hidden md:block w-8 absolute top-[10%] left-[10%]"
            isGreen={true}
          />

          <FloatingDecoration
            className={`w-4 md:w-6 lg:w-8 absolute hidden lg:block bottom-[25%] md:bottom-[35%] lg:bottom-[25%] right-[5%] md:right-[22%] lg:right-[25%]`}
            img="/img/blue-plus.svg"
          />

        </div>
      </main>

      <div className="lg:absolute lg:w-full lg:bottom-0">
        <Footer />
      </div>

    </section>
  );
};
