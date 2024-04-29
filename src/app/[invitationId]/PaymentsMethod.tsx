"use client";

import React from "react";
import Payment from "@/components/Payment";
import { ModalContext } from "@/contexts/ModalContext";
import Image from "next/image";
import { ContenTiendasAfiliadas, HeaderTiendasAfiliadas } from "@/components/ModalPayments";
// import PlusDecoration from "@/components/PlusDecoration";

export default function PaymentsSection() {
  const ctxModal = React.useContext(ModalContext);



  const handleInfo = () => {
    ctxModal.openModal(<ContenTiendasAfiliadas />, <HeaderTiendasAfiliadas />);
  }

  return (
    <section className="mx-auto mb-10 bg-custom-green">
      <div className="grid grid-cols-10 md:mb-5 lg:mb-10 xl:mb-15">
        <div className="col-span-1">
          {/* <PlusDecoration
            className="my-3 lg:my-4 w-3 sm:w-6 md:w-8 lg:w-10 xl:w-12 mx-auto"
          /> */}
        </div>
        <div className="col-span-8">
          <h2 className="font-medium text-3xl xl:text-5xl text-center mt-10">
            Métodos de pago
          </h2>
          <h5 className="text-3xl text-center font-light py-6">
            <b>Contamos con diferentes opciones</b> para que escojas la que más se adapte a ti
          </h5>
        </div>
        <div className="col-span-12">
          <p className="text-xl lg:text-2xl text-center mt-5 mx-5"> <span className="font-medium">Contamos con diferentes opciones </span> para que escojas la que más se adapte a ti </p>
        </div>
        <div className="col-span-1">
          {/* <PlusDecoration
            className="relative my-6 md:my-9 lg:my-12 left-1/3 w-6 sm:w-8 md:w-10 lg:w-12 xl:w-14"
          /> */}
        </div>
      </div>
      <div className="flex justify-center md:justify-between flex-wrap p-5 lg:p-24">
        <div className="mx-10 my-5 sm:mx-5">
          <Payment
            title="Con tarjeta"
            description="Realiza tus pagos vía online con tu tarjeta de crédito o débito"
            image="/img/tarjeta-icon2.svg"
          />
        </div>
        <div className="mx-10 my-5 sm:mx-5">
          <Payment
            title="Con efectivo"
            description="Conoce nuestros establecimientos afiliados en donde puedes pagar tu plan en efectivo "
            image="/img/efectivo-icon2.svg"
            action={<button onClick={handleInfo}>
              <Image
                src="/img/info-icon.svg"
                alt="info check"
                width={20}
                height={20}
                className="inline"
              />
            </button>}
          />
        </div>
        <div className="mx-10 my-5 sm:mx-5">
          <Payment
            title="Con transferencia"
            description="Realiza una transferencia interbancaria (SPEI)"
            image="/img/transferencia-icon2.svg"
          />
        </div>
      </div>
      <div className="grid grid-cols-10 md:mb-10 lg:mb-15 xl:mb-20">
        <div className="col-span-2">
        </div>
        <div className="col-span-6">
        </div>
        <div className="col-span-2">
          {/* <PlusDecoration
            className="my-5 lg:my-10 lg:my-4 w-3 sm:w-6 md:w-8 lg:w-10 xl:w-12 ml-auto mr-6 md:mr-0"
          /> */}
        </div>
      </div>
    </section>
  );
}
