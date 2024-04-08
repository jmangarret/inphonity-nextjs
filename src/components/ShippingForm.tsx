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
    dispatch(setTaxName(`${personalData.name}`));
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
    <div className={'p-3 md:p-6 lg:p-9 xl:p-12 mb-6'}>
      {/* header */}
      <header>
        <h3 className={'font-medium text-white text-center text-3xl sm:text-5xl mb-1 sm:mb-3'}>
          Elige tu tipo de <span className="text-highlight">SIM</span>
        </h3>
        <p className={`font-medium text-white text-center font-base mb-4`}>
          Si tu dispositivo es compatible con tarjeta SIM y eSIM, elige la que prefieras
        </p>
        {/* {shipping.isEsim && !plan.supportEsim && ( */}
          <p className={'text-highlight text-base text-center mt-1'}>
            * El dispositivo validado no es compatible con eSIM. ¿Estas seguro que deseas continuar con esta opción?
          </p>
        {/* )} */}
      </header>

        {/* form */}
        <div className={'lg:container mx-auto w-full'}>
          <div className={'grid grid-cols-12 form-card gap-3 sm:gap-4 md:gap-5 lg:gap-6 w-full mx-auto p-6 md:p-8 lg:p-10 xl:p-12'}>
            {/* is esim */}
            <div className={'col-span-12'}>
              <div className="mb-5">
                <label>
                  <span className={`font-medium mr-2 inline-block text-white`}>
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
              </div>
              <div>
                <label>
                  <span className={`font-medium mr-2 inline-block text-white`}>
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
              </div>
              {/* error */}
              {shipping.isEsimError && (
                <p
                  className={'text-red-500 text-xs mt-1 mx-3'}
                >
                  {shipping.isEsimError}
                </p>
              )}
            </div>

            <div className={`col-span-12`}>
              <p className={`font-medium text-white font-base mb-4`}>
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

            <div className={'col-span-12 flex justify-between'}>
              <div className="flex items-center text-white mb-2 ml-2">
                <input
                  type="checkbox"
                  id={'myAddressAreEqual'}
                  className="form-checkbox green-check h-5 w-5 text-green-500"
                  name={'myAddressAreEqual'}
                  onChange={handleMyAddressAreEqualChange}
                />
                <label htmlFor={'myAddressAreEqual'}>
                  <span className={`ml-2 inline-block text-base text-white`}>Mi dirección de envío y facturación son iguales</span>
                </label>
              </div>
              <div>
                <span className={`text-base text-white font-medium`}>
                  Campos Obligatorios*
                </span>
              </div>
            </div>

            {/* next */}
            {!shipping.showTaxDataForm && (
              <div className={`col-span-12`}>
                <div className="flex justify-center">
                  <div className="button-container">
                    <button
                      className="btn-xl multi-border font-medium text-white disabled:opacity-50"
                      onClick={handleNextForm}
                      disabled={!isValidForm}
                      >
                      SIGUIENTE
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
    </div>
  );
}
