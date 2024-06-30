"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useGetInvitationByIdQuery } from "@/lib/services/invitationsApi";
import React, { useEffect } from "react";
import { ModalContext } from "@/contexts/ModalContext";
import Image from "next/image";
import { request } from "@/mocks/request-data";
import PlusDecoration from "@/components/PlusDecoration";
import FloatingDecoration from "@/components/FloatingDecoration";
import { useRouter } from "next/navigation";

export default function Sign({ params }: { params: { invitationId: string } }) {
  const router = useRouter();

  const invitationIdDecoded = atob(params.invitationId.replace("%3D", "="));
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const [isTermsAccepted, setIsTermsAccepted] = React.useState(false);
  const [isSigned, setIsSigned] = React.useState(false);

  // const {
  //   isLoading: invitationIsLoading,
  //   isFetching: invitationIsFetching,
  //   data: invitationData,
  //   error: invitationError,
  //   refetch: invitationRefetch
  // } = useGetInvitationByIdQuery(invitationIdDecoded);

  const { isLoading: invitationIsLoading, isFetching: invitationIsFetching, data: invitationData, error: invitationError, refetch: invitationRefetch } = request;
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  const [passwordStrength, setPasswordStrength] = React.useState('débil');
  
  const { openModal } = React.useContext(ModalContext);

  useEffect(() => {
    if (invitationError && 'status' in invitationError && invitationError.status === 404) {
      router.push('/');
    }
  }, [invitationError, router]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'terms') {
      setIsTermsAccepted(e.target.checked);
    }
  }

  const handleSign = () => {
    if (!isTermsAccepted) {
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

    router.push(`/sign/${params.invitationId}/form`);

  }

  return (
    <div>
      {/* <Header centerLogo={true}  /> */}
      <main className={`text-center bg-white text-black`} style={{ height: 'auto' }}>
        <FloatingDecoration
          className={`w-24 md:w-40 lg:w-48 absolute top-[0%] right-[0%]`}
          img="/img/sign-eclipse-green-1.svg"
        />
        <div className={`p-9 lg:w-3/4 mx-auto`}>
          <Image
            src="/Logo3.svg"
            alt="Logotipo de Inphonity"
            width={203}
            height={29.4}
            priority
            className={`mx-auto`}
          />
        </div>
        <div className={`container p-3 md:p-6 lg:p-12 py-3 mx-auto md:w-3/4 lg:w-4/5`}>
          {!isSigned && (
            <>
              <h1 className={`text-3xl md:text-5xl font-bold font-medium mb-3 md:mb-5 lg:mb-7 text-center`}>
                <span className="text-highlight">Contrato </span> socio inphonity
              </h1>
              <p className={`text-light text-lg md:text-xl mb-6 md:mb-10 lg:mb-14`}>
                Antes de comenzar, es
                <span className="font-medium"> necesario firmar los contratos </span>
                donde se especifican
                los Términos y Condiciones de uso.
              </p>

              <iframe
                src={`${apiURL}/file/contract.pdf`}
                className={`w-full`}
                style={{ height: '70vh' }}
              />

              <div className={`w-full md:w-3/4 mx-auto mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-14`}>
                <div className="flex justify-center text-black mb-8 md:mb-12 lg:mb-14">
                  <input
                    type="checkbox"
                    id="terms"
                    className="form-checkbox green-check h-5 w-5 text-green-500 black"
                    name={'terms'}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="terms">
                    <span className={`ml-2 inline-block font-medium`}>
                      Acepto los Términos y Condiciones
                    </span>
                  </label>
                </div>

                <div className="flex items-center text-black pb-14 justify-center">
                  <button
                    className="btn-xl multi-border bg-black text-white font-medium disabled:opacity-50"
                    onClick={handleSign}
                  >
                    FIRMAR CONTRATO
                  </button>
                </div>
              </div>

            </>
          )}

          <FloatingDecoration
            className={`w-12 md:w-24 lg:w-32 absolute bottom-[-20%] md:bottom-[-15%] lg:bottom-[-25%] left-[0%]`}
            img="/img/sign-eclipse-green-2.svg"
          />

          <FloatingDecoration
            className={`w-12 md:w-32 lg:w-48 absolute bottom-[-20%] md:bottom-[-16%] lg:bottom-[-30%] right-[5%] md:right-[3%]`}
            img="/img/sign-eclipse-green-3.svg"
          />

          <PlusDecoration
            className="hidden md:block w-8 absolute bottom-[30%] left-[5%]"
            isGreen={true}
          />

          <FloatingDecoration
            className={`w-4 md:w-6 lg:w-8 absolute bottom-[-19%] md:bottom-[-15%] lg:bottom-[-30%] right-[23%] md:right-[22%] lg:right-[25%]`}
            img="/img/blue-plus.svg"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
