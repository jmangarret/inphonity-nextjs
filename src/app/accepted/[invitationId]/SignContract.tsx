"use client";
import React from "react";
import PlusDecoration from "@/components/PlusDecoration";
import { ModalContext } from "@/contexts/ModalContext";
import { useGetInvitationByIdQuery } from "@/lib/services/invitationsApi";
import { useRouter } from "next/navigation";
import { request } from "@/mocks/request-data";
import FloatingDecoration from "@/components/FloatingDecoration";

type SignContractProps = {
  invitationId: string;
  invitationIdDecoded: string;
};
const SignContract: React.FC<SignContractProps> = ({ invitationId, invitationIdDecoded }) => {
  const router = useRouter();
  const { isLoading: invitationIsLoading, isFetching: invitationIsFetching, data: invitationData, error: invitationError, refetch: invitationRefetch } = useGetInvitationByIdQuery(invitationIdDecoded);
  // const { isLoading: invitationIsLoading, isFetching: invitationIsFetching, data: invitationData, error: invitationError, refetch: invitationRefetch } = request;
  const [isTermsAccepted, setIsTermsAccepted] = React.useState(false);
  const [isConfirmationAccepted, setIsConfirmationAccepted] = React.useState(false);
  const { openModal } = React.useContext(ModalContext);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'terms') {
      setIsTermsAccepted(e.target.checked);
    } else if (e.target.id === 'confirmation') {
      setIsConfirmationAccepted(e.target.checked);
    }
  }

  const handleSubmit = () => {
    if (!isTermsAccepted && !isConfirmationAccepted) {
      openModal(
        <div className="bg-white">
          <FloatingDecoration
            className={`w-24 md:w-32 absolute top-[0%] left-[0%]`}
            img="/img/modal-eclipse-green-1.svg"
            customClass="rounded-tl-2xl"
          />

          <PlusDecoration
            className="w-4 md:w-6 absolute top-[30%] md:top-[42%] right-[5%]"
            isGreen={true}
          />

          <div className="flex flex-col items-center justify-center h-[470px] w-auto md:w-[500px]">
            <p className={`text-center text-xl p-4 text-black ajuste_centro`}>
              Para poder continuar,
              <br />
              <span className="font-medium">no olvides aceptar </span>
              <br />
              los Términos y Condiciones
              <br />
              y confirmar tu información.
            </p>
          </div>

          <FloatingDecoration
            className={`w-8 md:w-12 absolute bottom-[15%] left-[10%]`}
            img="/img/orange-plus.svg"
          />

          <FloatingDecoration
            className={`w-24 md:w-32 absolute bottom-[0%] right-[0%]`}
            img="/img/modal-eclipse-green-2.svg"
            customClass="rounded-br-2xl"
          />
        </div>,
      );

      return;
    }

    if (invitationData && invitationData.pre_registration?.payment_status !== 'paid') {
      openModal(
        <div className="bg-white">
          <FloatingDecoration
            className={`w-24 md:w-32 absolute top-[0%] left-[0%]`}
            img="/img/modal-eclipse-green-1.svg"
            customClass="rounded-tl-2xl"
          />

          <PlusDecoration
            className="w-4 md:w-6 absolute top-[30%] md:top-[42%] right-[5%]"
            isGreen={true}
          />

          <div className="flex flex-col items-center justify-center h-[470px] w-auto md:w-[500px]">
            <p
              className={`text-center text-xl p-4 text-black ajuste_centro`}
            >
              Para poder continuar, no
              <br />
              olvides realizar tu pago.
            </p>
          </div>

          <FloatingDecoration
            className={`w-8 md:w-12 absolute bottom-[15%] left-[10%]`}
            img="/img/orange-plus.svg"
          />

          <FloatingDecoration
            className={`w-24 md:w-32 absolute bottom-[0%] right-[0%]`}
            img="/img/modal-eclipse-green-2.svg"
            customClass="rounded-br-2xl"
          />
        </div>,
      );

      return;
    }

    router.push(`/sign/${invitationId}`);
  }

  return (
    <section className="p-3 md:p-6 lg:p-9 xl:p-12 mb-3 md:mb-6 lg:mb-9 xl:mb-12">
      <header className="px-24">
        <h3 className={'font-medium text-white text-center text-3xl sm:text-5xl mb-3'}>
          Estas a un paso de descubrir más <span className="text-highlight">conectividad </span>
          y más <span className="text-highlight">conexión</span>
        </h3>

        <p className={'text-base text-white text-center px-16 my-10'}>
          <input
            type="checkbox"
            id={'confirmation'}
            className="form-checkbox green-check h-5 w-5 text-green-500"
            name={'confirmation'}
            onChange={handleCheckboxChange}
          />
          <label htmlFor={'confirmation'}>
            &nbsp; Confirmo que toda la información proporcionada es correcta
          </label>
        </p>
        <p className={'text-base text-white text-center px-16 my-10'}>
          <input
            type="checkbox"
            id={'public'}
            className="form-checkbox green-check h-5 w-5 text-green-500"
            name={'public'}
            onChange={handleCheckboxChange}
          />
          <label htmlFor={'public'}>
            &nbsp; Acepto recibir notificaciones, promociones y actualizaciones sobre los beneficios de inphonity
          </label>
        </p>
      </header>

      <div className="my-10">
        <div className="flex flex-col">
          <div className="flex justify-center">
            <div className="button-container ">
              <button
                className="btn-xl multi-border font-medium text-white disabled:opacity-50"
                onClick={handleSubmit}
              >
                FIRMAR CONTRATO
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignContract;
