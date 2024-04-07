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
          <p
            className={`text-center text-3xl lg:text-3xl p-4 md:p-5 text-white ajuste_centro`}
          >
            Para poder continuar,
            <br />
            <span className="font-medium">no olvides aceptar</span> los Términos y Condiciones
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
    <section
      className={`bg-black py-4 sm:py-5 md:py-6 lg:py-7 xl:py-8`}
    >
      <div className={'mx-auto max-w-screen-xl grid grid-cols-12'}>
        <div className="hidden md:flex md:col-span-1 justify-center items-center">
          {/* PlusDecoration */}
          <PlusDecoration
            className="w-5 md:w-7 lg:w-9 xl:w-11 mx-auto"
          />
        </div>
        <div className="col-span-12 md:col-span-10 text-black">
          <div className={`p-6`}>
            <h3
              className={`text-white text-center font-medium text-3xl sm:text-5xl mb-1 sm:mb-3`}
            >
              Estás a un paso de descubrir
              <br />
              <span className={`text-highlight`}>más</span> conectividad y <span className={`text-highlight`}>más</span>
              <br />
              comunicación
            </h3>
            <div className={`text-right`}>
              {/* PlusDecoration */}
              <PlusDecoration
                className="ml-auto w-9 relative md:w-8 lg:w-12 xl:w-17"
                style={{ right: '5%', top: '10px' }}
              />
            </div>
            {/* terms and conditions */}
            <div
              className={`w-full md:w-3/4 mx-auto mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-14`}
            >
              <div className="flex items-center text-white mb-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="form-checkbox h-5 w-5 text-green-500"
                  name={'terms'}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="terms">
                  <span className={`ml-2 inline-block font-medium`}>Acepto Términos y Condiciones</span>
                </label>
              </div>

              <div className="flex items-center text-white">
                <input
                  type="checkbox"
                  id="confirmation"
                  className="form-checkbox h-5 w-5 text-green-500"
                  name={'confirmation'}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="confirmation" className="ml-2">
                  <span className={`ml-2 inline-block font-medium`}>Confirmo que toda la información proporcionada es correcta</span>
                </label>
              </div>

              <div className="button-container w-full md:w-2/4 mx-auto mt-10 md:mt-20">
                <button
                  className="button font-medium block w-full"
                  onClick={handleSubmit}
                >
                  Firmar contrato
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:flex md:col-span-1 justify-center items-center">
          {/* PlusDecoration */}
          <PlusDecoration
            className={'w-6 md:w-12 lg:w-16 xl:w-20 relative'}
            style={{ top: '-15%' }}
          />
        </div>
      </div>
    </section>
  );
}

export default SignContract;
