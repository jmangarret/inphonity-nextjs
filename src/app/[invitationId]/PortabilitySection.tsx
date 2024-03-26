import Step from "@/components/Step";
import SimCard from "@/components/SimCard";

export default function PortabilitySection() {
  return (
    <section className="mb-10 md:mb-16 lg:mb-20 xl:mb-24 bg-diagonal-gradient">
      <div className="grid grid-cols-10">
        <div className="col-span-10 text-center p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7">
          <h2 className="font-medium text-2xl sm:text-3xl lg:text-5xl xl:text-8xl mb-3 lg:mb-5 mt-6 lg:mt-8 xl:mt-10">
            Conserva tu número
          </h2>
          <p className="font-medium	text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl mb-5 md:mb-8 lg:mb-11 xl:mb-14">
            Una vez que tengas tu SIM o eSIM de inphonity, podrás realizar la portabilidad de tu número
          </p>
        </div>
        <div className="col-span-10 sm:col-span-4">
          <SimCard />
        </div>
        <div className="col-span-10 sm:col-span-6">
          <Step
            step={1}
            style={{backgroundColor: "#F2472F"}}
          >
            Llama al 051 o manda un SMS con la palabra &quot;nip&quot; desde la SIM de tu compañía anterior.
          </Step>
          <Step
            step={2}
            style={{backgroundColor: "#007F8E"}}
          >
            Recibirás un código de 4 dígitos.
          </Step>
          <Step
            step={3}
            style={{backgroundColor: "#FFAE39"}}
          >
            Realiza tu portabilidad desde nuestra App, sitio web <a href="https://www.inphonity.com" target="_blank" className="hover:underline">www.inphonity.com</a> o marcando <a
            href="tel:*4444" className="hover:underline">*4444</a> desde tu línea inphonity.
          </Step>
        </div>
      </div>
    </section>
  );
}
