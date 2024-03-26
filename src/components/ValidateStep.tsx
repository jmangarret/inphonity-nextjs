import React from "react";

type ValidateStepProps = {
  style?: React.CSSProperties;
  className?: string;
  step: number;
  title: string;
  children?: React.ReactNode;
};

const ValidateStep: React.FC<ValidateStepProps> = ({className, style, step, title, children}) => {
  return (
    <div
      style={style || {}}
      className={`${className || ''}`}
    >
      <div className="flex flex-col">
        <div className={'flex items-center gap-3 p-4'}>
          <div
            className={'flex-shrink-0 h-10 w-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 flex items-center justify-center rounded-full bg-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium'}
            style={{color: '#F79F1A'}}
          >
            {step}
          </div>
          <h4 className="text-lg md:text-xl lg:text-2xl xl:text-3xl  font-medium text-white">{title}</h4>
        </div>
        <div className="text-base px-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export default ValidateStep;
