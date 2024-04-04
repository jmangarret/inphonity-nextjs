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
      name: 'Ready',
      hasPromo: true,
      background: SlideBackground.CUSTOM,
      mobileData: '3GB',
      sharedData: true,
      minutes: 'Ilimitados',
      sms: 'Ilimitados',
      referralIncome: 10,
      cashback: 1,
      price: 199,
      hasWhatsapp: true,
      hasFacebook: true,
      hasMessenger: true,
      hasTelegram: true,
      hasSnapchat: true,
      hasInstagram: true,
      hasX: true,
      hasTiktok: true,
    },
    {
      id: 2,
      name: 'Go',
      hasPromo: true,
      background: SlideBackground.BLUE,
      mobileData: '5GB',
      sharedData: false,
      minutes: 'Ilimitados',
      sms: 'Ilimitados',
      referralIncome: 10,
      cashback: 2,
      price: 299,
      hasWhatsapp: true,
      hasInstagram: true,
      hasFacebook: true,
      hasMessenger: true,
      hasTiktok: true,
      hasX: true,
      hasTelegram: true,
      hasSnapchat: true,
    },
    {
      id: 3,
      name: 'Pro',
      hasPromo: true,
      background: SlideBackground.ORANGE, // Cambiado a un color disponible en el enum
      mobileData: '15GB',
      sharedData: true,
      minutes: 'Ilimitados',
      sms: 'Ilimitados',
      referralIncome: 10,
      cashback: 3,
      price: 499,
      hasWhatsapp: true,
      hasInstagram: true,
      hasFacebook: true,
      hasMessenger: true,
      hasTiktok: true,
      hasX: true,
      hasTelegram: true,
      hasSnapchat: true,
    },
    {
      id: 4,
      name: 'Ultra',
      hasPromo: true,
      background: SlideBackground.BLUE,
      mobileData: '40GB',
      sharedData: false,
      minutes: 'Ilimitados',
      sms: 'Ilimitados',
      referralIncome: 10,
      cashback: 4,
      price: 699,
      hasWhatsapp: true,
      hasInstagram: true,
      hasFacebook: true,
      hasMessenger: true,
      hasTiktok: true,
      hasX: true,
      hasTelegram: true,
      hasSnapchat: true,
    },
    {
      id: 5,
      name: 'Elite',
      hasPromo: true,
      background: SlideBackground.CUSTOM,
      mobileData: '100GB',
      sharedData: true,
      minutes: 'Ilimitados',
      sms: 'Ilimitados',
      referralIncome: 10,
      cashback: 5,
      price: 999,
      hasWhatsapp: true,
      hasFacebook: true,
      hasMessenger: true,
      hasTelegram: true,
      hasSnapchat: true,
      hasInstagram: true,
      hasX: true,
      hasTiktok: true,
    }
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
        spaceBetween={50}
        slidesPerView={3}
        ref={swiperElRef}
        slides-per-view="auto"
        pagination="true"
        effect=""
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
