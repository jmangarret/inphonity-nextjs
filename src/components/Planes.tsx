"use client";
import { useGetPlansQuery } from "@/lib/services/plansApi";
import PlanCard from './PlanCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Planes = () => {

  const {data} = useGetPlansQuery(null);
  const planes = data?.filter(d => d.type == 'plan')

  return (
    <div className="w-full px-2 2xl:px-24 bg-transparent mb-20">
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={1}
      slidesPerView={1}
      centeredSlides={true}
      navigation
      grabCursor
      speed={600}
      pagination={{ clickable: true }}
      centeredSlidesBounds={true}
      loop={true}
      autoplay
      breakpoints={{
        640: {
          slidesPerView: 1,
          spaceBetween: 3,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 3,
        },
        1280: {
          slidesPerView: 3,
          spaceBetween: 5,
        },
        1536: {
          slidesPerView: 3,
          spaceBetween: 5,
        }
      }}
    >
      {planes && planes.map((plan) => (
        <SwiperSlide key={plan.id}>
          <PlanCard key={plan.id} {...plan} />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
  );
};

export default Planes;
