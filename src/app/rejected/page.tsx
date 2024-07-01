import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import React from "react";
import FloatingDecoration from "@/components/FloatingDecoration";

export default function Rejected() {
  return (
    <div>
      <main className={`text-center bg-white text-black `}>
        <div className={`p-9 lg:w-3/4 mx-auto`}>
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
          className={`p-9 md:p-16 lg:p-20 lg:w-3/4 mx-auto`}
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
        <FloatingDecoration
          className={`w-16 md:w-28 lg:w-48 relative top-[-20%]  left-[3%]`}
          img="/img/eclipse-orange-full.svg"
        />
        <FloatingDecoration
          className={`w-8 md:w-12 relative bottom-[-40%] left-[20%]`}
          img="/img/red-plus.svg"
        />
         <FloatingDecoration
          className={`w-16 md:w-32 lg:w-48 absolute top-[0%] left-[0%]`}
          img="/img/eclipse-orange-1.svg"
        />
        <FloatingDecoration
          className={`w-12 md:w-20 lg:w-48 absolute top-[35%] right-[0%]`}
          img="/img/eclipse-orange-2.svg"
        />

        <FloatingDecoration
          className={`w-8 md:w-12 absolute top-[10%] right-[10%]`}
          img="/img/red-plus.svg"
        />
      </main>
      <Footer />
    </div>
  );
};
