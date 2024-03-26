import React from "react";
import {ModalContext} from "@/contexts/ModalContext";
import {useLazyValidateImeiQuery, useValidateImeiQuery} from "@/lib/services/validateCompatibilityApi";
import PlusDecoration from "@/components/PlusDecoration";
import Image from "next/image";
import {setSupportEsim} from "@/lib/features/plan/planSlice";
import {useAppDispatch} from "@/lib/hooks";


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

const ValidateIMEIForm: React.FC<ValidateIMEIFormProps> = ({className, style}) => {
  const {openModal} = React.useContext(ModalContext);
  const dispatch = useAppDispatch();
  const [imei, setImei] = React.useState<string>('');
  const [trigger, {data, isLoading, error, isFetching}] = useLazyValidateImeiQuery();

  const handleSubmit = async () => {
    // Validate IMEI
    if (!isValidIMEI(imei)) {
      openModal(
        <div>
          <p
            className={`text-center text-lg p-4 md:p-5`}
          >
            El IMEI ingresado no es válido.
          </p>
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
            className={`text-center bg-black text-white p-4 md:p-5 py-6 md:py-7 bg-soft-blue`}
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
                <h1 className={`text-2xl font-medium mb-12`}>
                  Tu dispositivo es
                  <br/>
                  compatible con nuestra
                  <br/>
                  <span className={`text-4xl`}>SIM física</span>
                </h1>

                <div
                  className={`flex mb-12 justify-center`}
                >
                  <div>
                    <Image
                      src={`/img/sim-card-icon.svg`}
                      alt={`SIM física`}
                      width={150}
                      height={150}
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
            className={`text-center bg-black text-white p-4 md:p-5 py-6 md:py-7 bg-diagonal-inverted-gradient`}
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
                <h1 className={`text-2xl font-medium mb-12`}>
                  Tu dispositivo es
                  <br/>
                  compatible con nuestra
                  <br/>
                  <span className={`text-4xl`}>SIM física y eSIM</span>
                </h1>

                <div
                  className={`flex mb-12`}
                >
                  <div
                    className={`flex-1`}
                  >
                    <Image
                      src={`/img/sim-card-icon.svg`}
                      alt={`SIM física`}
                      width={150}
                      height={150}
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
            className={`text-center bg-black text-white p-4 md:p-5 py-6 md:py-7 bg-orange-gradient`}
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
                <h1 className={`text-2xl font-medium mb-12`}>
                  ¡No te preocupes!
                  <br/>
                  Si tu teléfono no es
                  <br/>
                  compatible con inphonity,
                  <br/>
                  puedes volver más adelante.
                </h1>

                <div
                  className={`flex mb-12 justify-center`}
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

                <h1 className={`text-2xl font-medium mb-12`}>
                  Estaremos aquí para
                  <br/>
                  recibirte. ¡Hasta pronto!
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
          <div>
            <input
              type="text"
              className="input bg-white rounded-full outline-amber-500 transition duration-300 text-black font-light w-full"
              placeholder="IMEI"
              onChange={(e) => setImei(e.target.value)}
              value={imei}
            />
          </div>
          <div className="button-container">
            <button
              className="button font-medium block w-full disabled:opacity-50"
              onClick={handleSubmit}
              disabled={isLoading || isFetching}
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ValidateIMEIForm;

