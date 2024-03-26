import Image from "next/image";
import React from "react";

type PlusDecorationProps = {
  style?: React.CSSProperties;
  className?: string;
  isGreen?: boolean;
};

const PlusDecoration: React.FC<PlusDecorationProps> = ({className, style, isGreen}) => {

  return (
    <div
      style={style || {}}
      className={`${className || ''}`
    }>
      {isGreen ? (
        <Image
          src="/img/green-plus.svg"
          alt="Plus Decoration"
          width={300}
          height={300}
          className="w-full"
        />
      ) : (
        <Image
          src="/img/plus.svg"
          alt="Plus Decoration"
          width={300}
          height={300}
          className="w-full"
        />
      )}
    </div>
  );
}

export default PlusDecoration;
