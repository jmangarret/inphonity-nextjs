import PlusDecoration from "@/components/PlusDecoration";
import Image from "next/image";
import React from "react";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {setPlan} from "@/lib/features/plan/planSlice";

export enum SlideBackground {
  TRANSPARENT = 'bg-promo-transparent',
  BLUE = 'bg-promo-blue',
  GREEN = 'bg-promo-green',
  ORANGE = 'bg-promo-orange',
  CUSTOM = 'bg-plan1'
}

type SlideProps = {
  id: number;
  name: string;
  hasPromo?: boolean;
  background?: SlideBackground;
  mobileData: string;
  sharedData: boolean;
  minutes: number|string;
  sms: number|string;
  referralIncome: number;
  cashback: number;
  price: number;
  hasWhatsapp?: boolean;
  hasInstagram?: boolean;
  hasFacebook?: boolean;
  hasMessenger?: boolean;
  hasTiktok?: boolean;
  hasX?: boolean;
  hasTelegram?: boolean;
  hasSnapchat?: boolean;
}

const formatNumber = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Slide: React.FC<SlideProps> = ({id, name, hasPromo, background, mobileData, sharedData, minutes, sms, referralIncome, cashback, price, hasWhatsapp, hasInstagram, hasFacebook, hasMessenger, hasTiktok, hasX, hasTelegram, hasSnapchat}) => {
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
      className={`mx-3 p-3 sm:p-4 md:p-9 grid grid-cols-10 border border-white rounded-lg ${background || SlideBackground.TRANSPARENT}`}
    >
      {hasPromo && (
        <div className="absolute p-10 rounded-full text-center font-medium flex items-center justify-center promo">
          <p>
            <span className="text-black">PROMO POR PORTABILIDAD</span>
            <br/>
            <span className="text-[1.5rem] font-medium">+15<sup>GB</sup></span>
          </p>
        </div>
      )}
      <div className="col-span-10 relative text-center mb-3 md:mb-4 ">
        <h3 className="text-5xl font-medium mb-3">
          {name}
        </h3>
        <h3 className="text-5xl font-medium mb-3">
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
      <div className="col-span-10 flex justify-between">
        <div className="card-plan text-center border border-white rounded-lg bg-black bg-opacity-50 p-3 m-1">
          <p className="text-xs mx-auto mb-2.5">
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
          <p className="font-medium text-2xl">
            {minutes}
          </p>
        </div>
        <div className="card-plan text-center border border-white rounded-lg bg-black bg-opacity-50 p-3 m-1">
          <p className="text-xs mx-auto mb-2.5">
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
          <p className="font-medium text-2xl">
            {sms}
          </p>
        </div>
      </div>

      <div className="col-span-10 flex justify-between">
        <div className="card-plan text-center border border-white rounded-lg bg-black bg-opacity-50 p-3 m-1 flex flex-col">
          <p className="text-xs mx-auto">
            INGRESO POR REFERIDO
          </p>
          <p className="font-medium text-4xl">
            {formatNumber(referralIncome)}%
          </p>
        </div>
        <div className="card-plan text-center border border-white rounded-lg bg-card-2 p-3 m-1 flex flex-col">
          <p className="text-xs mx-auto mb-2.5">
            CASHBACK
          </p>
          <p className="font-medium text-4xl">
            {formatNumber(cashback)}%
          </p>
        </div>
      </div>

      <div className="col-span-10 text-center border border-white rounded-lg bg-black bg-opacity-50 p-3 m-1">
        <p className="text-xs lg:text-base">
          PRECIO
        </p>
        <p className="font-medium text-4xl">
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
          {hasFacebook && (
            <Image
              src="/img/rs_face.svg"
              alt="Facebook"
              width={30}
              height={30}
              className="mr-3 sm:mr-4 md:mr-5 inline-block w-5"
            />
          )}
          {hasWhatsapp && (
            <Image
              src="/img/rs_what.svg"
              alt="WhatsApp"
              width={30}
              height={30}
              className="mr-3 sm:mr-4 md:mr-5 inline-block w-5"
            />
          )}
          {hasMessenger && (
            <Image
              src="/img/rs_mes.svg"
              alt="Messenger"
              width={30}
              height={30}
              className="mr-3 sm:mr-4 md:mr-5 inline-block w-5"
            />
          )}
           {hasInstagram && (
            <Image
              src="/img/rs_instagram.svg"
              alt="Instagram"
              width={30}
              height={30}
              className="mr-3 sm:mr-4 md:mr-5 inline-block w-5"
            />
          )}
          {hasTiktok && (
            <Image
              src="/img/rs_tik.svg"
              alt="TikTok"
              width={30}
              height={30}
              className="mr-3 sm:mr-4 md:mr-5 inline-block w-5"
            />
          )}
          {hasSnapchat && (
            <Image
              src="/img/rs_snap.svg"
              alt="Snapchat"
              width={30}
              height={30}
              className="mr-3 sm:mr-4 md:mr-5 inline-block w-5"
            />
          )}
          {hasTelegram && (
            <Image
              src="/img/rs_tel.svg"
              alt="Telegram"
              width={30}
              height={30}
              className="mr-3 sm:mr-4 md:mr-5 inline-block w-5"
            />
          )}
          {hasX && (
            <Image
              src="/img/rs_x.svg"
              alt="TikTok"
              width={30}
              height={30}
              className="mr-3 sm:mr-4 md:mr-5 inline-block w-5"
            />
          )}
        </div>
        {plan.id === id ? (
          <button className="multi-border-white text-white bg-promo-orange">
            PLAN SELECCIONADO
          </button>
        ) : (
          <button
            className="multi-border text-white bg-opacity-50"
            onClick={handleButtonClick}
          >
            QUIERO ESTE PLAN
          </button>
        )}
      </div>
    </div>
  );
};

export default Slide;
