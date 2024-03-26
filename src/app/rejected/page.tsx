import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import React from "react";

export default function Rejected() {
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
            ¡Invitación declinada!
          </h1>

          <Image
            src={'/img/invitation-no-accepted.svg'}
            alt={`Icono de reloj`}
            width={150}
            height={150}
            className={`mx-auto mb-12`}
          />

          <p
            className={`text-center text-2xl md:text-3xl mb-6 md:mb-10 lg:mb-14 font-light`}
          >
            Parece que el enlace ha caducado.
            <br/>
            <a href={`https://inphonity.com/`} className={`font-medium underline`}>Haz clic aquí</a> para solicitar una nueva invitación
            <br/>
            o contacta a la persona que te compartió
            <br/>
            el enlace para obtener uno nuevo.
          </p>
        </div>
      </main>
      <Footer/>
    </div>
  );
};
