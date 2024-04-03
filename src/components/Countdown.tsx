"use client";
import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  expiresAt: string; // Debe ser una cadena en el formato de fecha adecuado
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ expiresAt }) => {
  const [timeLeft, setTimeLeft] = useState<{ hours: number, minutes: number, seconds: number }>({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const expiration = new Date(expiresAt);
      const difference = expiration.getTime() - now.getTime();

      if (difference > 0) {
        const hoursLeft = Math.floor(difference / (1000 * 60 * 60));
        const minutesLeft = Math.floor((difference / (1000 * 60)) % 60);
        const secondsLeft = Math.floor((difference / 1000) % 60);

        setTimeLeft({
          hours: hoursLeft,
          minutes: minutesLeft,
          seconds: secondsLeft
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  return (
    <div className="w-1/3 mx-auto">
      <div className="grid grid-cols-5 gap-2 text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-center">
        <div className="col-span-1">
          <span className="block font-medium">{timeLeft.hours}</span>
          <span className="text-xs md:text-sm lg:text-base xl:text-lg">Horas</span>
        </div>
        <div className="col-span-1">
          <span>:</span>
        </div>
        <div className="col-span-1">
          <span className="block font-medium">{timeLeft.minutes}</span>
          <span className="text-xs md:text-sm lg:text-base xl:text-lg">Minutos</span>
        </div>
        <div className="col-span-1">
          <span>:</span>
        </div>
        <div className="col-span-1">
          <span className="block font-medium">{timeLeft.seconds}</span>
          <span className="text-xs md:text-sm lg:text-base xl:text-lg">Segundos</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
