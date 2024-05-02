import React from "react";
import { ModalContext } from "@/contexts/ModalContext";
import { useLazyValidateImeiQuery, useValidateImeiQuery } from "@/lib/services/validateCompatibilityApi";
import PlusDecoration from "@/components/PlusDecoration";
import Image from "next/image";
import { setSupportEsim } from "@/lib/features/plan/planSlice";
import { useAppDispatch } from "@/lib/hooks";


type ValidateIMEIFormProps = {
  style?: React.CSSProperties;
  className?: string;
};

function isValidIMEI(imei: string): boolean {
  // Check length
  if (imei.length !== 15) {
    return false;
  }

  // Check for non-digits
  if (!/^\d+$/.test(imei)) {
    return false;
  }

  // Perform Luhn check
  let sum = 0;
  for (let i = 0; i < imei.length; i++) {
    let digit = parseInt(imei[i]);

    if (i % 2 !== 0) {
      digit *= 2;
      if (digit > 9) {
        digit = digit - 9;
      }
    }

    sum += digit;
  }

  return sum % 10 === 0;
}

const ValidateIMEIForm: React.FC<ValidateIMEIFormProps> = ({ className, style }) => {
  const { openModal } = React.useContext(ModalContext);
  const dispatch = useAppDispatch();
  const [imei, setImei] = React.useState<string>('');
  const [trigger, { data, isLoading, error, isFetching }] = useLazyValidateImeiQuery();

  const handleSubmit = async () => {
    // Validate IMEI
    if (!isValidIMEI(imei)) {
      openModal(
        <div className="flex flex-col items-center justify-center h-full">
          <h2
            className={`text-center text-2xl lg:text-4xl p-4 md:p-5 text-white ajuste_centro`}
          >
            El IMEI ingresado no es válido.
          </h2>
        </div>,
      );

      return;
    }

    const result = await trigger(imei).unwrap();

    const ONLY_SIM = 'El equipo de no es compatible con ESIM, pero si con una SIM FISICA';
    const COMPATIBLE = 'El equipo es compatible';

    switch (result.message) {
      case ONLY_SIM:
        dispatch(setSupportEsim(false));
        openModal(
          <div
            className={`flex flex-col items-center justify-center h-full bg-black bg-modal-verde text-white`}
          >
            <div className={`grid grid-cols-12`}>
              <div className="hidden md:flex md:col-span-2 justify-center">
                {/* PlusDecoration */}
                <PlusDecoration
                  className="w-4 md:w-8 relative mx-auto"
                />
              </div>

              <div
                className="col-span-12 md:col-span-8"
              >
                <h1 className={`text-center text-2xl lg:text-xl p-4 md:p-5 text-white ajuste_centro mb-20`}>
                  Tu dispositivo <span className="text-highlight">solo es compatible</span> con nuestra
                  <br />
                  <br />
                  <span className={`text-6xl text-center font-medium`}>SIM física</span>
                </h1>

                <div
                  className={`flex mb-12 justify-center mt-10`}
                >
                  <div>
                    <Image
                      src={`/img/sim-card-icon2.svg`}
                      alt={`SIM física`}
                      width={100}
                      height={100}
                      className={`ml-auto`}
                    />
                  </div>
                </div>
              </div>
              <div
                className={`hidden md:flex md:col-span-2 justify-center items-end`}
              >
                {/* PlusDecoration */}
                <PlusDecoration
                  className="w-9 md:w-12 lg:w-16 xl:w-20"
                />
              </div>
            </div>
          </div>,
        );
        break;
      case COMPATIBLE:
        dispatch(setSupportEsim(true));
        openModal(
          <div
            className={`flex flex-col items-center justify-center h-full bg-black bg-modal-verde text-white`}
          >
            <div className={`grid grid-cols-12`}>
              <div className="hidden md:flex md:col-span-2 justify-center">
                {/* PlusDecoration */}
                <PlusDecoration
                  className="w-4 md:w-8 relative mx-auto"
                />
              </div>

              <div
                className="col-span-12 md:col-span-8"
              >
                <h1 className={`text-center text-2xl lg:text-xl p-4 md:p-5 text-white ajuste_centro mb-20`}>
                  Tu dispositivo <span className="text-highlight">si es compatible</span> con nuestra
                  <br />
                  <br />
                  <span className={`text-6xl text-center font-medium`}>SIM física y eSIM</span>
                </h1>

                <div
                  className={`flex mb-12`}
                >
                  <div
                    className={`flex-1`}
                  >
                    <Image
                      src={`/img/sim-card-icon2.svg`}
                      alt={`SIM física`}
                      width={100}
                      height={100}
                      className={`ml-auto`}
                    />
                  </div>
                  <div
                    className={`flex-1`}
                  >
                    <Image
                      src={`/img/qr-code-scan-icon.svg`}
                      alt={`eSIM`}
                      width={150}
                      height={150}
                      className={`mr-auto`}
                    />
                  </div>
                </div>
              </div>
              <div
                className={`hidden md:flex md:col-span-2 justify-center items-end`}
              >
                {/* PlusDecoration */}
                <PlusDecoration
                  className="w-9 md:w-12 lg:w-16 xl:w-20"
                />
              </div>
            </div>
          </div>,
        );
        break;
      default:
        dispatch(setSupportEsim(false));
        openModal(
          <div
            className={`flex flex-col items-center justify-center h-full`}
          >
            <div className={`grid grid-cols-12`}>
              <div className="hidden md:flex md:col-span-2 justify-center">
                {/* PlusDecoration */}
                <PlusDecoration
                  className="w-4 md:w-8 relative mx-auto"
                />
              </div>

              <div
                className="col-span-12 md:col-span-8"
              >
                <h1 className={`text-center text-2xl lg:text-2xl p-4 md:p-5 text-white ajuste_centro`}>
                  Tu equipo <span className="text-highlight-red text-white">no es compatible</span> con la <br />
                  red de inphonity, para tener la mejor <br />
                  experiencia te recomendamos probar <br />
                  con otro e intentar nuevamente.
                </h1>

                <div
                  className={`flex mt-10 mb-10 justify-center`}
                >
                  <div>
                    <Image
                      src={`/img/emoji-wink-icon.svg`}
                      alt={`SIM física`}
                      width={150}
                      height={150}
                      className={`ml-auto`}
                    />
                  </div>
                </div>

                <h1 className={`text-center text-2xl lg:text-2xl p-4 md:p-5 text-white`}>
                  ¡Aquí te esperamos!
                </h1>
              </div>
              <div
                className={`hidden md:flex md:col-span-2 justify-center items-end`}
              >
                {/* PlusDecoration */}
                <PlusDecoration
                  className="w-9 md:w-12 lg:w-16 xl:w-20"
                />
              </div>
            </div>
          </div>,
        );
    }
  };

  React.useEffect(() => {
    if (data) {

    }
  }, [data]); // eslint-disable-line

  return (
    <div
      style={style || {}}
      className={`${className || ''}`}
    >
      <div
        className="w-full"
      >
        <div
          className="flex items-center py-2 gap-3"
        >
          <div className="w-3/5">
            <input
              type="text"
              className="input bg-white rounded-full outline-amber-500 transition duration-300 text-black font-light w-full"
              placeholder="Introduce tu IMEI"
              onChange={(e) => {e.target.value=e.target.value.trim(); setImei(e.target.value)}}
              value={imei}
              maxLength={16}
            />
          </div>
          <div className="button-container w-2/5">
            <button
              className="multi-border font-medium block w-full disabled:opacity-50 bg-black"
              onClick={handleSubmit}
              disabled={isLoading || isFetching}
            >
              ENVIAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ValidateIMEIForm;

