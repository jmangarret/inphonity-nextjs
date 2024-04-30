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

const formatNumber = (number: number, decimals=0) => {
  let val = 0;
  if (decimals==0){
    val = Math.trunc(number)
  }

  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
    <div className="click-listen">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden md:max-w-2xl m-2">
        <div className="md:flex flex-col">
          {planData.portability_promo && (
          <div className="absolute p-10 rounded-[1.25rem]-full text-center font-medium flex items-center justify-center promo">
            <p>
              <span className="text-black text-xs font-medium">TRAE TU NÚMERO Y OBTEN</span>
              <br />
              <span className="text-[1.5rem] font-medium" dangerouslySetInnerHTML={{__html: planData.portability_promo}}></span>
            </p>
          </div>
          )}
          <div className={`w-full md:flex-shrink-0 rounded-t-lg p-8 rounded-[1.25rem]-full text-center ${SlideBackground.CUSTOM}`}>
                <h3 className="text-4xl font-medium font-yellow capitalize">
                  {planData.name}
                </h3>
                <h3 className="text-6xl font-medium mb-3">
                  {planData.internet}
                </h3>
                <p className="font-medium text-sm">

                {planData.share_data ? 'COMPARTE DATOS' : 'NO COMPARTE DATOS'}
              </p>
          </div>
          <div className="mx-3 p-3 sm:p-4">
            <div className="col-span-10 flex justify-between">
              <div className="card-plan-promo text-center border border-white rounded-[1.25rem] bg-black p-3 m-1">
                <p className="text-xs mx-auto mb-2.5">
                  <Image
                    src="/img/phone-circle-icon.svg"
                    alt="Teléfono"
                    width={22}
                    height={22}
                    className="inline align-middle w-4 mr-2"
                  />
                  {' '}
                  MINUTOS
                </p>
                <p className="font-medium text-2xl">
                  {planData.minutes}
                </p>
              </div>
              <div className="card-plan-promo text-center border border-white rounded-[1.25rem] bg-black p-3 m-1">
                <p className="text-xs mx-auto mb-2.5">
                  <Image
                    src="/img/message-icon.svg"
                    alt="Mensaje"
                    width={22}
                    height={22}
                    className="inline align-middle w-4 mr-2 h-[1.375rem]"
                  />
                  {' '}
                  SMS
                </p>
                <p className="font-medium text-2xl">
                  {planData.sms}
                </p>
              </div>
            </div>
            <div className="col-span-10 p-2 text-center bg-black border rounded-[1.25rem]">
              <p className="font-medium text-sm text-center mb-3">
                REDES SOCIALES ILIMITADAS
              </p>
              <div className="flex justify-center items-center mb-5">
                {Boolean(planData.has_fb) && (
                  <Image
                    src="/img/facebook-icon.svg"
                    alt="Facebook"
                    width={30}
                    height={30}
                    className="mr-3 sm:mr-4 md:mr-5 inline-block w-5"
                  />
                )}
                {Boolean(planData.has_wa) && (
                  <Image
                    src="/img/whatsapp-icon.svg"
                    alt="WhatsApp"
                    width={30}
                    height={30}
                    className="mr-3 sm:mr-4 md:mr-5 inline-block w-5"
                  />
                )}
                {Boolean(planData.has_fm) && (
                  <Image
                    src="/img/messenger-icon.svg"
                    alt="Messenger"
                    width={30}
                    height={30}
                    className="mr-3 sm:mr-4 md:mr-5 inline-block w-5"
                  />
                )}
                {Boolean(planData.has_ig) && (
                  <Image
                    src="/img/instagram-icon.svg"
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
                    src="/img/snapchat-icon.svg"
                    alt="Snapchat"
                    width={30}
                    height={30}
                    className="mr-3 sm:mr-4 md:mr-5 inline-block w-5"
                  />
                )}
                {Boolean(planData.has_tl) && (
                  <Image
                    src="/img/telegram-icon.svg"
                    alt="Telegram"
                    width={30}
                    height={30}
                    className="mr-3 sm:mr-4 md:mr-5 inline-block w-5"
                  />
                )}
                {Boolean(planData.has_x) && (
                  <Image
                    src="/img/x-icon.svg"
                    alt="X"
                    width={30}
                    height={30}
                    className="mr-3 sm:mr-4 md:mr-5 inline-block w-5"
                  />
                )}
              </div>
            </div>

            <div className="col-span-10 flex justify-between">
              <div className="card-plan-promo text-center border-2 border-black rounded-[1.25rem] bg-white p-3 m-1 flex flex-col">
                <div className="h-2/4">
                  <p className="text-xs mx-auto mb-0.5 text-black font-medium">
                    BONO ÚNICO
                  </p>

                  <p className="text-xs mx-auto text-black font-medium">
                    POR INVITADO
                  </p>
                </div>

                <div className="h-2/4">
                  <p className="font-medium text-4xl text-black">
                    {formatNumber(Number(referralIncome))}%
                  </p>
                </div>
              </div>
              <div className="card-plan-promo text-center border-2 border-black rounded-[1.25rem] bg-white p-3 m-1 flex flex-col">
                <div className="h-2/4">
                  <p className="text-xs mx-auto mb-0.5 text-black font-medium">
                    CASHBACK AL DOBLE
                  </p>

                  <p className="text-xs mx-auto mb-2.5 text-black font-medium">
                    Antes <span className="line-through">1%</span>, ahora:
                  </p>
                </div>

                <div className="h-2/4">
                  <p className="font-medium text-4xl text-black">
                    {formatNumber(cashback)}%
                  </p>

                  <p className="text-10px mx-auto mb-2.5 text-black font-medium">
                    POR 6 MESES
                  </p>
                </div>
              </div>
            </div>

            <div className="col-span-10 text-center border-2 border-black rounded-[1.25rem] bg-white p-3 m-1">
              <p className="font-medium text-6xl text-black">
                ${formatNumber(planData.price)}
              </p>
              <p className="text-xs lg:text-base text-black font-medium">
                 VIGENCIA POR 30 DÍAS
              </p>
            </div>

            {plan.id === planData.id ? (
              <button className="w-full multi-border-white text-white bg-promo-orange font-medium click-listen">
                PLAN SELECCIONADO
              </button>
            ) : (
              <button
                className="w-full multi-border text-white bg-black font-medium click-listen"
                onClick={handleButtonClick}
              >
                QUIERO ESTE PLAN
              </button>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
