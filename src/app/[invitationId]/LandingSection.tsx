"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PlusDecoration from "@/components/PlusDecoration";
import { useGetInvitationByIdQuery } from "@/lib/services/invitationsApi";
import { request } from "@/mocks/request-data";

type LandingSectionProps = {
  invitationId: string;
};


const LandingSection: React.FC<LandingSectionProps> = ({ invitationId }) => {
  //TODO descomentar request
  const { isLoading, isFetching, data, error } = useGetInvitationByIdQuery(invitationId);
  // const { isLoading, isFetching, data, error } = request;
  const router = useRouter();

  useEffect(() => {
    if (error && 'status' in error && error.status === 404) {
      router.push('/404');
    }
  }, [error, router]);

  // handle redirect if invitation status is not pending
  useEffect(() => {
    if (!isLoading && !isFetching && data && data.status === 'accepted') {
      router.push('/complete');
    }
    // rejected
    if (!isLoading && !isFetching && data && data.status === 'rejected') {
      router.push('/rejected');
    }
    // cancelled or check expiration time
    if (!isLoading && !isFetching && data && (data.status === 'cancelled' || new Date(data.expires_at) < new Date())) {
      router.push('/canceled');
    }
  }, [data, isFetching, isLoading, router]);

  return (
    <section className="bg-section-1">
      <header className="pt-10 ml-10 sm:ml-24">
        <nav className={`container py-9 flex justify-between items-center`}>
          <div>
            <Image
              src="/logo.svg"
              alt="Logotipo de Inphonity"
              width={203}
              height={29.4}
              priority
            />
          </div>
          <div></div>
        </nav>
      </header>
      <div className="mx-10 sm:ml-24 mt-7">

        {/* <PlusDecoration 
        isGreen={true}
        style={{left: "90%"}}
        // className="relative my-5 left w-5 sm:w-8 md:w-11 lg:w-14 xl:w-17"
        className="relative my-5 w-5 sm:w-8 md:w-7 lg:w-7 xl:w-7"
      /> */}
        <div
          className="sm:flex"
        >
          <div
            className="sm:w-1/2"
          >
            <h1
              className={`font-medium text-5xl md:text-7xl lg:text-8xl`}
            >
              {isLoading || isFetching ? (
                <div
                  className="font-medium text-6xl sm:text-7xl lg:text-8xl xl:text-9xl bg-gray-300 animate-pulse h-6 sm:h-7 md:h-8 lg:h-9 xl:h-10 mb-3 w-3/4 inline-block"
                  style={{ verticalAlign: "middle" }}
                ></div>
              ) : (
                data && (
                  <>
                    {data.client.user.first_name}
                    {' '}
                    {data.client.user.last_name}
                    {' '}
                    <span className={`inline-block`}>
                      {data.client.user.mother_last_name}
                      <Image
                        src="/img/badge-check.svg"
                        alt="Badge check"
                        width={25}
                        height={25}
                        className="inline mb-3 w-6 sm:w-8 md:w-10 sm:mb-5 md:mb-7 ml-2"
                      />
                    </span>
                  </>
                )
              )}
            </h1>
            <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl my-10">
              {isLoading || isFetching ? (
                <span
                  className="font-medium text-2xl sm:text-3xl lg:text-5xl xl:text-8xl bg-gray-300 animate-pulse h-5 sm:h-6 md:h-7 ld:h-8 xl:h-9 mb-3 w-3/4 inline-block"
                  style={{ verticalAlign: "middle" }}
                ></span>
              ) : (
                <>
                  <p>Te está invitando <br /> a ser parte de su</p>
                </>
              )}
            </div>
            <picture>
              {/* <source width="150" media="(max-width: 600px)" srcSet="/img/circulo-inphonity-300x142.webp"/>
            <source width="300" media="(min-width: 600px) and (max-width: 1200px)"
                    srcSet="/img/circulo-inphonity-600x283.webp"/>
                  <source width="600" media="(min-width: 1200px)" srcSet="/img/circulo-inphonity-900x425.webp"/> */}
              <img src="/img/circulo.svg" alt="Círculo Inphonity" />
            </picture>
          </div>
          <div className="bg-luces3"></div>

          <div
            className="sm:w-1/2 py-5 text-right"
          >
            <div className="flex justify-start md:justify-end">
              <picture>
                <source width="300" media="(max-width: 600px)" srcSet="/img/img_header_600px.webp" />
                <source width="600" media="(min-width: 600px) and (max-width: 1200px)" srcSet="/img/img_header_1200px.webp" />
                <source width="800" media="(min-width: 1200px)" srcSet="/img/img_header_1800px.webp" />
                <img src="/img/bienvenido600px.png" alt="Bienvenido a Inphonity" />
              </picture>
            </div>
          </div>
        </div>
        <div className="sm:flex">
          <div className="my-20 sm:my-20 md:my-20 lg:my-20">
            <h2 className="w-full sm:w-3/5 font-medium text-2xl sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl mb-4 sm:mb-4 lg:mb-4">
              ¿Qué es <span className="text-highlight">Círculo inphonity?</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-xl lg:text-xl xl:text-xl text-justify">
              Al hacerte cliente de inphonity no solo te conectas con el mundo, <span className="font-medium ">¡también te recompensamos por ello!</span> ¿Cómo lo hacemos?
              Te damos un bono único por cada amigo que se une a tu Círculo inphonity y eso no es todo, recibes del <span className="font-medium text-highlight"> 1 al 5% de cashback mensual</span>,
              cada vez que los miembros de tu Círculo pagan su plan. Esto no termina aqui…
            </p>
          </div>
        </div>
        {/* <div className="relative mt-3 h-10 lg:h-20">
        <PlusDecoration
        style={{left: "15%"}}
        className="absolute my-3 w-6 sm:w-9 md:w-12 lg:w-15 xl:w-18"
        />
        <PlusDecoration
        style={{right: "10%"}}
        className="absolute my-3 w-8 sm:w-11 md:w-14 lg:w-17 xl:w-20"
        />
      </div> */}
      </div>
    </section>
  );
}

export default LandingSection;