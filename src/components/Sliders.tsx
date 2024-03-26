"use client";
import {register, SwiperContainer} from 'swiper/element/bundle';
import {useEffect, useRef} from "react";
import Slide, {SlideBackground} from "@/components/Slide";

register();

const Sliders = () => {
  const swiperElRef = useRef<SwiperContainer>(null);
  // list of plans
  const plans = [
    {
      id: 1,
      name: 'Go',
      hasPromo: true,
      background: SlideBackground.BLUE,
      mobileData: '5GB',
      sharedData: false,
      minutes: 1500,
      sms: 500,
      referralIncome: 20,
      cashback: 3,
      price: 399,
      hasWhatsapp: true,
      hasFacebook: true,
      hasMessenger: true,
      hasX: true,
    },
    {
      id: 2,
      name: 'Ultra',
      background: SlideBackground.GREEN,
      mobileData: '40GB',
      sharedData: true,
      minutes: 1500,
      sms: 1000,
      referralIncome: 20,
      cashback: 6,
      price: 999,
      hasWhatsapp: true,
      hasInstagram: true,
      hasFacebook: true,
      hasMessenger: true,
      hasTiktok: true,
      hasX: true,
    },
    {
      id: 3,
      name: 'Elite',
      background: SlideBackground.BLUE, // Cambiado a un color disponible en el enum
      mobileData: '100GB',
      sharedData: true,
      minutes: 10000,
      sms: 10000,
      referralIncome: 20,
      cashback: 10,
      price: 1599,
      hasWhatsapp: true,
      hasInstagram: true,
      hasFacebook: true,
      hasMessenger: true,
      hasTiktok: true,
      hasX: true,
    },
    {
      id: 9,
      name: 'Plan 4',
      background: SlideBackground.GREEN, // Cambiado a un color disponible en el enum
      mobileData: '6GB',
      sharedData: false,
      minutes: 1500,
      sms: 500,
      referralIncome: 20,
      cashback: 12,
      price: 40, // Revisar este precio para ajustarlo correctamente
      hasWhatsapp: true,
      hasInstagram: true, // Asumido basado en el patrón
      hasFacebook: true,
      hasMessenger: true,
      hasTiktok: true, // Asumido basado en el patrón
      hasX: true,
    },
    {
      id: 10,
      name: 'Plan 5',
      background: SlideBackground.BLUE, // Cambiado a un color disponible en el enum
      mobileData: '10GB',
      sharedData: false,
      minutes: 500,
      sms: 250,
      referralIncome: 20,
      cashback: 15,
      price: 50, // Revisar este precio para ajustarlo correctamente
      hasWhatsapp: true,
      hasInstagram: true, // Asumido basado en el patrón
      hasFacebook: true,
      hasMessenger: true,
      hasTiktok: true, // Asumido basado en el patrón
      hasX: true,
    },
  ];

  useEffect(() => {
    // jump to second slide
    swiperElRef.current?.swiper.slideTo(1);

    // listen for Swiper events using addEventListener
    swiperElRef.current?.addEventListener('swiperprogress', (e: any) => {
      const [swiper, progress] = e.detail;
    });
    swiperElRef.current?.addEventListener('interchangeability', (e) => {
    });
    // watch click event
    swiperElRef.current?.addEventListener('click', (e: any) => {
      swiperElRef.current?.swiper.slideTo(swiperElRef.current?.swiper.clickedIndex);
    });
  }, []);

  return (
    <div className="slider-container">
      <swiper-container
        ref={swiperElRef}
        slides-per-view="auto"
        pagination="true"
        effect="coverflow"
        grab-cursor="true"
        centered-slides="true"
        speed="600"
      >
        {plans.map((plan) => (
          <swiper-slide
            key={plan.id}
          >
            <Slide
              {...plan}
            />
          </swiper-slide>
        ))}
      </swiper-container>
    </div>
  );
};

export default Sliders;
