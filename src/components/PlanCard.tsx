import PlusDecoration from "@/components/PlusDecoration";
import Image from "next/image";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setPlan, setPrice, setName } from "@/lib/features/plan/planSlice";
import { Plan } from "@/types/plans";

export enum SlideBackground {
  TRANSPARENT = 'bg-promo-transparent',
  BLUE = 'bg-promo-blue',
  GREEN = 'bg-promo-green',
  ORANGE = 'bg-promo-orange',
  YELLOW = 'bg-promo-yellow',
  CUSTOM = 'bg-plan1'
}

const formatNumber = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const PlanCard: React.FC<Plan> = (planData) => {
  const dispatch = useAppDispatch();
  const plan = useAppSelector((state) => state.plan);
  
  const cashback = 0;//TODO
  const commision = planData.commissions?.find(com => com.target_id == plan.id)
  const referralIncome = commision?.referral ?? 0;

  const handleButtonClick = () => {
    if (!location.pathname.includes('accepted')) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }

    dispatch(setPlan(planData.id));
    dispatch(setPrice(planData.price));
    dispatch(setName(planData.name));
  };

  return (
    <div
      className={`click-listen mx-3 p-3 sm:p-4 md:p-9 grid grid-cols-10 border border-white rounded-[1.25rem] ${planData.background || SlideBackground.TRANSPARENT}`}
    >
      {planData.portability_promo && (
        <div className="absolute p-10 rounded-[1.25rem]-full text-center font-medium flex items-center justify-center promo">
          <p>
            <span className="text-black">PROMO POR PORTABILIDAD</span>
            <br />
            <span className="text-[1.5rem] font-medium" dangerouslySetInnerHTML={{__html: planData.portability_promo}}></span>
          </p>
        </div>
      )}
      <div className="col-span-10 relative text-center mb-3 md:mb-4 ">
        <h3 className="text-4xl font-medium mb-3 font-yellow">
          {planData.name}
        </h3>
        <h3 className="text-6xl font-medium mb-3">
          {planData.internet}
        </h3>
        <p className="font-medium text-sm">
          {planData.share_data ? (
            <>
              COMPARTE DATOS
              {' '}
              <Image
                src="/img/check-plan.svg"
                alt="Si compartes datos"
                width={20}
                height={20}
                className="inline"
                style={{ verticalAlign: "top" }}
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
                style={{ verticalAlign: "top" }}
              />
            </>
          )}
        </p>
      </div>
      <div className="col-span-10 flex justify-between">
        <div className="card-plan text-center border border-white rounded-[1.25rem] bg-black bg-opacity-50 p-3 m-1">
          <p className="text-xs mx-auto mb-2.5">
            <Image
              src="/img/phone-circle-icon.svg"
              alt="Teléfono"
              width={20}
              height={20}
              className="inline w-4"
              style={{ verticalAlign: "middle" }}
            />
            {' '}
            MINUTOS
          </p>
          <p className="font-medium text-2xl">
            {planData.minutes}
          </p>
        </div>
        <div className="card-plan text-center border border-white rounded-[1.25rem] bg-black bg-opacity-50 p-3 m-1">
          <p className="text-xs mx-auto mb-2.5">
            <Image
              src="/img/message-icon.svg"
              alt="Mensaje"
              width={20}
              height={20}
              className="inline w-4"
              style={{ verticalAlign: "middle" }}
            />
            {' '}
            SMS
          </p>
          <p className="font-medium text-2xl">
            {planData.sms}
          </p>
        </div>
      </div>

      <div className="col-span-10 flex justify-between">
        <div className="card-plan text-center border border-white rounded-[1.25rem] bg-black bg-opacity-50 p-3 m-1 flex flex-col">
          <p className="text-xs mx-auto">
            INGRESO POR REFERIDO
          </p>
          <p className="font-medium text-4xl">
            {formatNumber(Number(referralIncome))}%
          </p>
        </div>
        <div className="card-plan text-center border border-white rounded-[1.25rem] bg-card-2 p-3 m-1 flex flex-col">
          <p className="text-xs mx-auto mb-2.5">
            CASHBACK
          </p>
          <p className="font-medium text-4xl">
            {formatNumber(cashback)}%
          </p>
        </div>
      </div>

      <div className="col-span-10 text-center border border-white rounded-[1.25rem] bg-black bg-opacity-50 p-3 m-1">
        <p className="text-xs lg:text-base">
          PRECIO
        </p>
        <p className="font-medium text-4xl">
          ${formatNumber(planData.price)}
        </p>
      </div>
      <div
        className="col-span-10 p-2 text-center"
      >
        <p className="font-medium text-sm text-center mb-3">
          REDES SOCIALES INCLUIDAS
        </p>
        <div className="flex justify-center items-center mb-5">
          {Boolean(planData.has_fb) && (
            <Image
              src="/img/rs_face.svg"
              alt="Facebook"
              width={30}
              height={30}
              className="mr-3 sm:mr-4 md:mr-5 inline-block w-5"
            />
          )}
          {Boolean(planData.has_wa) && (
            <Image
              src="/img/rs_what.svg"
              alt="WhatsApp"
              width={30}
              height={30}
              className="mr-3 sm:mr-4 md:mr-5 inline-block w-5"
            />
          )}
          {Boolean(planData.has_fm) && (
            <Image
              src="/img/rs_mes.svg"
              alt="Messenger"
              width={30}
              height={30}
              className="mr-3 sm:mr-4 md:mr-5 inline-block w-5"
            />
          )}
          {Boolean(planData.has_ig) && (
            <Image
              src="/img/rs_instagram.svg"
              alt="Instagram"
              width={30}
              height={30}
              className="mr-3 sm:mr-4 md:mr-5 inline-block w-5"
            />
          )}
          {Boolean(planData.has_tt) && (
            <Image
              src="/img/rs_tik.svg"
              alt="TikTok"
              width={30}
              height={30}
              className="mr-3 sm:mr-4 md:mr-5 inline-block w-5"
            />
          )}
          {Boolean(planData.has_sc) && (
            <Image
              src="/img/rs_snap.svg"
              alt="Snapchat"
              width={30}
              height={30}
              className="mr-3 sm:mr-4 md:mr-5 inline-block w-5"
            />
          )}
          {Boolean(planData.has_tl) && (
            <Image
              src="/img/rs_tel.svg"
              alt="Telegram"
              width={30}
              height={30}
              className="mr-3 sm:mr-4 md:mr-5 inline-block w-5"
            />
          )}
          {Boolean(planData.has_x) && (
            <Image
              src="/img/rs_x.svg"
              alt="TikTok"
              width={30}
              height={30}
              className="mr-3 sm:mr-4 md:mr-5 inline-block w-5"
            />
          )}
        </div>
        {plan.id === planData.id ? (
          <button className="w-full multi-border-white text-white bg-promo-orange click-listen">
            PLAN SELECCIONADO
          </button>
        ) : (
          <button
            className="w-full multi-border text-white bg-opacity-50 click-listen"
            onClick={handleButtonClick}
          >
            QUIERO ESTE PLAN
          </button>
        )}
      </div>
    </div>
  );
};

export default PlanCard;
