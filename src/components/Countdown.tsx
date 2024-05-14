"use client";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  expiresAt: string; // Debe ser una cadena en el formato de fecha adecuado
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ expiresAt }) => {
  const [timeLeft, setTimeLeft] = useState<{ hours: string, minutes: string, seconds: string }>({
    hours:"00",
    minutes: "00",
    seconds:"00"
  });

  const formatNumber = (value: number) => {
    // Agrega un cero delante si el valor es un solo dígito
    return value.toString().padStart(2, '0');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const expiration = new Date(expiresAt);
      const difference = expiration.getTime() - now.getTime();

      if (difference > 0) {
        const hoursLeft = Math.floor(difference / (1000 * 60 * 60));
        const minutesLeft = Math.floor((difference / (1000 * 60)) % 60);
        const secondsLeft = Math.floor((difference / 1000) % 60);

        const formattedHours = formatNumber(hoursLeft);
        const formattedMinutes = formatNumber(minutesLeft);
        const formattedSeconds = formatNumber(secondsLeft);

        setTimeLeft({
          hours: formattedHours,
          minutes: formattedMinutes,
          seconds: formattedSeconds
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);

  }, [expiresAt]);

  return (
    <div className="flex justify-center">
      <div className="grid grid grid-flow-col auto-cols-min sm:auto-cols-auto md:auto-cols-max gap-1 text-4xl sm:text-6xl lg:text-8xl text-center">
        <div className="col-span-2 flex flex-col w-[4.375rem] md:w-[8rem]">
          <span className="text-black block font-medium">{timeLeft.hours}</span>
          <span className="text-sm lg:text-base xl:text-lg text-black mt-2.5">Horas</span>
        </div>
        <div className="col-span-1 w-4 lg:w-[0.438rem]">
          <Image
            src="/img/puntos.svg"
            alt="puntos"
            width={7}
            height={23}
            className="inline align-middle"
          />
        </div>
        <div className="col-span-2 flex flex-col w-[4.375rem] md:w-[8rem]">
          <span className="text-black block font-medium">{timeLeft.minutes}</span>
          <span className="text-sm lg:text-base xl:text-lg text-black mt-2.5">Minutos</span>
        </div>
        <div className="col-span-1 w-4 lg:w-[0.438rem]">
          <Image
              src="/img/puntos.svg"
              alt="puntos"
              width={7}
              height={23}
              className="inline align-middle"
            />
        </div>
        <div className="col-span-2 flex flex-col w-[4.375rem] md:w-[8rem]">
          <span className="text-black block font-medium">{timeLeft.seconds}</span>
          <span className="text-sm lg:text-base xl:text-lg text-black mt-2.5">Segundos</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
