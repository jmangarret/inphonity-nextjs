import React from "react";
import Image from "next/image";

type CoverageProps = {
  description: any[];
  image: string;
}

const Coverage: React.FC<CoverageProps> = ({ description, image }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center w-full h-30 sm:h-40">
        <Image
          alt={''}
          src={image}
          width={200}
          height={200}
          className="mx-auto"
          style={{ width: "auto" }}
        />
      </div>
      <div className="text-black text-center lg:text-xl mt-2">
        {
          description.map((textOrHTML, index) => <span key={index}>{textOrHTML}</span>)
        }
      </div>
    </div>
  );
}

export default Coverage;
