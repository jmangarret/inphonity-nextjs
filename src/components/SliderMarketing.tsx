"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

const SliderMarketing: React.FC = () => {
  const imagesWeb = [
    {
      original: "/img/nosotros_desktop.jpg",
    },
    {
      original: "/img/bg-header-portability.jpg",
    },
    {
      original: "/img/circulo_desktop.jpg",
    },
    {
      original: "/img/bg-header-plans.jpg",
    }
  ];

  const imagesMobil = [
    {
      original: "/img/nosotros_mobile.png",
    },
    {
      original: "/img/bg-header-portability-sm.png",
    },
    {
      original: "/img/circulo_mobile.png",
    },
    {
      original: "/img/bg-header-plans-sm.png",
    }
  ];

  return (
    <div>
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        slidesPerView={1}
        loop={true}
        autoplay
        grabCursor
        navigation
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <picture>
            <source srcSet={imagesWeb[0].original} media="(min-width: 1024px)"></source>
            <source srcSet={imagesWeb[0].original} media="(min-width: 768px)"></source>
            <source srcSet={imagesMobil[0].original} media="(min-width: 377px)"></source>
            <img className="bg-white thumbnail" src={imagesMobil[0].original} alt='Imagen' width={1920} height={400} />
          </picture>
        </SwiperSlide>

        <SwiperSlide>
          <picture>
            <source srcSet={imagesWeb[1].original} media="(min-width: 1024px)"></source>
            <source srcSet={imagesWeb[1].original} media="(min-width: 768px)"></source>
            <source srcSet={imagesMobil[1].original} media="(min-width: 377px)"></source>
            <img className="bg-white thumbnail" src={imagesMobil[1].original} alt='Imagen' width={1920} height={400} />
          </picture>
        </SwiperSlide>
        <SwiperSlide>
          <picture>
            <source srcSet={imagesWeb[2].original} media="(min-width: 1024px)"></source>
            <source srcSet={imagesWeb[2].original} media="(min-width: 768px)"></source>
            <source srcSet={imagesMobil[2].original} media="(min-width: 377px)"></source>
            <img className="bg-white thumbnail" src={imagesMobil[2].original} alt='Imagen' width={1920} height={400} />
          </picture>
        </SwiperSlide>
        <SwiperSlide>
          <picture>
            <source srcSet={imagesWeb[3].original} media="(min-width: 1024px)"></source>
            <source srcSet={imagesWeb[3].original} media="(min-width: 768px)"></source>
            <source srcSet={imagesMobil[3].original} media="(min-width: 377px)"></source>
            <img className="bg-white thumbnail" src={imagesMobil[3].original} alt='Imagen' width={1920} height={400} />
          </picture>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SliderMarketing;