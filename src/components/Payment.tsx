import React from "react";
import Image from "next/image";

type PaymentProps = {
  title?: string;
  description: string;
  image: string;
  action?: React.ReactNode;
}

const Payment: React.FC<PaymentProps> = ({ title, description, image, action }) => {
  return (
    <div className="flex flex-col items-center w-80 h-96 rounded-lg border border-white bg-white shadow-md p-10 md:p-0">
      <div
        className="flex items-center justify-center w-full h-30 sm:h-40"
      >
        <Image
          src={image}
          alt={title || description}
          width={100}
          height={100}
          className="mx-auto"
          style={{ width: "auto" }}
        />
      </div>

      {title && (
        <h3
          className="font-medium text-xl lg:text-3xl mt-10 md:mt-2 text-center text-black"
        >
          {title}
        </h3>
      )}
      <p
        className="text-black text-center lg:text-xl mt-10 md:mt-4 mx-5"
      >
        {description}
        {action}
      </p>
    </div>
  );
}

export default Payment;
