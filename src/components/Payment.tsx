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
    <div className="flex flex-col items-center w-80 h-96 rounded-[1.25rem] border border-white bg-white shadow-md">
      <div
        className="flex items-center justify-center mt-[2.625rem] mb-10 mx-[7.313rem] w-[5.375rem] h-[3.75rem]"
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
          className="font-medium text-xl lg:text-3xl text-center text-black"
        >
          {title}
        </h3>
      )}
      <p
        className="text-black text-center text-xl mt-6 mx-5"
      >
        {description}
        {action}
      </p>
    </div>
  );
}

export default Payment;
