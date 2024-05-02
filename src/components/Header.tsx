import Image from "next/image";

type HeaderProps = {
  centerLogo?: boolean;
};

const Header: React.FC<HeaderProps> = ({ centerLogo = false }) => {
  return (
    <header className="mt-10">
      <nav className={`container mx-auto px-4 py-9 flex justify-${centerLogo ? 'center' : 'between'} items-center`}>
        <div>
          <Image
            src="/logo.svg"
            alt="Logotipo de Inphonity"
            width={203}
            height={29.4}
            priority
          />
        </div>
        <div></div>
      </nav>
    </header>
  );
}

export default Header;
