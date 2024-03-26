import Benefit from "@/components/Benefit";

export default function CoverageSection() {
  return (
    <section
      className="py-10 md:py-16 lg:py-20 xl:py-24 p-3 sm:p-6 md:p-8 lg:p-10 xl:p-12"
      style={{backgroundColor: "#007F8E"}}
    >
      <div className="container mx-auto">
        <h2
          className="w-2/3 font-medium text-2xl sm:text-3xl lg:text-5xl xl:text-8xl mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-7 lg:mb-5 mt-6 lg:mt-8 xl:mt-10 text-center mx-auto"
        >
          Nuestra cobertura con la <span style={{color: "#F9D08B"}}>red de redes</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            className="p-4"
          >
            <Benefit
              description="Servicio respaldado por Altán redes"
              image="/img/altan-redes-icon.svg"
            />
          </div>
          <div
            className="p-4"
          >
            <Benefit
              description="Cobertura Nacional"
              image="/img/mexico-icon.svg"
            />
          </div>
          <div
            className="p-4"
          >
            <Benefit
              description="Navega, llama y textea en EE.UU. y Canadá"
              image="/img/avion-icon.svg"
            />
          </div>
          <div
            className="p-4"
          >
            <Benefit
              description="Tecnología y velocidad 4.5 G"
              image="/img/radar-icon.svg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
