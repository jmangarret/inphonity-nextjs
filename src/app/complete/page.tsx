import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import React from "react";

export default function Complete() {
  return (
    <div>
      <Header />
      <main className={`text-center bg-soft-blue`}>
        <div
          className={`p-9 md:p-24 lg:w-3/4 mx-auto`}
        >
          <h1
            className={`text-4xl md:text-6xl font-bold mb-8 md:mb-12 font-medium`}
          >
            ¡Esta invitación ya
            <br/>
            fue aceptada!
          </h1>

          <Image
            src={'/img/invitation-accepted.svg'}
            alt={`Icono de reloj`}
            width={150}
            height={150}
            className={`mx-auto mb-12`}
          />

          <p
            className={`text-center text-2xl md:text-3xl mb-6 md:mb-10 lg:mb-14 font-light`}
          >
            Si quieres <span className={`font-medium`}>una línea adicional</span>, puedes
            <br/>
            contratarla entrando a la <span className={`font-medium`}>App.</span>
          </p>
        </div>
      </main>
      <Footer/>
    </div>
  );
};
