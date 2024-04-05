import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import React from "react";

export default function Canceled() {
  return (
    <div>
      <main className={`text-center bg-black bg_mensaje_rechazada`}>
        <div className={`p-9 lg:w-3/4 mx-auto`}>
          <Image
            src="/logo.svg"
            alt="Logotipo de Inphonity"
            width={156.13}
            height={27.01}
            priority
            className={`mx-auto`}
          />
        </div>
        <div className={`p-9 md:p-24 lg:w-3/4 mx-auto`}>
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
            className={`text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl text-center mb-6 md:mb-10 lg:mb-14 font-light`}
          >
            ¡Si estás listo para <span className={`font-medium`}>unirte a inphonity</span>!, pide <span className={`font-medium`}>una</span>
            <span className={`font-medium`}>nueva invitación</span> a la persona <br />
            que te contactó y empieza a tener <span className={`font-medium`}>más de lo que te imaginas.</span>
            <br />
            <br />
          </p>
          <div className="col-span-12 md:col-span-4">
            <div className="button-container text-center lg:w-72 mx-auto flex justify-center">
              <a className={`btn-width multi-border font-medium block pointer`} href={`https://inphonity.com/`}>
                REGRESAR AL SITIO
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
