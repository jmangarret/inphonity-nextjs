import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white text-xs lg:text-sm font-medium">
      <div className="text-xs md:text-base py-3 md:py-6 text-center lg:text-left" style={{background: '#298A9A'}}>
        <div
          className={`md:w-3/4 mx-auto grid grid-cols-8 gap-4`}
        >
          <div className="col-span-12 sm:col-span-4 lg:col-span-2 p-4">
            <Image
              src="/logo.svg"
              width={250}
              height={100}
              alt="Logo"
              className="mx-auto"
            />
          </div>
          <div className="col-span-12 sm:col-span-4 lg:col-span-2 p-4">
            <p className="footer-up-text">
              <Image
                src="/img/direccion-icon.svg"
                alt="Dirección"
                width={15}
                height={15}
                className="inline-block mr-2"
                style={{verticalAlign: "middle"}}
              />
              Ejercito Nacional Mexicano 904 Piso 12 CDMX
            </p>
          </div>
          <div className="col-span-12 sm:col-span-4 lg:col-span-2 p-4">
            <a href="tel:5592400295" className="footer-up-text">
              <Image
                src="/img/telefono-icon.svg"
                alt="Teléfono"
                width={20}
                height={20}
                className="inline-block mr-2"
                style={{verticalAlign: "middle"}}
              />
              55 9240 0295
            </a>
          </div>
          <div className="col-span-12 sm:col-span-4 lg:col-span-2 p-4">
            <p className="footer-up-text">
              <a href="mailto:hola@inphonity.com">
                <Image
                  src="/img/email-icon.svg"
                  alt="Email"
                  width={15}
                  height={15}
                  className="inline-block mr-2"
                  style={{verticalAlign: "middle"}}
                />
                hola@inphonity.com
              </a>
            </p>
            {/* <div className="button-container mb-6">
              <a
                href="mailto:hola@inphonity.com"
                className={`button font-medium w-full block text-center`}
              >
                Contáctanos
              </a>
            </div> */}
          </div>
        </div>
      </div>

      <nav className="container mx-auto p-4 text-center">
        <ul className="flex flex-wrap items-center justify-center">
          <li className="w-1/2 border-gray-400 border-r lg:w-auto px-5 lg:px-4 mb-3 text-right">
            <a
              href="https://inphonity.com/faq"
              className={`text-black`}
            >
              Centro de ayuda
            </a>
          </li>
          <li className="w-1/2 lg:w-auto px-5 mb-3 text-left border-gray-400 lg:border-r">
            <a
              href="https://altanredes.com/mapas/mapa.html"
              className="text-black"
            >
              Mapa de cobertura
            </a>
          </li>
          <li className="w-1/2 border-gray-400 border-r lg:w-auto px-5 mb-3 text-right">
            <a href="#" className="text-black">Políticas</a>
          </li>
          <li className="w-1/2 lg:w-auto px-5 mb-3 text-left">
            <a href="#" className="text-black">Legal</a>
          </li>
          <li className="w-full px-5 mt-5 mb-4 lg:mt-0">
            <a href="#" className="text-black">Copyright Operadora de Servicios Móviles Jasan, S. de R.L. de C.V.®
              2023</a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
