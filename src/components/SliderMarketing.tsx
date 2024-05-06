import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const Slider: React.FC<{ slides: string[] }> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides]);

  return (
    <ul className="slider">
      {slides.map((slide, index) => (
        <li
          key={index}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
        >
            <Image
              src={`/img/${slide}`}
              alt="info check"
              width={2000}
              height={2000}
              className="inline"
            />
        </li>
      ))}
    </ul>
  );
};

const SliderMarketing: React.FC = () => {
  const slideContents = ['Cashback-1.jpg', 'crecen.jpg', 'cambiar-linea.jpg'];
  return (
    <>
      <div>
        <Slider slides={slideContents} />
      </div>
      <div className='bg-white'>
        <br />
        <br />
        <br />
      </div>
    </>
  );
};

export default SliderMarketing;