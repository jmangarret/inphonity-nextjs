"use client";
import { register, SwiperContainer } from "swiper/element/bundle";
import { useEffect, useRef } from "react";
import Slide, { SlideBackground, SlideProps } from "@/components/Slide";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

register();

const SliderMarketing = () => {
  const swiperElRef = useRef<SwiperContainer>(null);

  useEffect(() => {
    // jump to second slide
    swiperElRef.current?.swiper.slideTo(0);

    // listen for Swiper events using addEventListener
    swiperElRef.current?.addEventListener("swiperprogress", (e: any) => {
      const [swiper, progress] = e.detail;
    });
    swiperElRef.current?.addEventListener("interchangeability", (e) => {});
    // watch click event
    swiperElRef.current?.addEventListener("click", (e: any) => {
      swiperElRef.current?.swiper.slideTo(
        swiperElRef.current?.swiper.clickedIndex
      );
    });
  }, []);

  return (
    <div className="slider-container">
      <swiper-container
        spaceBetween={50}
        slidesPerView={1}
        ref={swiperElRef}
        slides-per-view="1"
        navigation={true}
        modules={[Pagination, Navigation]}
        effect=""
        grab-cursor="true"
        centered-slides="true"
        speed="600"
      >
        <swiper-slide key={1}>
          <div className="w-full">
            <Image
              src="/img/Cashback-1.svg"
              alt="info check"
              width={2000}
              height={2000}
              className="inline"
            />
          </div>
        </swiper-slide>

        <swiper-slide key={2}>
          <div className="w-full">
            <Image
              src="/img/crecen.svg"
              alt="info check"
              width={2000}
              height={2000}
              className="inline"
            />
          </div>
        </swiper-slide>

        <swiper-slide key={3}>
          <div className="w-full">
            <Image
              src="/img/cambiar-linea.svg"
              alt="info check"
              width={2000}
              height={2000}
              className="inline"
            />
          </div>
        </swiper-slide>
      </swiper-container>
    </div>
  );
};

export default SliderMarketing;