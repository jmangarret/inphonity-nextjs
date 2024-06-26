import Coverage from "@/components/Coverage";

export default function CoverageSection() {
  return (
    <section className="bg-white mx-auto py-10 md:pb-16 lg:pb-20 xl:pb-24 px-3 sm:py-0 sm:px-6 md:px-8 lg:px-10 xl:px-12">
      <div className="container mx-auto bg-white">
        <h2 className="text-black font-medium text-2xl lg:text-3xl xl:text-5xl text-center">
          Nuestra cobertura con la <span className="text-custom-blue font-medium">red de redes</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4">
            <Coverage
              description={["Servicio respaldado por ", <p className='text-custom-blue font-medium'>Altán redes</p>]}
              image="/img/altan-redes-icon1.svg"
            />
          </div>
          <div className="p-4">
            <Coverage
              description={["Cobertura ", <span className='text-custom-blue font-medium'>Nacional</span>]}
              image="/img/mexico-icon1.svg"
            />
          </div>
          <div className="p-4">
            <Coverage
              description={["Navega, llama y textea en ", <span className='text-custom-blue font-medium'>EE.UU.</span>, " y ", <span className='text-custom-blue font-medium'>Canadá</span>]}
              image="/img/avion-icon1.png"
            />
          </div>
          <div className="p-4">
            <Coverage
              description={["Tecnología y velocidad ", <p className='text-custom-blue font-medium'>4.5 G LTE</p>]}
              image="/img/radar-icon1.svg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
