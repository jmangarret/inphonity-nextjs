import React from "react";
import { ModalContext } from "@/contexts/ModalContext";
import { useLazyValidateImeiQuery, useValidateImeiQuery } from "@/lib/services/validateCompatibilityApi";
import PlusDecoration from "@/components/PlusDecoration";
import Image from "next/image";
import { setSupportEsim } from "@/lib/features/plan/planSlice";
import { setIsValidation } from "@/lib/features/shipping/shippingSlice";
import { useAppDispatch } from "@/lib/hooks";
import FloatingDecoration from "./FloatingDecoration";
import { borderBottomLeftRadius } from "html2canvas/dist/types/css/property-descriptors/border-radius";


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
        <div className="bg-white">
          <FloatingDecoration
            className={`w-48 md:w-64 absolute top-[0%] left-[20%] md:left-[25%]`}
            img="/img/modal-eclipse-orange-1.svg"
          />

          <FloatingDecoration
            className={`w-4 md:w-8 absolute top-[10%] left-[10%]`}
            img="/img/red-plus.svg"
          />
          <div className="flex flex-col items-center justify-center h-[470px] w-auto md:w-[500px]">
            <h2
              className={`text-center text-xl p-4 text-black ajuste_centro`}
            >
              El IMEI ingresado no es válido.
            </h2>
          </div>

          <FloatingDecoration
            className={`w-8 md:w-12 absolute bottom-[15%] right-[10%]`}
            img="/img/red-plus.svg"
          />

          <FloatingDecoration
            className={`w-36 md:w-44 absolute bottom-[0%] left-[0%]`}
            img="/img/modal-eclipse-orange-2.svg"
            customClass="rounded-bl-2xl"
          />
        </div>,
      );

      return;
    }

    const result = await trigger(imei).unwrap();

    const ONLY_SIM = 'El equipo de no es compatible con ESIM, pero si con una SIM FISICA';
    const COMPATIBLE = 'El equipo es compatible';
    dispatch(setIsValidation(true));
    switch (result.message) {
      case ONLY_SIM:
        dispatch(setSupportEsim(false));
        openModal(
          <div
            className={`flex flex-col items-center justify-center h-[500px] bg-white text-black`}
          >
            <FloatingDecoration
              className={`w-24 md:w-32 absolute top-[0%] left-[0%]`}
              img="/img/modal-eclipse-green-1.svg"
              customClass="rounded-tl-2xl"
            />

            <PlusDecoration
              className="w-4 md:w-6 absolute top-[13%] right-[50%]"
              isGreen={true}
            />

            <div className={`flex flex-col items-center justify-center h-[470px] w-auto md:w-[500px]`}>
              <div
                className="col-span-12 md:col-span-8"
              >
                <h1 className={`text-center text-xl p-4 text-black mb-5`}>
                  Tu dispositivo <span className="font-medium">solo es compatible</span> con nuestra
                  <br />
                  <br />
                  <span className={`text-5xl text-center font-medium`}>SIM física</span>
                </h1>

                <div
                  className={`flex justify-center my-5`}
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
        break;
      case COMPATIBLE:
        dispatch(setSupportEsim(true));
        openModal(
          <div
            className={`flex flex-col items-center justify-center bg-white text-white`}
          >
            <FloatingDecoration
              className={`w-24 md:w-32 absolute top-[0%] left-[0%]`}
              img="/img/modal-eclipse-green-1.svg"
              customClass="rounded-tl-2xl"
            />

            <PlusDecoration
              className="w-4 md:w-6 absolute top-[13%] right-[50%]"
              isGreen={true}
            />

            <div className={`flex flex-col items-center justify-center h-[470px] w-auto md:w-[500px]`}>
              <div
                className="col-span-12 md:col-span-8"
              >
                <h1 className={`text-center text-xl p-4 text-black mb-5`}>
                  Tu dispositivo <span className="font-medium">si es compatible</span> con nuestra
                  <br />
                  <br />
                  <span className={`text-5xl text-center font-medium`}>SIM física y eSIM</span>
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
                      className={`ml-auto mr-3`}
                    />
                  </div>
                  <div
                    className={`flex-1`}
                  >
                    <Image
                      src={`/img/qr-code-scan-icon.svg`}
                      alt={`eSIM`}
                      width={132}
                      height={100}
                      className={`mr-auto ml-3`}
                    />
                  </div>
                </div>
              </div>
            </div>

            <FloatingDecoration
              className={`w-8 md:w-12 absolute bottom-[10%] left-[5%]  md:bottom-[15%] md:left-[10%]`}
              img="/img/orange-plus.svg"
            />

            <FloatingDecoration
              className={`w-24 md:w-32 absolute bottom-[0%] right-[0%]`}
              img="/img/modal-eclipse-green-2.svg"
              customClass="rounded-br-2xl"
            />
          </div>,
        );
        break;
      default:
        dispatch(setSupportEsim(false));
        openModal(
          <div
            className={`flex flex-col items-center justify-center h-[500px]`}
          >
    
            <FloatingDecoration
              className={`w-48 md:w-64 absolute top-[0%] left-[20%] md:left-[25%]`}
              img="/img/modal-eclipse-orange-1.svg"
            />
    
            <FloatingDecoration
              className={`w-4 md:w-8 absolute top-[10%] left-[10%]`}
              img="/img/red-plus.svg"
            />
    
            <div className={`flex flex-col items-center justify-center h-[470px] w-auto md:w-[500px]`}>
              <div
                className="col-span-12 md:col-span-8"
              >
                <h1 className={`text-center text-xl p-4 text-black ajuste_centro`}>
                  Tu equipo <span className="font-medium">no es compatible</span> con la <br />
                  red de inphonity, para tener la mejor <br />
                  experiencia te recomendamos probar <br />
                  con otro e intentar nuevamente.
                </h1>
    
                <div
                  className={`flex justify-center`}
                >
                  <div>
                    <Image
                      src={`/img/emoji-wink-icon.svg`}
                      alt={`SIM física`}
                      width={82}
                      height={82}
                      className={`ml-auto`}
                    />
                  </div>
                </div>
    
                <h1 className={`text-center text-xl p-4 text-black`}>
                  ¡Aquí te esperamos!
                </h1>
              </div>
            </div>
    
            <FloatingDecoration
                className={`w-8 md:w-12 absolute bottom-[15%] right-[10%]`}
                img="/img/red-plus.svg"
              />
    
              <FloatingDecoration
                className={`w-36 md:w-44 absolute bottom-[0%] left-[0%]`}
                img="/img/modal-eclipse-orange-2.svg"
                customClass="rounded-bl-2xl"
              />
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
          className="flex items-center py-2 gap-3 flex-col sm:flex-row"
        >
          <div className="w-full sm:w-3/5">
            <input
              type="text"
              className="input bg-white rounded-full outline-amber-500 transition duration-300 text-black font-light w-full sm:w-[18.438rem !important] input-imei-postal"
              placeholder="Introduce tu IMEI"
              onChange={(e) => { e.target.value = e.target.value.trim(); setImei(e.target.value) }}
              value={imei}
              maxLength={16}
            />
          </div>
          <div className="button-container w-full sm:w-2/5">
            <button
              className="multi-border font-medium block w-full disabled:opacity-50 bg-black w-full sm:btn-imei-postal"
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

