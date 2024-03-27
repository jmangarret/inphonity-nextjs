import React from "react";
import Image from "next/image";

type BenefitProps = {
  title?: string;
  description: string;
  image: string;
}

const Benefit: React.FC<BenefitProps> = ({title, description, image}) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className="flex items-center justify-center w-full h-30 sm:h-40"
      >
        <Image
          src={image}
          alt={title || description}
          width={100}
          height={100}
          className="mx-auto"
          style={{ width: "auto"}}
        />
      </div>

      {title && (
        <h3
          className="font-medium text-2xl lg:text-4xl mt-2 text-center text-highlight"
        >
          {title}
        </h3>
      )}
      <p
        className="text-center lg:text-xl mt-2"
      >
        {description}
      </p>
    </div>
  );
}

export default Benefit;
