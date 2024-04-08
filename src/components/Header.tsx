import Image from "next/image";

type HeaderProps = {
  centerLogo?: boolean;
};

const Header: React.FC<HeaderProps> = ({ centerLogo= false }) => {
  return (
    <header className="">
      <nav className={`container mx-auto px-4 py-9 flex justify-${centerLogo ? 'center' : 'between'} items-center`}>
        <div>
          <Image
            src="/logo.svg"
            alt="Logotipo de Inphonity"
            width={156.13}
            height={27.01}
            priority
          />
        </div>
        <div></div>
      </nav>
    </header>
  );
}

export default Header;
