"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useGetInvitationByIdQuery } from "@/lib/services/invitationsApi";
import React, { useEffect } from "react";
import { ModalContext } from "@/contexts/ModalContext";
import { useSignatureMutation } from "@/lib/services/registersApi";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Sign({ params }: { params: { invitationId: string } }) {
  const router = useRouter();
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const [isTermsAccepted, setIsTermsAccepted] = React.useState(false);
  const [signature, { isLoading, error }] = useSignatureMutation();
  const [isSigned, setIsSigned] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  const [passwordStrength, setPasswordStrength] = React.useState('débil');
  const {
    isLoading: invitationIsLoading,
    isFetching: invitationIsFetching,
    data: invitationData,
    error: invitationError,
    refetch: invitationRefetch
  } = useGetInvitationByIdQuery(params.invitationId);
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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword.length < 8) {
      setPasswordStrength('débil');
    } else if (!newPassword.match(/[A-Z]/)) {
      setPasswordStrength('débil');
    } else if (!newPassword.match(/[0-9]/)) {
      setPasswordStrength('regular');
    } else if (!newPassword.match(/[^A-Za-z0-9]/)) {
      setPasswordStrength('regular');
    } else {
      setPasswordStrength('fuerte');
    }
  };

  const handleSign = () => {
    if (!isTermsAccepted) {
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

    setIsSigned(true);
  }

  const handleSubmit = () => {
    if (password !== passwordConfirmation) {
      openModal(
        <div className="flex flex-col items-center justify-center h-full text-white">
            <p className={`text-center text-3xl lg:text-3xl p-4 md:p-5 text-white ajuste_centro`}>
            Las contraseñas no coinciden.
          </p>
        </div>,
      );

      return;
    }

    if (password.length < 8) {
      openModal(
        <div className="flex flex-col items-center justify-center h-full text-white">
          <p className={`text-center text-3xl lg:text-3xl p-4 md:p-5 text-white ajuste_centro`}>
            La contraseña debe tener al menos 8 caracteres.
          </p>
        </div>,
      );

      return;
    }

    if (!password.match(/[A-Z]/)) {
      openModal(
        <div className="flex flex-col items-center justify-center h-full text-white">
            <p className={`text-center text-3xl lg:text-3xl p-4 md:p-5 text-white ajuste_centro`}>
            La contraseña debe tener al menos una mayúscula.
          </p>
        </div>,
      );

      return;
    }

    if (!password.match(/[0-9]/)) {
      openModal(
        <div className="flex flex-col items-center justify-center h-full text-white">
            <p className={`text-center text-3xl lg:text-3xl p-4 md:p-5 text-white ajuste_centro`}>
            La contraseña debe tener al menos un número.
          </p>
        </div>,
      );

      return;
    }

    if (!password.match(/[^A-Za-z0-9]/)) {
      openModal(
        <div className="flex flex-col items-center justify-center h-full text-white">
          <p className={`text-center text-3xl lg:text-3xl p-4 md:p-5 text-white ajuste_centro`}>
            La contraseña debe tener al menos un carácter especial.
          </p>
        </div>,
      );

      return;
    }

    signature({
      invitation_id: parseInt(params.invitationId),
      new_password: password,
      new_password_confirmation: passwordConfirmation,
    })
      .unwrap()
      .then(() => {
        // Redirect to inphonity.com
        router.push(`/welcome/${params.invitationId}`);
      })
      .catch((response) => {
        if (response.data && response.data.message && response.data.message === 'Ya has firmado el contrato.') {
          router.push(`/welcome/${params.invitationId}`);

          return;

        }

        openModal(
          <div className="flex flex-col items-center justify-center h-full text-white">
            <p className={`text-center text-3xl lg:text-3xl p-4 md:p-5 text-white ajuste_centro`}>
              Ocurrió un error al firmar el contrato.
            </p>
          </div>,
        );
      });
  }

  return (
    <>
      <Header />
      <main className={`text-white w-full`}>
        <div className={`container p-3 md:p-6 lg:p-12 py-10 md:py-16 lg:py-20 mx-auto md:w-3/4 lg:w-4/5`}>
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
                    <span className={`ml-2 inline-block font-medium text-white`}>
                      Acepto los Términos y Condiciones
                    </span>
                  </label>
                </div>

                <div className="flex items-center text-black mb-2 justify-center">
                  <button
                    className="btn-xl multi-border text-white disabled:opacity-50"
                    onClick={handleSign}
                  >
                    FIRMAR CONTRATO
                  </button>
                </div>
              </div>
            </>
          )}
          {isSigned && (
            <>
              <h1
                className={`text-3xl md:text-5xl font-bold font-medium mb-2 md:mb-3 lg:mb-4 text-black text-center`}
              >
                Crea una contraseña,
              </h1>
              <p className={`text-light text-lg md:text-xl mb-6 md:mb-10 lg:mb-14 text-center`}>
                la necesitarás para ingresar a la aplicación de inphonity
              </p>
              <p className={`text-light text-base md:text-lg mb-6 md:mb-10 lg:mb-14 text-center`}>
                <strong className={`text-medium`}>Importante:</strong>
                <br />
                Tu contraseña debe tener al menos 8 caracteres, ser alfanumérica, incluir una mayúscula y un carácter
                especial
              </p>

              <div
                className={`w-full md:w-3/4 mx-auto mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-14`}
              >
                <div className="flex items-center text-black mb-6 md:mb-8 lg:mb-10">
                  <input
                    type="password"
                    id="password"
                    className="input input-border-gray form-input h-12 w-full"
                    name={'password'}
                    placeholder={'Contraseña'}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="flex items-center text-black mb-6 md:mb-8 lg:mb-10">
                  <input
                    type="password"
                    id="passwordConfirmation"
                    className="input input-border-gray h-12 w-full"
                    name={'passwordConfirmation'}
                    placeholder={'Confirmar contraseña'}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                  />
                </div>

                <div className="flex items-center text-black mb-6 md:mb-8 lg:mb-10">
                  <PasswordStrengthBar strength={passwordStrength} />
                </div>
                <div className="flex items-center text-black mb-2 justify-center">
                  {/* submit button red color with text white  */}
                  <button
                    className="bg-red-500 text-white rounded-full py-2 px-16 text-medium disabled:opacity-50"
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}


type PasswordStrengthBarProps = {
  strength: string;
};

const PasswordStrengthBar: React.FC<PasswordStrengthBarProps> = ({ strength }) => {
  let color;
  let position;

  switch (strength) {
    case 'débil':
      color = '#F50D0D';
      position = '0%';
      break;
    case 'regular':
      color = '#FFE174';
      position = 'calc(50% - 20px)';
      break;
    case 'fuerte':
      color = '#00BF63';
      position = 'calc(100% - 40px)';
      break;
  }

  return (
    <div
      style={{ height: '20px', width: '100%', backgroundColor: '#ddd' }}
      className={`relative rounded-full`}
    >
      <div
        className={`relative rounded-full`}
        style={{ height: '100%', width: '100%', backgroundColor: color }}
      />
      <Image
        src={`/img/password-strength.svg`}
        alt="Password Strength"
        width={40}
        height={40}
        style={{ position: 'absolute', left: position, top: '-10px' }}
      />
    </div>
  );
};
