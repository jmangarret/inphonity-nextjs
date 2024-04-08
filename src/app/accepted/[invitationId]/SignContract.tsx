"use client";
import React from "react";
import PlusDecoration from "@/components/PlusDecoration";
import { ModalContext } from "@/contexts/ModalContext";
import { useGetInvitationByIdQuery } from "@/lib/services/invitationsApi";
import { useRouter } from "next/navigation";

type SignContractProps = {
  invitationId: string;
};
const SignContract: React.FC<SignContractProps> = ({ invitationId }) => {
  const router = useRouter();
  const { isLoading: invitationIsLoading, isFetching: invitationIsFetching, data: invitationData, error: invitationError, refetch: invitationRefetch } = useGetInvitationByIdQuery(invitationId);
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
        <div className="flex flex-col items-center justify-center h-full bg-black bg-modal-verde text-white">
          <p className={`text-center text-3xl lg:text-3xl p-4 md:p-5 text-white ajuste_centro`}>
            Para poder continuar,
            <br />
            <span className="font-medium">no olvides aceptar </span> 
            <br />
            los Términos y Condiciones
            <br />
            y confirmar tu información.
          </p>
        </div>,
      );

      return;
    }

    if (invitationData && invitationData.pre_registration?.payment_status !== 'paid') {
      openModal(
        <div className="flex flex-col items-center justify-center h-full bg-black bg-modal-verde text-white">
          <p
            className={`text-center text-3xl lg:text-3xl p-4 md:p-5 text-white ajuste_centro`}
          >
            Para poder continuar, no
            <br />
            olvides realizar tu pago.
          </p>
        </div>,
      );

      return;
    }

    // redirect to sign contract sign/{invitationId}
    router.push(`/sign/${invitationId}`);
  }

  return (
    <section className="p-3 md:p-6 lg:p-9 xl:p-12 mb-3 md:mb-6 lg:mb-9 xl:mb-12">
      <header className="px-24">
        <h3 className={'font-medium text-white text-center text-3xl sm:text-5xl mb-3'}>
          Estas a un paso de descubrir más <span className="text-highlight">conectividad </span>
          y más <span className="text-highlight">comunicación</span>
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
