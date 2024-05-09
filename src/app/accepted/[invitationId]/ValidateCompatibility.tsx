import PlusDecoration from "@/components/PlusDecoration";
import ValidateStep from "@/components/ValidateStep";
import Image from "next/image";
import ValidateIMEIForm from "@/components/ValidateIMEIForm";
import ValidateCoverageForm from "@/components/ValidateCoverageForm";
import { ModalContext } from "@/contexts/ModalContext";
import React from "react";
import SliderMarketing from "@/components/SliderMarketing";

export default function ValidateCompatibility() {
  const { openModal } = React.useContext(ModalContext);

  // const showModalWithIMEIInfo = () => {
  //   openModal(
  //     <div>
  //       <p
  //         className={`text-center text-lg p-4 md:p-5`}
  //       >
  //         El <span className={`font-medium`}>IMEI</span> es un código de 15 dígitos
  //         <br />
  //         que identifica a tu dispositivo y lo diferencia de cualquier otro.
  //       </p>
  //     </div>,
  //   )
  // }

  const ctxModal = React.useContext(ModalContext);

  const HeaderMensaje = () => {
    return (
      <div className="font-medium text-center">
        {/* Tiendas <span className="text-highlight">Afiliadas</span> */}
      </div>
    )
  }
  const CuerpoMensaje = () => {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-black bg-modal-verde">
        <h2 className="text-center text-6xl lg:text-6xl p-4 md:p-5 text-white font-medium ajuste_centro">IMEI</h2>
        <p className="text-center text-2xl lg:text-xl p-4 md:p-5 text-white">
          Es un código de 15 dígitos que identifica a tu dispositivo y <br />lo  diferencia de cualquier otro
        </p>
      </div>
    )
  }

  const showModalWithIMEIInfo = () => {
    ctxModal.openModal(<CuerpoMensaje />, <HeaderMensaje />);
  }

  const showModalWithLiberateInfo = () => {
    openModal(
      <div className="flex flex-col items-center justify-center h-full bg-black bg-modal-verde">
        <p
          className={`text-center text-3xl lg:text-3xl p-4 md:p-5 text-white ajuste_centro`}
        >
          Haz <a href="https://www.inphonity.com/Faqs" className="text-highlight">clic aquí</a> para consultar <br />
          más información sobre los equipos <br />
          compatibles con nuestra red.
        </p>
      </div>,
    )
  }

  return (
    <>
      <section className="bg-white bg-contain bg_gracias_por_unirte">
        <header>
          <nav className="mx-auto pl-20 pt-9 flex justify-between items-center text-black">
            <div>
              <Image
                src="/Logo3.svg"
                alt="Logotipo de Inphonity"
                width={203}
                height={29.4}
                priority
              />
            </div>
            <div></div>
          </nav>
        </header>
        <div className="relative pt-[5.563rem]">
          <div className="grid grid-cols-10 gap-3">
            <div className="col-span-10 md:col-span-5 lg:col-span-6">
              <header className="text-center md:text-left relative">
                <div className="md:ml-10 lg:ml-14 xl:ml-20 relative">
                  <h2 className="text-black font-medium text-4xl lg:text-[3.125rem] leading-tight mb-5">
                    ¡Ya eres parte de<br />
                    <span className="text-custom-blue"> inphonity!</span>
                  </h2>
                  <p className="text-2xl lg:text-3xl text-black mt-10 px-1 xl:pr-[17rem] font-[15.625rem]">
                  ¿Qué sigue? Valida la compatibilidad <br/>de tu celular siguiendo estos pasos
                  </p>
                  <PlusDecoration
                    className="w-7 md:w-8 lg:w-12 xl:w-17 absolute"
                    style={{
                      bottom: '40%',
                      right: '10%'
                    }}
                  />
                </div>
                <picture>
                  <source width="600" media="(max-width: 600px)" srcSet="/img/validate-compatibility.png" />
                  <source width="1200" media="(min-width: 600px) and (max-width: 1200px)"
                    srcSet="/img/validate-compatibility.png" />
                  <source width="1800" media="(min-width: 1200px)"
                    srcSet="/img/validate-compatibility.png" />
                  <img width="1200" src="/img/validate-compatibility.png" alt="Valida compatibilidad" />
                </picture>
              </header>
            </div>
            <div className="col-span-10 md:col-span-5 lg:col-span-4">
              <PlusDecoration
                className="w-7 md:w-8 lg:w-12 xl:w-17 absolute"
                style={{
                  top: '0',
                  right: '10%'
                }}
              />
              <div className={'lg:px-6 xl:px-9'}>
                <ValidateStep
                  step={1}
                  title={'Obtén tu IMEI'}
                  className={'mb-6 md:mb-8 lg:mb-10 xl:mb-12'}
                  borderClass={'border-col-1'}
                >
                  <p className={'font-light mb-4 text-base md:text-xl xl:text-2xl text-black'}>
                    Conoce si tu teléfono es <strong className={'font-medium'}>compatible</strong> con <br></br><strong className={'font-medium'}>inphonity.</strong> Marca *#06# y recibe tu IMEI
                    {' '}
                    <Image
                      src={'/img/question-mark-icon.svg'}
                      alt={'¿Qué es IMEI?'}
                      width={25}
                      height={25}
                      className={'inline w-3 pointer'}
                      onClick={showModalWithIMEIInfo}
                    />
                  </p>
                  <ValidateIMEIForm />
                </ValidateStep>
                <ValidateStep
                  step={2}
                  title={'Valida nuestra cobertura'}
                  className={'mb-6 md:mb-8 lg:mb-10 xl:mb-12'}
                  borderClass={'border-col-2'}
                >
                  <p className={'text-black font-light mb-4 text-base md:text-xl xl:text-2xl'}>
                    Ingresa tu código postal y revisa la cobertura en tu zona
                  </p>
                  <ValidateCoverageForm />
                </ValidateStep>
                <ValidateStep
                  step={3}
                  title={'Ten tu equipo liberado'}
                  className={'mb-6 md:mb-8 lg:mb-10 xl:mb-12'}
                  borderClass={'border-col-3'}
                >
                  <p className={'font-light mb-4 text-base md:text-xl xl:text-2xl text-black'}>
                    Para poder adquirir un plan de inphonity,
                    tu teléfono debe estar liberado
                    {' '}
                    <Image
                      src={'/img/question-mark-icon.svg'}
                      alt={'¿Qué es liberar un teléfono?'}
                      width={25}
                      height={25}
                      className={'inline w-3 pointer'}
                      onClick={showModalWithLiberateInfo}
                    />
                  </p>
                </ValidateStep>
                <ValidateStep
                  step={4}
                  title={'Sé parte de inphonity'}
                  className={'mb-6 md:mb-8 lg:mb-10 xl:mb-12'}
                  borderClass={'border-col-4'}
                >
                  <p className={'font-light mb-4 text-base md:text-xl xl:text-2xl text-black'}>
                    ¡Estás muy cerca! Ahora selecciona tu plan
                  </p>
                </ValidateStep>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="w-full">
          <SliderMarketing />
        </div>
      </section>
    </>
  );
}
