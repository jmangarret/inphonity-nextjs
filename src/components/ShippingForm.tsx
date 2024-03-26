"use client";
import React, {useEffect, useMemo, useRef} from "react";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {
  setIsEsim,
  setZipCode,
  setNeighborhood,
  setStreet,
  setNumber,
  setInteriorNumber,
  setComplement,
  setState,
  setCity,
  setShowTaxDataForm
} from "@/lib/features/shipping/shippingSlice";
import {
  setStreet as setTaxStreet,
  setExteriorNumber as setTaxExteriorNumber,
  setInteriorNumber as setTaxInteriorNumber,
  setNeighborhood as setTaxNeighborhood,
  setZipCode as setTaxZipCode,
  setTaxZipCode as setTaxTaxZipCode,
  setState as setTaxState,
  setMunicipality as setTaxMunicipality,
  setEmail as setTaxEmail,
  setName as setTaxName,
} from "@/lib/features/tax-data/taxDataSlice";
import Image from "next/image";


export default function ShippingForm() {
  const [myAddressAreEqual, setMyAddressAreEqual] = React.useState(false);
  const dispatch = useAppDispatch();
  const personalData = useAppSelector((state) => state.personalData);
  const plan = useAppSelector((state) => state.plan);
  const shipping = useAppSelector((state) => state.shipping);
  const fieldsOrder: (keyof typeof shipping)[] = useMemo(() => [
    'zipCode',
    'neighborhood',
    'street',
    'number',
    'state',
    'city',
  ], []);
  const inputRefs = useRef<{[key in keyof typeof shipping]: HTMLInputElement | HTMLSelectElement | null}>({} as {[key in keyof typeof shipping]: HTMLInputElement | null});
  const isValidForm = useMemo(() => {
    return !fieldsOrder.some(field => {
      if (!field.endsWith('Error')) {
        return !shipping[field as keyof typeof shipping];
      }
      return false;
    });
  }, [fieldsOrder, shipping]);

  useEffect(() => {
    const firstErrorField = fieldsOrder.find(field => shipping[`${field}Error` as keyof typeof shipping]);
    if (firstErrorField && inputRefs.current[firstErrorField]) {
      inputRefs.current[firstErrorField]!.focus();
    }
  }, [
    shipping.isEsimError,
    shipping.zipCodeError,
    shipping.neighborhoodError,
    shipping.streetError,
    shipping.numberError,
    shipping.interiorNumberError,
    shipping.complementError,
    shipping.stateError,
    shipping.cityError,
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case 'isEsim':
        dispatch(setIsEsim(value === 'true'));
        break;
      case 'zipCode':
        dispatch(setZipCode(value));
        break;
      case 'neighborhood':
        dispatch(setNeighborhood(value));
        break;
      case 'street':
        dispatch(setStreet(value));
        break;
      case 'number':
        dispatch(setNumber(value));
        break;
      case 'interiorNumber':
        dispatch(setInteriorNumber(value));
        break;
      case 'complement':
        dispatch(setComplement(value));
        break;
      case 'state':
        dispatch(setState(value));
        break;
      case 'city':
        dispatch(setCity(value));
        break;
      default:
        break;
    }
  }

  const handleNextForm = () => {
    dispatch(setShowTaxDataForm(true));
  }

  const handleMyAddressAreEqualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMyAddressAreEqual(e.target.checked);

    // fill tax data form with shipping data
    if (e.target.checked) {
      updateTaxAddressData();

      return;
    }

    emptyTaxAddressData();
  }

  const updateTaxAddressData = () => {
    dispatch(setTaxStreet(shipping.street));
    dispatch(setTaxExteriorNumber(shipping.number));
    dispatch(setTaxInteriorNumber(shipping.interiorNumber));
    dispatch(setTaxNeighborhood(shipping.neighborhood));
    dispatch(setTaxZipCode(shipping.zipCode));
    dispatch(setTaxTaxZipCode(shipping.zipCode));
    dispatch(setTaxState(shipping.state));
    dispatch(setTaxMunicipality(shipping.city));
    dispatch(setTaxEmail(personalData.email));
    dispatch(setTaxName(`${personalData.name} ${personalData.lastName} ${personalData.secondLastName}`));
  }

  const emptyTaxAddressData = () => {
    dispatch(setTaxStreet(''));
    dispatch(setTaxExteriorNumber(''));
    dispatch(setTaxInteriorNumber(''));
    dispatch(setTaxNeighborhood(''));
    dispatch(setTaxZipCode(''));
    dispatch(setTaxTaxZipCode(''));
    dispatch(setTaxState(''));
    dispatch(setTaxMunicipality(''));
    dispatch(setTaxEmail(''));
    dispatch(setTaxName(''));
  }

  return (
    <div
      className={'p-3 md:p-6 lg:p-9 xl:p-12 mb-3 md:mb-6 lg:mb-9 xl:mb-12'}
    >
      {/* header */}
      <header
        className={'mb-4 md:mb-8 lg:mb-12 xl:mb-16 lg:ml-12'}
      >
        <h3
          className={'font-medium text-3xl sm:text-5xl mb-1 sm:mb-3'}
          style={{color: '#F79F1A'}}
        >
          <Image
            src={`/img/orange-isotipo.svg`}
            alt={`inphonity isotipo`}
            width={40}
            height={40}
            className={`inline-block mr-2 w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14`}
            style={{verticalAlign: 'middle'}}
          />
          Elige tu tipo de SIM
        </h3>
      </header>

        {/* form */}
        <div
          className={'lg:container mx-auto w-full'}
        >
          <div
            className={'grid grid-cols-12 form-card gap-3 sm:gap-4 md:gap-5 lg:gap-6 bg-white w-full mx-auto mt-4 md:mt-8 lg:mt-12 xl:mt-16 p-6 md:p-8 lg:p-10 xl:p-12'}
          >
            {/* is esim */}
            <div
              className={'col-span-12'}
            >
              <p className={`font-medium font-base mb-4`}>
                Si tu dispositivo es compatible con tarjeta SIM y eSIM, elige la que prefieras
              </p>

              <label>
                <span
                  className={`font-medium mr-2 inline-block`}
                  style={{width: '95px'}}
                >
                  Tarjeta SIM
                </span>
                <input
                  className={`${shipping.isEsimError ? 'input-error' : ''}`}
                  style={{accentColor: '#EF7911'}}
                  type="radio"
                  name={'isEsim'}
                  value={'false'}
                  onChange={handleInputChange}
                  checked={!shipping.isEsim}
                />
              </label>
              <br/>
              <label>
                <span
                  className={`font-medium mr-2 inline-block`}
                  style={{width: '95px'}}
                >
                  Tarjeta eSIM
                </span>
                <input
                  className={`${shipping.isEsimError ? 'input-error' : ''}`}
                  style={{accentColor: '#EF7911'}}
                  type="radio"
                  name={'isEsim'}
                  value={'true'}
                  onChange={handleInputChange}
                  checked={shipping.isEsim}
                />
              </label>

              {shipping.isEsim && !plan.supportEsim && (
                <p
                  className={'text-red-500 text-base mt-1'}
                >
                  El dispositivo validado no es compatible con eSIM. ¿Estas seguro que deseas continuar con esta opción?
                </p>
              )}

              {/* error */}
              {shipping.isEsimError && (
                <p
                  className={'text-red-500 text-xs mt-1 mx-3'}
                >
                  {shipping.isEsimError}
                </p>
              )}
            </div>

            <div
              className={`col-span-12`}
            >
              <p className={`font-medium font-base mb-4`}>
                Dirección a la que llegará tu SIM de inphonity
              </p>
            </div>
            {/* zip code */}
            <div
              className={'col-span-12 sm:col-span-6'}
            >
              <input
                type="text"
                className={`input input-border-gray ${shipping.zipCodeError ? 'input-error' : ''}`}
                placeholder="Código postal*"
                value={shipping.zipCode}
                name={'zipCode'}
                onChange={handleInputChange}
                ref={el => inputRefs.current.zipCode = el}
              />
              {/* error */}
              {shipping.zipCodeError && (
                <p
                  className={'text-red-500 text-xs mt-1 mx-3'}
                >
                  {shipping.zipCodeError}
                </p>
              )}
            </div>
            {/* neighborhood */}
            <div
              className={'col-span-12 sm:col-span-6'}
            >
              <input
                type="text"
                className={`input input-border-gray ${shipping.neighborhoodError ? 'input-error' : ''}`}
                placeholder="Colonia*"
                value={shipping.neighborhood}
                name={'neighborhood'}
                onChange={handleInputChange}
                ref={el => inputRefs.current.neighborhood = el}
              />
              {/* error */}
              {shipping.neighborhoodError && (
                <p
                  className={'text-red-500 text-xs mt-1 mx-3'}
                >
                  {shipping.neighborhoodError}
                </p>
              )}
            </div>
            {/* street */}
            <div
              className={'col-span-12'}
            >
              <input
                type="text"
                className={`input input-border-gray ${shipping.streetError ? 'input-error' : ''}`}
                placeholder="Calle*"
                value={shipping.street}
                name={'street'}
                onChange={handleInputChange}
                ref={el => inputRefs.current.street = el}
              />
              {/* error */}
              {shipping.streetError && (
                <p
                  className={'text-red-500 text-xs mt-1 mx-3'}
                >
                  {shipping.streetError}
                </p>
              )}
            </div>
            {/* number */}
            <div
              className={'col-span-12 sm:col-span-6'}
            >
              <input
                type="text"
                className={`input input-border-gray ${shipping.numberError ? 'input-error' : ''}`}
                placeholder="Número*"
                value={shipping.number}
                name={'number'}
                onChange={handleInputChange}
                ref={el => inputRefs.current.number = el}
              />
              {/* error */}
              {shipping.numberError && (
                <p
                  className={'text-red-500 text-xs mt-1 mx-3'}
                >
                  {shipping.numberError}
                </p>
              )}
            </div>
            {/* interior number */}
            <div
              className={'col-span-12 sm:col-span-6'}
            >
              <input
                type="text"
                className={`input input-border-gray ${shipping.interiorNumberError ? 'input-error' : ''}`}
                placeholder="Número interior"
                value={shipping.interiorNumber}
                name={'interiorNumber'}
                onChange={handleInputChange}
                ref={el => inputRefs.current.interiorNumber = el}
              />
              {/* error */}
              {shipping.interiorNumberError && (
                <p
                  className={'text-red-500 text-xs mt-1 mx-3'}
                >
                  {shipping.interiorNumberError}
                </p>
              )}
            </div>
            {/* complement */}
            <div
              className={'col-span-12'}
            >
              <input
                type="text"
                className={`input input-border-gray ${shipping.complementError ? 'input-error' : ''}`}
                placeholder={`Referencia`}
                value={shipping.complement}
                name={'complement'}
                onChange={handleInputChange}
                ref={el => inputRefs.current.complement = el}
              />
              {/* error */}
              {shipping.complementError && (
                <p
                  className={'text-red-500 text-xs mt-1 mx-3'}
                >
                  {shipping.complementError}
                </p>
              )}
            </div>
            {/* state */}
            <div
              className={'col-span-12 sm:col-span-6'}
            >
              <input
                type="text"
                className={`input input-border-gray ${shipping.stateError ? 'input-error' : ''}`}
                placeholder="Estado*"
                value={shipping.state}
                name={'state'}
                onChange={handleInputChange}
                ref={el => inputRefs.current.state = el}
              />
              {/* error */}
              {shipping.stateError && (
                <p
                  className={'text-red-500 text-xs mt-1 mx-3'}
                >
                  {shipping.stateError}
                </p>
              )}
            </div>
            {/* city */}
            <div
              className={'col-span-12 sm:col-span-6'}
            >
              <input
                type="text"
                className={`input input-border-gray ${shipping.cityError ? 'input-error' : ''}`}
                placeholder="Municipio/Alcaldía*"
                value={shipping.city}
                name={'city'}
                onChange={handleInputChange}
                ref={el => inputRefs.current.city = el}
              />
              {/* error */}
              {shipping.cityError && (
                <p
                  className={'text-red-500 text-xs mt-1 mx-3'}
                >
                  {shipping.cityError}
                </p>
              )}
            </div>

            <div
              className={'col-span-12'}
            >
              <div className="flex items-center text-white mb-2 ml-2">
                <input
                  type="checkbox"
                  id={'myAddressAreEqual'}
                  className="form-checkbox black h-5 w-5 text-green-500"
                  name={'myAddressAreEqual'}
                  onChange={handleMyAddressAreEqualChange}
                />
                <label htmlFor={'myAddressAreEqual'}>
                  <span className={`ml-2 inline-block font-medium text-black`}>Mi dirección de envío y facturación son iguales</span>
                </label>
              </div>
            </div>

            {/* next */}
            <div
              className={'col-span-12 flex items-center'}
            >
              <p
                className={`text-base text-gray-500 font-medium`}
              >
                Campos Obligatorios*
              </p>

              {!shipping.showTaxDataForm && (
                <div
                  className={`ml-auto`}
                  style={{width: '150px'}}
                >
                  <div className="button-container">
                    <button
                      className="button button-orange font-medium block w-full disabled:opacity-50"
                      onClick={handleNextForm}
                      disabled={!isValidForm}
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
    </div>
  );
}
