import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white text-xs lg:text-sm font-medium">
      <div className="text-xs md:text-base py-3 md:py-6 text-center lg:text-left" style={{ background: '#298A9A' }}>
        <div
          className={`container mx-auto grid grid-cols-12 gap-3 flex items-center`}
        >
          <div className="col-span-12 sm:col-span-6 lg:col-span-3 md:col-span-6 text-center flex flex-col items-center">
            <Image
              src="/logo.svg"
              width={180}
              height={100}
              alt="Logo"
              className="mx-auto"
            />
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 md:col-span-6 text-center flex flex-col items-center">
            <p className="footer-up-text">
              <Image
                src="/img/direccion-icon.svg"
                alt="Dirección"
                width={15}
                height={15}
                className="inline-block mr-2"
                style={{ verticalAlign: "middle" }}
              />
              Ejercito Nacional Mexicano 904 Piso 12 CDMX
            </p>
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-2 md:col-span-6 text-center flex flex-col items-center">
            <a href="tel:5592400295" className="footer-up-text">
              <Image
                src="/img/telefono-icon.svg"
                alt="Teléfono"
                width={12}
                height={12}
                className="inline-block mr-2"
                style={{ verticalAlign: "middle" }}
              />
              55 9240 0295
            </a>
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-2 md:col-span-6 text-center flex flex-col items-center">
            <p className="footer-up-text">
              <a href="mailto:hola@inphonity.com">
                <Image
                  src="/img/email-icon.svg"
                  alt="Email"
                  width={15}
                  height={15}
                  className="inline-block mr-2"
                  style={{ verticalAlign: "middle" }}
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

      <nav className="container mx-auto p-4 text-center flex items-center">
        <ul className="flex flex-wrap items-center justify-center mx-auto">
          <li className="w-1/2 border-gray-400 border-r md:mb-4 lg:my-4 xl:my-2 sm:my-4 my-4 lg:w-auto px-5 lg:px-5 text-center flex flex-col items-center">
            <a
              href="https://inphonity.com/faq"
              className={`text-negro footer-up-text`}
            >
              Centro de ayuda
            </a>
          </li>
          <li className="w-1/2 lg:w-auto px-5 lg:px-5 text-center md:mb-4 lg:my-4 xl:my-2 sm:my-4 my-4 border-gray-400 lg:border-r flex flex-col items-center">
            <a
              href="https://altanredes.com/mapas/mapa.html"
              className="text-negro footer-up-text"
            >
              Mapa de cobertura
            </a>
          </li>
          <li className="w-1/2 border-gray-400 border-r md:mb-4 lg:my-4 xl:my-2 sm:my-4 my-4 lg:w-auto px-5 lg:px-5 text-center flex flex-col items-center">
            <a href="#" className="text-negro footer-up-text">Políticas</a>
          </li>
          <li className="w-1/2 lg:w-auto px-5 lg:px-5 text-center md:mb-4 lg:my-4 xl:my-2 sm:my-4 my-4 border-gray-400 lg:border-r flex flex-col items-center">
            <a href="#" className="text-negro footer-up-text">Legal</a>
          </li>
          <li className="px-5 lg:px-5 mt-5 lg:mt-0 flex flex-col items-center md:mb-4 lg:my-4 xl:my-2 sm:my-4 my-4 text-center">
            <a href="#" className="text-negro footer-up-text">Copyright Operadora de Servicios Móviles Jasan, S. de R.L. de C.V.®
              2023</a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
