import Step from "@/components/Step";
import SimCard from "@/components/SimCard";

export default function PortabilitySection() {
  return (
    <section className="mb-10 md:mb-16 lg:mb-20 xl:mb-24">
      <div className="grid grid-cols-10">
        <div className="col-span-10 text-center p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7">
          <h2 className="font-medium text-2xl sm:text-3xl lg:text-6xl xl:text-6xl mb-3 lg:mb-5 mt-6 lg:mt-8 xl:mt-10">
          <span className="text-highlight">Conserva</span> tu número
          </h2>
          <p className="font-extralight text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl">
            Una vez que tengas tu SIM o eSIM de inphonity, 
          </p>
          <p className="font-medium text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl mb-5 md:mb-8 lg:mb-11 xl:mb-14">
            podrás realizar la <span className="text-highlight">portabilidad</span> de tu número
          </p>
        </div>
        <div className="col-span-10 sm:col-span-4">
          <SimCard />
        </div>
        <div className="col-span-10 sm:col-span-6">
          <Step
            step={1}
            // style={{backgroundColor: "#F2472F"}}
            className={'bg-gradient-to-r from-black to-gray-700 border-l-2 border-t-2 border-b-2 border-amber-800'}
          >
            Llama al <span className="font-medium">051</span> o manda un <span className="font-medium">SMS</span> con la palabra <span className="font-medium">&quot;nip&quot;</span> desde la <span className="font-medium">SIM de tu compañía anterior.</span>
          </Step>
          <Step
            step={2}
            // style={{backgroundColor: "#007F8E"}}
            className={'bg-gradient-to-r from-black to-gray-700 border-l-2 border-t-2 border-b-2 border-teal-400'}
          >
            Recibirás un <span className="font-medium">código de 4 dígitos.</span>
          </Step>
          <Step
            step={3}
            // style={{backgroundColor: "#FFAE39"}}
            className={'bg-gradient-to-r from-black to-gray-700 border-l-2 border-t-2 border-b-2 border-amber-400'}
          >
            Realiza tu portabilidad desde nuestra App, sitio web <a href="https://www.inphonity.com" target="_blank" className="hover:underline"><span className="font-medium">www.inphonity.com</span></a> o marcando <a
            href="tel:*4444" className="hover:underline"><span className="font-medium">*4444</span></a> <span className="font-medium">desde tu línea inphonity.</span>
          </Step>
        </div>
      </div>
    </section>
  );
}
