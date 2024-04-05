"use client";

import React from "react";
import Payment from "@/components/Payment";
import { ModalContext } from "@/contexts/ModalContext";
import Image from "next/image";
// import PlusDecoration from "@/components/PlusDecoration";

export default function PaymentsSection() {
  const ctxModal = React.useContext(ModalContext);

  const HeaderTiendasAfiliadas = () =>{
    return (
      <div className="font-medium text-center">
        Tiendas <span className="text-highlight">Afiliadas</span>
      </div>
    )
  }
  const ContenTiendasAfiliadas = () => {
    return (
      <div className="bg-black bg-luces">
        <Image
          src="/img/tiendas-afiliadas.png"
          alt="Tiendas Afiliadas"
          width={354}
          height={1570}
        />
      </div>
    )
  }

  const handleInfo = ()=>{
    ctxModal.openModal(<ContenTiendasAfiliadas />,<HeaderTiendasAfiliadas />);
  }

  return (
    <section className="container mx-auto mb-10 md:mb-16 lg:mb-20 xl:mb-24">
      <div className="grid grid-cols-10 md:mb-5 lg:mb-10 xl:mb-15">
        <div className="col-span-1">
          {/* <PlusDecoration
            className="my-3 lg:my-4 w-3 sm:w-6 md:w-8 lg:w-10 xl:w-12 mx-auto"
          /> */}
        </div>
        <div className="col-span-8">
          <h2 className="font-medium text-2xl lg:text-3xl xl:text-5xl text-center">
            Métodos de
            <span className="text-highlight"> pago</span>
          </h2>
        </div>
        <div className="col-span-1">
          {/* <PlusDecoration
            className="relative my-6 md:my-9 lg:my-12 left-1/3 w-6 sm:w-8 md:w-10 lg:w-12 xl:w-14"
          /> */}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          className="p-9"
        >
          <Payment
            title="Pago con tarjeta"
            description="Realiza tus pagos vía online con tu tarjeta de crédito o débito"
            image="/img/tarjeta-icon.svg"
          />
        </div>
        <div
          className="p-9"
        >
          <Payment
            title="Pago con efectivo"
            description="Conoce nuestros establecimientos afiliados en donde puedes pagar tu plan en efectivo "
            image="/img/efectivo-icon.svg"
            action={<button onClick={handleInfo}> 
              <Image
                src="/img/info-ico.svg"
                alt="info check"
                width={20}
                height={20}
                className="inline"
              />
            </button>}
          />
        </div>
        <div
          className="p-9"
        >
          <Payment
            title="Pago transferencia"
            description="Realiza una transferencia interbancaria (SPEI)"
            image="/img/transferencia-icon.svg"
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
