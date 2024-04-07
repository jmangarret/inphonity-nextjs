"use client";

import { useEffect, useRef, useState } from "react";

export default function SimCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const top = containerRef.current?.getBoundingClientRect().top || 0;
      const bottom = containerRef.current?.getBoundingClientRect().bottom || 0;

      if (top >= 0 && bottom <= window.innerHeight) {
        setIsVisible(true);

        setTimeout(() => {
          setIsVisible(false);

          window.removeEventListener('scroll', handleScroll);
        }, 2000);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`flip-container ${isVisible ? 'hover' : ''}`}
    >
      <div className="flipper">
        <div className="front">
          <picture>
            <source
              width="600"
              media="(max-width: 600px)"
              srcSet="/img/sim-card-frente-angulo.png"
            />
            <source
              width="800"
              media="(min-width: 1200px)"
              srcSet="/img/sim-card-frente-angulo.png"
            />
            <img
              width="720"
              src="/img/sim-card-frente-angulo.png"
              alt="SIM card frente"
            />
          </picture>
        </div>
        <div className="back">
          <picture>
            <source
              width="600"
              media="(max-width: 600px)"
              srcSet="/img/sim-card-atras-720x506.webp"
            />
            <source
              width="800"
              media="(min-width: 1200px)"
              srcSet="/img/sim-card-atras-1080x759.webp"
            />
            <img
              width="720"
              src="/img/sim-card-atras-720x506.webp"
              alt="SIM card atrás"
            />
          </picture>
        </div>
      </div>
    </div>
  );
}
