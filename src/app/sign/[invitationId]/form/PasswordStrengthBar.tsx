import Image from "next/image";
import { useEffect, useState } from "react";

type PasswordStrengthBarProps = {
  strength: string;
};

const PasswordStrengthBar: React.FC<PasswordStrengthBarProps> = ({ strength }) => {

  const [bar, setBar] = useState({ color: "", colorIcon: "", position: "" })

  useEffect(() => {
    switch (strength) {
      case 'débil':
        setBar({ color: "#F50D0D", colorIcon: "red", position: "0%" });

        break;
      case 'regular':
        setBar({ color: "#FFE174", colorIcon: "yellow", position: "calc(50% - 20px)" });

        break;
      case 'fuerte':
        setBar({ color: "#00BF63", colorIcon: "green", position: "calc(100% - 40px)" });

        break;
    }

  }, [strength])


  return (
    <div
      style={{ height: '20px', width: '100%', backgroundColor: '#ddd' }}
      className={`relative rounded-full`}
    >
      <div
        className={`relative rounded-full`}
        style={{ height: '100%', width: '100%', backgroundColor: bar.color }}
      />
      <Image
        src={`/img/password-strength-${bar.colorIcon}.svg`}
        alt="Password Strength"
        width={40}
        height={40}
        style={{ position: 'absolute', left: bar.position, top: '-10px' }}
      />
      <p className="text-base text-white text-center w-full my-3">
        Nivel de Seguridad - <span className="uppercase">{strength}</span>
      </p>
    </div>
  );
};

export default PasswordStrengthBar;