import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import React from "react";

export default function Complete() {
  return (
    <div style={{ height: '100vh' }}>
      <main className={`text-center bg-black bg_mensaje_aceptada`}>
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
              <a className={`btn-width multi-border font-medium block pointer`}>
                DA CLICK AQUÍ
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
