"use client";
import { register, SwiperContainer } from 'swiper/element/bundle';
import { useEffect, useRef } from "react";
import Slide, { SlideBackground, SlideProps } from "@/components/Slide";
import { Navigation, Pagination } from 'swiper/modules';
import { useGetPlansQuery } from "@/lib/services/plansApi";
import PlanCard from './PlanCard';

register();

const Planes = () => {
  const swiperElRef = useRef<SwiperContainer>(null);
  // list of plans

  const {data, error, isFetching, isLoading} = useGetPlansQuery(null);

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
    // swiperElRef.current?.addEventListener('click', (e: any) => {
    //   swiperElRef.current?.swiper.slideTo(swiperElRef.current?.swiper.clickedIndex);
    // });
    // Función para manejar el clic en un elemento con la clase "click-listen"
    const handleClickListen = (e: any) => {
      // Verificar si el elemento clickeado tiene la clase "click-listen"
      if (e.target.classList.contains('click-listen')) {
        swiperElRef.current?.swiper.slideTo(swiperElRef.current?.swiper.clickedIndex);
      }
    };

    // Agregar un event listener para clics en elementos con la clase "click-listen"
    document.addEventListener('click', handleClickListen);

    // Eliminar el event listener cuando el componente se desmonta
    return () => {
      document.removeEventListener('click', handleClickListen);
    };
  }, []);

  return (
    <div className="slider-container">
      <swiper-container
        spaceBetween={50}
        slidesPerView={3}
        ref={swiperElRef}
        slides-per-view="auto"
        navigation={true}
        modules={[Pagination, Navigation]}
        effect=""
        grab-cursor="true"
        centered-slides="true"
        speed="600"
      >
        {data && data.map((plan) => (
          <swiper-slide
            key={plan.id}
          >
            <PlanCard
              {...plan}
            />
          </swiper-slide>
        ))}
      </swiper-container>
    </div>
  );
};

export default Planes;
