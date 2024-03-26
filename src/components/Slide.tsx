import PlusDecoration from "@/components/PlusDecoration";
import Image from "next/image";
import React from "react";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {setPlan} from "@/lib/features/plan/planSlice";

export enum SlideBackground {
  TRANSPARENT = 'bg-promo-transparent',
  BLUE = 'bg-promo-blue',
  GREEN = 'bg-promo-green',
}

type SlideProps = {
  id: number;
  name: string;
  hasPromo?: boolean;
  background?: SlideBackground;
  mobileData: string;
  sharedData: boolean;
  minutes: number;
  sms: number;
  referralIncome: number;
  cashback: number;
  price: number;
  hasWhatsapp?: boolean;
  hasInstagram?: boolean;
  hasFacebook?: boolean;
  hasMessenger?: boolean;
  hasTiktok?: boolean;
  hasX?: boolean;
}

const namePosition = (mobileData: string) => {
  if (mobileData.length > 4) {
    return '-20%';
  }

  if (mobileData.length > 3) {
    return '-17%';
  }

  return '-15%';
}

const formatNumber = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Slide: React.FC<SlideProps> = ({id, name, hasPromo, background, mobileData, sharedData, minutes, sms, referralIncome, cashback, price, hasWhatsapp, hasInstagram, hasFacebook, hasMessenger, hasTiktok, hasX}) => {
  const dispatch = useAppDispatch();
  const plan = useAppSelector((state) => state.plan);

  const handleButtonClick = () => {
    if (!location.pathname.includes('accepted')) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }

    dispatch(setPlan(id));
  };

  return (
    <div
      className={`p-3 sm:p-4 md:p-5 w-full grid grid-cols-10 gap-3 border border-white rounded-lg ${background || SlideBackground.TRANSPARENT}`}
    >
      {hasPromo && (
        <div
          className="absolute p-2 rounded-full text-center font-medium flex items-center justify-center promo"
        >
          <p>
            PROMO POR PORTABILIDAD
            <br/>
            <span className="text-base">+15<sup>GB</sup></span>
          </p>
        </div>
      )}
      <div className="col-span-10 relative text-center mb-3 md:mb-4">
        <span
          className="text-1xl text-highlight2 font-medium relative"
          style={{
            left: namePosition(mobileData),
            bottom: '-12%'
        }}
        >
          {name}
        </span>
        <PlusDecoration
          className="absolute w-5"
          style={{right: '2rem', top: '1rem'}}
        />
        <h3
          className="text-5xl font-medium mb-3"
        >
          {mobileData}
        </h3>
        <p className="font-medium text-sm">
          {sharedData ? (
            <>
              COMPARTE DATOS
              {' '}
              <Image
                src="/img/check-plan.svg"
                alt="Si compartes datos"
                width={20}
                height={20}
                className="inline"
                style={{verticalAlign: "top"}}
              />
            </>
          ) : (
            <>
              NO COMPARTE DATOS
              {' '}
              <Image
                src="/img/uncheck-plan.svg"
                alt="No compartes datos"
                width={20}
                height={20}
                className="inline"
                style={{verticalAlign: "top"}}
              />
            </>
          )}
        </p>
      </div>
      <div
        className="col-span-5 text-center border border-white rounded-lg bg-black bg-opacity-50 p-3"
      >
        <p
          className="text-xs mx-auto"
          style={{height: "2rem"}}
        >
          <Image
            src="/img/phone-circle-icon.svg"
            alt="Teléfono"
            width={20}
            height={20}
            className="inline w-4"
            style={{verticalAlign: "middle"}}
          />
          {' '}
          MINUTOS
        </p>
        <p className="font-medium text-xl">
          {formatNumber(minutes)}
        </p>
      </div>
      <div
        className="col-span-5 text-center border border-white rounded-lg bg-black bg-opacity-50 p-3"
      >
        <p
          className="text-xs mx-auto"
          style={{height: "2rem"}}
        >
          <Image
            src="/img/message-icon.svg"
            alt="Mensaje"
            width={20}
            height={20}
            className="inline w-4"
            style={{verticalAlign: "middle"}}
          />
          {' '}
          SMS
        </p>
        <p className="font-medium text-xl">
          {formatNumber(sms)}
        </p>
      </div>
      <div
        className="col-span-5 text-center border border-white rounded-lg bg-black bg-opacity-50 p-3"
      >
        <p
          className="text-xs mx-auto"
          style={{height: "2.5rem"}}
        >
          INGRESO POR REFERIDO
          {' '}
          <Image
            src="/img/question-mark-icon.svg"
            alt="Ingreso por referido"
            width={10}
            height={10}
            className="inline w-2 lg:w-3 cursor-pointer"
            style={{verticalAlign: "top"}}
          />
        </p>
        <p className="font-medium text-xl">
          {formatNumber(referralIncome)}%
        </p>
      </div>
      <div
        className="col-span-5 text-center border border-white rounded-lg bg-black p-3"
        style={{backgroundColor: "#F79F1A"}}
      >
        <p
          className="text-xs mx-auto"
          style={{height: "2.5rem"}}
        >
          CASHBACK
          {' '}
          <Image
            src="/img/question-mark-icon.svg"
            alt="Ingreso por referido"
            width={10}
            height={10}
            className="inline w-2 lg:w-3 cursor-pointer"
            style={{verticalAlign: "top"}}
          />
        </p>
        <p className="font-medium text-xl">
          {formatNumber(cashback)}%
        </p>
      </div>
      <div
        className="col-span-10 text-center border border-white rounded-lg bg-black bg-opacity-50 p-3"
      >
        <p className="text-xs lg:text-base">
          PRECIO
        </p>
        <p className="font-medium text-2xl">
          ${formatNumber(price)}
        </p>
      </div>
      <div
        className="col-span-10 p-2 text-center"
      >
        <p className="font-medium text-sm text-center mb-3">
          REDES SOCIALES INCLUIDAS
        </p>
        <div className="flex justify-center items-center mb-5">
          {hasWhatsapp && (
            <Image
              src="/img/whatsapp-icon.svg"
              alt="WhatsApp"
              width={15}
              height={15}
              className="mr-3 sm:mr-4 md:mr-5 inline-block w-5"
            />
          )}
          {hasInstagram && (
            <Image
              src="/img/instagram-icon.svg"
              alt="Instagram"
              width={30}
              height={30}
              className="mr-3 sm:mr-4 md:mr-5 inline-block w-5"
            />
          )}
          {hasFacebook && (
            <Image
              src="/img/facebook-icon.svg"
              alt="Facebook"
              width={30}
              height={30}
              className="mr-3 sm:mr-4 md:mr-5 inline-block w-3"
            />
          )}
          {hasMessenger && (
            <Image
              src="/img/messenger-icon.svg"
              alt="Messenger"
              width={20}
              height={20}
              className="mr-3 sm:mr-4 md:mr-5 inline-block w-5"
            />
          )}
          {hasTiktok && (
            <Image
              src="/img/tiktok-icon.svg"
              alt="TikTok"
              width={30}
              height={30}
              className="mr-3 sm:mr-4 md:mr-5 inline-block w-5"
            />
          )}
          {hasX && (
            <Image
              src="/img/x-icon.svg"
              alt="TikTok"
              width={30}
              height={30}
              className="mr-3 sm:mr-4 md:mr-5 inline-block w-5"
            />
          )}
        </div>
        {plan.id === id ? (
          <p className={`font-medium text-highlight uppercase`}>
            Plan seleccionado
          </p>
        ) : (
          <button
            className="multi-border text-black hover:text-gray-900 font-medium"
            onClick={handleButtonClick}
          >
            Quiero este plan
          </button>
        )}
      </div>
    </div>
  );
};

export default Slide;
