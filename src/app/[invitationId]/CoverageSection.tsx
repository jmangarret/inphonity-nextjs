import Coverage from "@/components/Coverage";

export default function CoverageSection() {
  return (
    <section className="container mx-auto py-10 md:py-16 lg:py-20 xl:py-24 p-3 sm:p-6 md:p-8 lg:p-10 xl:p-12">
      <div className="container mx-auto">
        <h2 className="font-medium text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl text-center">
          Nuestra <span className="text-highlight">cobertura</span> con la red de redes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4">
            <Coverage
              description={["Servicio respaldado por ", <p className='text-highlight'>Altán redes</p>]}
              image="/img/altan-redes-icon.svg"
            />
          </div>
          <div className="p-4">
            <Coverage
              description={["Cobertura ", <span className='text-highlight'>Nacional</span>]}
              image="/img/mexico-icon.svg"
            />
          </div>
          <div className="p-4">
            <Coverage
              description={["Navega, llama y textea en ",<span className='text-highlight'>EE.UU.</span>," y ",<span className='text-highlight'>Canadá</span>]}
              image="/img/avion-icon.svg"
            />
          </div>
          <div className="p-4">
            <Coverage
              description={["Tecnología y velocidad ",<p className='text-highlight'>4.5 G LTE</p>]}
              image="/img/radar-icon.svg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
