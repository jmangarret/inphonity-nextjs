import Image from "next/image";
import React from "react";

type FloatingDecorationProps = {
    style?: React.CSSProperties;
    className?: string;
    img: string
    customClass?: string;
};

export default function FloatingDecoration ({ className, style, img, customClass } : FloatingDecorationProps) {

    return (
        <div
            style={style || {}}
            className={`${className || ''}`
            }>

            <Image
                src={img}
                alt="Floating Decoration"
                width={300}
                height={300}
                className={`w-full ${customClass}`}
            />

        </div>
    );
}


