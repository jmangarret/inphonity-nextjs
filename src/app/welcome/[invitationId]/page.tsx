"use client";
import React, { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useGetInvitationByIdQuery } from "@/lib/services/invitationsApi";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Welcome({ params }: { params: { invitationId: string } }) {
  const router = useRouter();
  const { data, error, isLoading } = useGetInvitationByIdQuery(params.invitationId);

  // DATA DUMMY
  // const error = {
  //   status: 200
  // }
  // const isLoading = false;
  // const data = {
  //   pre_registration: {
  //     is_esim: true
  //   }
  // }

  useEffect(() => {
    if (error && 'status' in error && error.status === 404) {
      router.push('/');
    }
  }, [error, router]);

  return (
    <div>
      {/* <Header centerLogo={true} /> */}
      <main className={`text-center ${isLoading ? 'bg-black' : 'bg_bienvenida'}`} style={{ height: '100vh' }}>
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
        <div className={`p-4 md:p-4 lg:w-3/4 mx-auto mt-10`}>
          {data && !data.pre_registration?.is_esim && (
            <>
              <h1
                className={`text-4xl md:text-6xl font-bold mb-8 md:mb-12`}
              >
                ¡Bienvenido a <span className="text-highlight">inphonity</span>!
                <br />
              </h1>
              <p
                className={`text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl text-center mb-6 md:mb-10 lg:mb-14 font-light`}
              >
                Tu Kit de Bienvenida está siendo procesado, llegará a tu domicilio <span className="font-medium">entre 6 a 9 días hábiles.</span>
              </p>
              <Image
                src={`/img/box-icon.svg`}
                alt={`Icono de caja`}
                width={150}
                height={150}
                className={`mx-auto my-10`}
              />
              <p
                className={`text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl text-center mb-6 md:mb-10 lg:mb-14 font-light`}
              >
                Recibirás un correo de confirmación junto con tu guía de rastreo cuando esté listo.
              </p>
              <div className="col-span-12 md:col-span-4 mb-20">
                <div className="button-container text-center lg:w-72 mx-auto flex justify-center">
                  <a className={`btn-width multi-border font-medium block pointer`} href="https://inphonity.com/">
                    REGRESAR AL SITIO
                  </a>
                </div>
              </div>
            </>
          )}

          {data && data.pre_registration?.is_esim && (
            <>
              <h1 className={`text-4xl md:text-6xl font-bold`}>
                Bienvenido a <span className="text-highlight">inphonity</span>
              </h1>
              <br />
              <h2 className={`text-4xl md:text-6xl font-bold mb-8 md:mb-12`}>
                ¡Buenas noticias!
              </h2>
              <p
                className={`text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl text-center mb-6 md:mb-10 lg:mb-14 font-light`}
              >
                Tu eSIM está en camino y <span className="font-medium">pronto llegará a tu correo.</span>
              </p>
              <Image
                src={`/img/mail-send-icon.svg`}
                alt={`Icono de correo`}
                width={150}
                height={150}
                className={`mx-auto my-10`}
              />
              <p
                className={`text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl text-center mb-6 md:mb-10 lg:mb-14 font-light`}
              >
                No olvides revisar tanto tu bandeja de entrada como la de <span className="font-medium">correos no deseados.</span>
              </p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
