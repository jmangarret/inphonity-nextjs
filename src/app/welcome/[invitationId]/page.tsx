"use client";
import React, {useEffect} from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {useGetInvitationByIdQuery} from "@/lib/services/invitationsApi";
import Image from "next/image";
import {useRouter} from "next/navigation";

export default function Welcome({params}: { params: { invitationId: string }}) {
  const router = useRouter();
  const { data, error, isLoading } = useGetInvitationByIdQuery(params.invitationId);

  useEffect(() => {
    if (error && 'status' in error && error.status === 404) {
      router.push('/');
    }
  }, [error, router]);

  return (
    <div>
      <Header />
      <main className={`text-center font-medium ${isLoading ? 'bg-black' : data && data.pre_registration?.is_esim ? 'bg-orange-gradient' : 'bg-soft-blue'}`}>
        <div
          className={`p-9 md:p-24 lg:w-3/4 mx-auto`}
        >
          <h1
            className={`text-4xl md:text-6xl font-bold mb-8 md:mb-12`}
          >
            Bienvenido a
            <br/>
            <Image
              src={'/logo.svg'}
              alt={`Logo de la empresa.`}
              width={156.13 * 2.2}
              height={27.01 * 2.2}
              className={`mx-auto`}
            />
          </h1>

          {data && !data.pre_registration?.is_esim && (
            <>
              <h1
                className={`text-4xl md:text-6xl font-bold `}
              >
                Tu kit
              </h1>
              <p
                className={`text-xl md:text-xl mb-6 md:mb-10 lg:mb-14`}
              >
                de bienvenida está siendo
                <br/>
                procesado, llegará a tu domicilio
                <br/>
                de 6 a 9 días hábiles.
              </p>
              <Image
                src={`/img/box-icon.svg`}
                alt={`Icono de caja`}
                width={200}
                height={200}
                className={`mx-auto my-10`}
              />
              <p
                className={`text-xl md:text-xl mb-6 md:mb-10 lg:mb-14`}
              >
                Recibirás un correo de
                <br/>
                confirmación junto con tu guía
                <br/>
                de rastreo cuando esté listo.
              </p>
            </>
          )}

          {data && data.pre_registration?.is_esim && (
            <>
              <h1
                className={`text-4xl md:text-6xl font-bold `}
              >
                ¡Buenas noticias!
              </h1>
              <p
                className={`text-xl md:text-xl mb-6 md:mb-10 lg:mb-14`}
              >
                Tu eSIM está en camino y
                <br/>
                pronto llegará a tu correo.
              </p>
              <Image
                src={`/img/mail-send-icon.svg`}
                alt={`Icono de correo`}
                width={200}
                height={200}
                className={`mx-auto my-10`}
              />
              <p
                className={`text-xl md:text-xl mb-6 md:mb-10 lg:mb-14`}
              >
                No olvides revisar tanto tu
                <br/>
                bandeja de entrada como la de
                <br/>
                correos no deseados.
              </p>
            </>
          )}
        </div>
      </main>
      <Footer/>
    </div>
  );
}
