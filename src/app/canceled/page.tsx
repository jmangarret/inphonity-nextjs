import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import React from "react";

export default function Canceled() {
  return (
    <div>
      <Header />
      <main className={`text-center bg-orange-gradient`}>
        <div
          className={`p-9 md:p-24 lg:w-3/4 mx-auto`}
        >
          <h1
            className={`text-4xl md:text-6xl font-bold mb-8 md:mb-12 font-medium`}
          >
            ¡Tiempo agotado!
          </h1>

          <Image
            src={'/img/time-out-icon.svg'}
            alt={`Icono de reloj`}
            width={150}
            height={150}
            className={`mx-auto mb-12`}
          />

          <p
            className={`text-center text-2xl md:text-3xl mb-6 md:mb-10 lg:mb-14 font-light`}
          >
            ¡Si estás listo para <span className={`font-medium`}>unirte a inphonity</span>!, pide <span className={`font-medium`}>una</span>
            <br/>
            <span className={`font-medium`}>nueva invitación</span> a la persona que te contactó
            <br/>
            y empieza a tener <span className={`font-medium`}>más de lo que te imaginas.</span>
            <br/>
            <br/>
            <span className={`font-medium`}>1/8</span>
          </p>
        </div>
      </main>
      <Footer/>
    </div>
  );
};
