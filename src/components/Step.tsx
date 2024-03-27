import React from "react";

type StepProps = {
  step: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const Step: React.FC<StepProps> = ({step, children, style, className}) => {
  return (
    <div
      className={`sm:col-span-2 p-3 md:p-4 lg:p-5 xl:p-6 ml-3 md:ml-6 lg:ml-9 xl:ml-12 flex items-center rounded-tl-full rounded-bl-full font-medium mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-7 ${className || ''}`}
      style={style || {}}
    >
      <div
        className="flex items-center justify-center w-12 h-12"
      >
        <p
          className="text-white font-bold text-6xl"
        >
          {step}
        </p>
      </div>
      <p
        className="ml-4 text-sm md:text-base lg:text-lg xl:text-xl font-light sm:font-extralight"
      >
        {children}
      </p>
    </div>
  );
};

export default Step;
