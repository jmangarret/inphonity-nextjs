import Benefit from "@/components/Benefit";
import PlusDecoration from "@/components/PlusDecoration";

export default function BenefitsSection() {
  return (
    <section className="container mx-auto mb-10 md:mb-16 lg:mb-20 xl:mb-24">
      <div className="grid grid-cols-10 md:mb-10 lg:mb-15 xl:mb-20">
        <div className="col-span-2">
          <PlusDecoration
            className="my-3 lg:my-4 w-3 sm:w-6 md:w-8 lg:w-10 xl:w-12 mx-auto"
          />
        </div>
        <div className="col-span-6">
          <h2 className="font-medium text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl mb-5 text-center">
            Si puedes tener
            <br/>
            <span
              className="text-highlight text-2xl sm:text-3xl lg:text-5xl xl:text-8xl">más de lo que te imaginas:</span>
          </h2>
        </div>
        <div className="col-span-2">
          <PlusDecoration
            className="relative my-6 md:my-9 lg:my-12 left-1/3 w-6 sm:w-8 md:w-10 lg:w-12 xl:w-14"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className="p-4"
        >
          <Benefit
            title="Cashback"
            description="Recibe dinero por invitar a tus amigos"
            image="/img/cashback-icon.svg"
          />
        </div>
        <div
          className="p-4"
        >
          <Benefit
            title="Libertad"
            description="Sin plazos forzosos"
            image="/img/libertad-icon.svg"
          />
        </div>
        <div
          className="p-4"
        >
          <Benefit
            title="Atención"
            description="Personalizada"
            image="/img/atencion-icon.svg"
          />
        </div>
        <div
          className="p-4"
        >
          <Benefit
            title="Círculo inphonity"
            description="Comunidad y experiencias exclusivas"
            image="/img/circulo-inphonity-icon.svg"
          />
        </div>
      </div>
      <div className="grid grid-cols-10 md:mb-10 lg:mb-15 xl:mb-20">
        <div className="col-span-2">
        </div>
        <div className="col-span-6">
        </div>
        <div className="col-span-2">
          <PlusDecoration
            className="my-5 lg:my-10 lg:my-4 w-3 sm:w-6 md:w-8 lg:w-10 xl:w-12 ml-auto mr-6 md:mr-0"
          />
        </div>
      </div>
    </section>
  );
}
