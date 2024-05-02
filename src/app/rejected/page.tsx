import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import React from "react";

export default function Rejected() {
  return (
    <div>
      <main className={`text-center bg-black bg_mensaje_rechazada`}>
        <div className={`p-9 lg:w-3/4 mx-auto`}>
          <Image
            src="/logo.svg"
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
            ¡Declinaste tu invitación!
          </h1>

          <Image
            src={'/img/invitation-no-accepted.svg'}
            alt={`Icono de reloj`}
            width={150}
            height={150}
            className={`mx-auto mb-12`}
          />

          <p
            className={`text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl text-center mb-6 md:mb-10 lg:mb-14 font-light`}
          >
            Aún puedes ser parte de inphonity, para obtener un nuevo enlace contacta<br />
            a la persona que te invitó o entra a nuestra página para <a href={`https://inphonity.com/`} className={`font-medium`}>solicitar una nueva.</a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};
