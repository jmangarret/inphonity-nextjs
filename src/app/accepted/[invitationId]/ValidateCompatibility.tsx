import PlusDecoration from "@/components/PlusDecoration";
import ValidateStep from "@/components/ValidateStep";
import Image from "next/image";
import ValidateIMEIForm from "@/components/ValidateIMEIForm";
import ValidateCoverageForm from "@/components/ValidateCoverageForm";
import {ModalContext} from "@/contexts/ModalContext";
import React from "react";

export default function ValidateCompatibility() {
  const {openModal} = React.useContext(ModalContext);

  const showModalWithIMEIInfo = () => {
    openModal(
      <div>
        <p
          className={`text-center text-lg p-4 md:p-5`}
        >
          El <span className={`font-medium`}>IMEI</span> es un código de 15 dígitos
          <br/>
          que identifica a tu dispositivo y lo diferencia de cualquier otro.
        </p>
      </div>,
    )
  }

  const showModalWithLiberateInfo = () => {
    openModal(
      <div>
        <p
          className={`text-center text-lg p-4 md:p-5`}
        >
          Si tienes un plan tarifario o plan
          <br/>
          con equipo, es posible que tu
          <br/>
          dispositivo <span className={`font-medium`}>no esté liberado</span> (consulta
          <br/>con tu compañía).
          <br/>
          <br/>
          Si está liberado, sigue al paso 4.
        </p>
      </div>,
    )
  }

  return (
    <>
      <section className="relative py-9 md:py-14 xl:py-16 bg-horizontal-gradient">
        <div className="grid grid-cols-10 gap-3">
          <div className="col-span-10 md:col-span-5 lg:col-span-6">
            <header className="text-center md:text-left relative">
              <div className="md:ml-10 lg:ml-14 xl:ml-20 relative">
                <h2 className="font-medium text-6xl lg:text-7xl xl:text-9xl">
                  Valida
                </h2>
                <p className="text-3xl lg:text-4xl xl:text-6xl font-medium">compatibilidad:</p>
                <PlusDecoration
                  className="w-7 md:w-8 lg:w-12 xl:w-17 absolute"
                  style={{
                    bottom: '40%',
                    right: '10%'
                  }}
                />
              </div>
              <picture>
                <source width="600" media="(max-width: 600px)" srcSet="/img/validate-compatibility-600x575.webp"/>
                <source width="1200" media="(min-width: 600px) and (max-width: 1200px)"
                        srcSet="/img/validate-compatibility-1200x1150.webp"/>
                <source width="1800" media="(min-width: 1200px)"
                        srcSet="/img/validate-compatibility-1800x1725.webp"/>
                <img width="1200" src="/img/validate-compatibility-1200x1150.webp" alt="Valida compatibilidad"/>
              </picture>
              <PlusDecoration
                className="w-10 md:w-11 lg:w-15 xl:w-20 absolute"
                style={{
                  bottom: '25%',
                  left: '10px'
                }}
              />
            </header>
          </div>
          <div className="col-span-10 md:col-span-5 lg:col-span-4 relative">
            <PlusDecoration
              className="w-7 md:w-8 lg:w-12 xl:w-17 absolute"
              style={{
                top: '0',
                right: '10%'
              }}
            />
            <div className={'lg:p-6 xl:p-9'}>
              <ValidateStep
                step={1}
                title={'OBTÉN TU IMEI'}
                className={'mb-6 md:mb-8 lg:mb-10 xl:mb-12'}
              >
                <p className={'font-light mb-4 text-base md:text-xl xl:text-2xl'}>
                  Conoce si tu teléfono es compatible con <strong className={'font-medium'}>inphonity.</strong> Marca *#06# y recibe tu IMEI
                  {' '}
                  <Image
                    src={'/img/question-mark-icon.svg'}
                    alt={'¿Qué es IMEI?'}
                    width={25}
                    height={25}
                    className={'inline w-3'}
                    onClick={showModalWithIMEIInfo}
                  />
                </p>
                <ValidateIMEIForm />
              </ValidateStep>
              <ValidateStep
                step={2}
                title={'VALIDA COBERTURA'}
                className={'mb-6 md:mb-8 lg:mb-10 xl:mb-12'}
              >
                <p className={'font-light mb-4 text-base md:text-xl xl:text-2xl'}>
                  Ingresa tu <strong className={'font-medium'}>código postal</strong> y revisa la <strong className={'font-medium'}>cobertura</strong>
                  en tu zona
                </p>
                <ValidateCoverageForm />
              </ValidateStep>
              <ValidateStep
                step={3}
                title={'TENER TU EQUIPO LIBERADO'}
                className={'mb-6 md:mb-8 lg:mb-10 xl:mb-12'}
              >
                <p className={'font-light mb-4 text-base md:text-xl xl:text-2xl'}>
                  Para poder adquirir un plan de inphonity,
                  tu teléfono debe estar liberado
                  {' '}
                  <Image
                    src={'/img/question-mark-icon.svg'}
                    alt={'¿Qué es liberar un teléfono?'}
                    width={25}
                    height={25}
                    className={'inline w-3'}
                    onClick={showModalWithLiberateInfo}
                  />
                </p>
              </ValidateStep>
              <ValidateStep
                step={4}
                title={'LISTO'}
                className={'mb-6 md:mb-8 lg:mb-10 xl:mb-12'}
              >
                <p className={'font-light mb-4 text-base md:text-xl xl:text-2xl'}>
                  Ya eres parte de inphonity, el siguiente paso es seleccionar tu plan
                </p>
              </ValidateStep>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
