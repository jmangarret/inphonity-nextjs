"use client";
import PersonalDataForm from "@/components/PersonalDataForm";
import ShippingForm from "@/components/ShippingForm";
import TaxDataForm from "@/components/TaxDataForm";
import AccountDataForm from "@/components/AccountDataForm";
import PaymentForm from "@/components/PaymentForm";
import PlusDecoration from "@/components/PlusDecoration";
import {useAppSelector} from "@/lib/hooks";

export default function RegisterForms({invitationId}: { invitationId: string }) {
  const personalData = useAppSelector((state) => state.personalData);
  const shipping = useAppSelector((state) => state.shipping);
  const taxData = useAppSelector((state) => state.taxData);
  const accountData = useAppSelector((state) => state.accountData);

  return (
    <section
      className={'py-4 sm:py-5 md:py-6 lg:py-7 xl:py-8 bg-white'}
    >
      <div className={'mx-auto max-w-screen-xl grid grid-cols-12'}>
        {/* personal data */}
        <div className="hidden md:flex md:col-span-1 justify-center items-center">
          {/* PlusDecoration */}
          <PlusDecoration
            isGreen
            className="w-9 md:w-12 lg:w-16 xl:w-20 relative"
            style={{top: '-10%'}}
          />
        </div>
        <div className="col-span-12 md:col-span-10 text-black">
          {/* forms */}
          <PersonalDataForm/>
        </div>
        <div className="hidden md:flex md:col-span-1 justify-center items-center">
          {/* PlusDecoration */}
          <PlusDecoration
            isGreen
            className={'w-6 md:w-8 lg:w-12 xl:w-17 relative'}
            style={{top: '15%'}}
          />
        </div>

        {/* shipping */}
        {personalData.showShippingForm && (
          <>
            <div className="hidden md:flex md:col-span-1 justify-center items-center">
              {/* PlusDecoration */}
              <PlusDecoration
                isGreen
                className={'w-6 md:w-8 lg:w-12 xl:w-17 relative'}
                style={{top: '15%'}}
              />
            </div>
            <div className="col-span-12 md:col-span-10 text-black">
              {/* forms */}
              <ShippingForm/>
            </div>
            <div className="hidden md:flex md:col-span-1 justify-center items-center">
              {/* PlusDecoration */}
              <PlusDecoration
                isGreen
                className="w-6 md:w-8 lg:w-12 xl:w-17 relative"
                style={{top: '-10%'}}
              />
            </div>
          </>
        )}

        {/* tax data notice */}
        {shipping.showTaxDataForm && (
          <>
            <div className="hidden md:flex md:col-span-1 justify-center items-center">
              {/* PlusDecoration */}
              <PlusDecoration
                isGreen
                className={'w-6 md:w-8 lg:w-12 xl:w-17 relative'}
                style={{top: '36%'}}
              />
            </div>
            <div className="col-span-12 md:col-span-10 mb-20">
              {/* notice */}
              <div className="text-white m-3 pb-2.5 text-center font-medium">
                <h3 className={`text-highlight-red text-3xl`}>
                  Aviso importante
                </h3>
              </div>
              <div className="lg:container bg-white p-8 text-black rounded-md mx-auto w-[90%] lg:w-[80%] border-2 border-[#EB522D]">
                <p className={`text-base leading-none`}>
                  <span className="font-medium">Importante: </span>
                  Es necesario que tengas RFC con homoclave para que podamos realizar los pagos de tu cashback. Si aún
                  no lo tienes, cuentas con 90 días naturales para tramitarlo, de lo contrario no podrás recibir el beneficio del cashback.
                </p>
                <p className={`text-base leading-none`}>
                  También es necesario que cuentes con tu Constancia de Situación Fiscal actualizada y que se encuentre
                  dentro del régimen de Asimilados al Salario.
                </p>
              </div>
            </div>
            <div className="hidden md:flex md:col-span-1 justify-center items-center">
              {/* PlusDecoration */}
            </div>
            {/* tax data */}
            <div className="hidden md:flex md:col-span-1 justify-center items-center">
              {/* PlusDecoration */}
              <PlusDecoration
                isGreen
                className={'w-6 md:w-8 lg:w-12 xl:w-17 relative'}
                style={{top: '15%'}}
              />
            </div>
            <div className="col-span-12 md:col-span-10 text-black">
              {/* forms */}
              <TaxDataForm/>
            </div>
            <div className="hidden md:flex md:col-span-1 justify-center items-center">
              {/* PlusDecoration */}
              <PlusDecoration
                isGreen
                className="w-9 md:w-12 lg:w-16 xl:w-20 relative"
                style={{top: '-10%'}}
              />
            </div>
          </>
        )}

        {taxData.showAccountDataForm && (
          <>
            {/* account data */}
            <div className="hidden md:flex md:col-span-1 justify-center items-center">
              {/* PlusDecoration */}
              <PlusDecoration
                isGreen
                className="w-7 md:w-9 lg:w-11 xl:w-13 relative"
                style={{top: '-10%'}}
              />
            </div>
            <div className="col-span-12 md:col-span-10 text-black">
              {/* forms */}
              <AccountDataForm/>
            </div>
            <div className="hidden md:flex md:col-span-1 justify-center items-center">
              {/* PlusDecoration */}
              <PlusDecoration
                isGreen
                className={'w-12 md:w-14 lg:w-16 xl:w-18 relative'}
                style={{top: '15%'}}
              />
            </div>
          </>
        )}

        {accountData.showPaymentForm && (
          <>
            {/* payment */}
            <div className="hidden md:flex md:col-span-1 justify-center items-center">
              {/* PlusDecoration */}
              <PlusDecoration
                isGreen
                className="w-9 md:w-12 lg:w-16 xl:w-20 relative"
                style={{top: '-10%'}}
              />
            </div>
            <div className="col-span-12 md:col-span-10 text-black">
              {/* forms */}
              <PaymentForm
                invitationId={invitationId}
              />
            </div>
            <div className="hidden md:flex md:col-span-1 justify-center items-center">
              {/* PlusDecoration */}
              <PlusDecoration
                isGreen
                className={'w-6 md:w-8 lg:w-12 xl:w-17 relative'}
                style={{top: '15%'}}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
