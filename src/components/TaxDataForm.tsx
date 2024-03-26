"use client";
import React, {useEffect, useMemo, useRef} from "react";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {
  setRfc,
  setName,
  setStreet,
  setExteriorNumber,
  setInteriorNumber,
  setEmail,
  setNeighborhood,
  setZipCode,
  setTaxZipCode,
  setState,
  setMunicipality,
  setShowAccountDataForm,
} from "@/lib/features/tax-data/taxDataSlice";
import Image from "next/image";

export default function TaxDataForm() {
  const dispatch = useAppDispatch();
  const [dontHaveTaxData, setDontHaveTaxData] = React.useState(false);
  const taxData = useAppSelector((state) => state.taxData);
  const fieldsOrder: (keyof typeof taxData)[] = useMemo(() => [
    "rfc",
    "name",
    "street",
    "exteriorNumber",
    "email",
    "neighborhood",
    "zipCode",
    "taxZipCode",
    "state",
    "municipality",
  ], []);
  const inputRefs = useRef<{[key in keyof typeof taxData]: HTMLInputElement | null}>({} as {[key in keyof typeof taxData]: HTMLInputElement | null});
  const isValidForm = useMemo(() => {
    return !fieldsOrder.some(field => {
      if (!field.endsWith('Error')) {
        return !taxData[field as keyof typeof taxData];
      }
      return false;
    });
  }, [fieldsOrder, taxData]);

  useEffect(() => {
    const firstErrorField = fieldsOrder.find(field => taxData[`${field}Error` as keyof typeof taxData]);
    if (firstErrorField && inputRefs.current[firstErrorField]) {
      inputRefs.current[firstErrorField]!.focus();
    }
  }, [
    taxData.rfcError,
    taxData.nameError,
    taxData.streetError,
    taxData.exteriorNumberError,
    taxData.interiorNumberError,
    taxData.emailError,
    taxData.neighborhoodError,
    taxData.zipCodeError,
    taxData.taxZipCodeError,
    taxData.stateError,
    taxData.municipalityError,
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;

    switch (name) {
      case "rfc":
        dispatch(setRfc(value));
        break;
      case "name":
        dispatch(setName(value));
        break;
      case "street":
        dispatch(setStreet(value));
        break;
      case "exteriorNumber":
        dispatch(setExteriorNumber(value));
        break;
      case "interiorNumber":
        dispatch(setInteriorNumber(value));
        break;
      case "email":
        dispatch(setEmail(value));
        break;
      case "neighborhood":
        dispatch(setNeighborhood(value));
        break;
      case "zipCode":
        dispatch(setZipCode(value));
        break;
      case "taxZipCode":
        dispatch(setTaxZipCode(value));
        break;
      case "state":
        dispatch(setState(value));
        break;
      case "municipality":
        dispatch(setMunicipality(value));
        break;
    }
  }

  const handleNextForm = () => {
    dispatch(setShowAccountDataForm(true));
  }

  return (
    <div
      className={'p-3 md:p-6 lg:p-9 xl:p-12 mb-3 md:mb-6 lg:mb-9 xl:mb-12'}
    >
      {/* header */}
      <header
        className={'mb-4 md:mb-8 lg:mb-12 xl:mb-16 '}
      >
        <h3
          className={'font-medium text-3xl sm:text-5xl mb-3 sm:mb-6 lg:ml-12'}
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
          Llena tus datos fiscales
        </h3>

        <div className="flex items-center text-white mb-2 lg:ml-12">
          <input
            type="checkbox"
            id={'dontHaveTaxData'}
            className="form-checkbox black h-5 w-5 text-green-500"
            name={'dontHaveTaxData'}
            onChange={() => setDontHaveTaxData(!dontHaveTaxData)}
          />
          <label htmlFor={`dontHaveTaxData`}>
            <span className={`ml-2 inline-block font-medium text-black`}>No tengo mi información fiscal a la mano o actualizada</span>
          </label>
        </div>
      </header>

      {/* form */}
      <div
        className={'lg:container mx-auto w-full'}
      >
        <div
          className={'grid grid-cols-12 form-card gap-3 sm:gap-4 md:gap-5 lg:gap-6 bg-white w-full mx-auto mt-4 md:mt-8 lg:mt-12 xl:mt-16 p-6 md:p-8 lg:p-10 xl:p-12'}
        >
          {/* rfc */}
          <div
            className={'col-span-12'}
          >
            <input
              type="text"
              className={`input input-border-gray ${taxData.rfcError ? 'input-error' : ''}`}
              placeholder={`RFC*`}
              value={taxData.rfc}
              name={'rfc'}
              onChange={handleInputChange}
              ref={el => inputRefs.current.rfc = el}
            />
            {/* error */}
            {taxData.rfcError && (
              <p
                className={'text-red-500 text-xs mt-1 mx-3'}
              >
                {taxData.rfcError}
              </p>
            )}
          </div>

          {/* name */}
          <div
            className={'col-span-12'}
          >
            <input
              type="text"
              className={`input input-border-gray ${taxData.nameError ? 'input-error' : ''}`}
              placeholder={`Nombre completo*`}
              value={taxData.name}
              name={`name`}
              onChange={handleInputChange}
              ref={el => inputRefs.current.name = el}
            />
            {/* error */}
            {taxData.nameError && (
              <p
                className={'text-red-500 text-xs mt-1 mx-3'}
              >
                {taxData.nameError}
              </p>
            )}
          </div>

          {/* street */}
          <div
            className={'col-span-12'}
          >
            <input
              type="text"
              className={`input input-border-gray ${taxData.streetError ? 'input-error' : ''}`}
              placeholder={`Dirección Fiscal - Calle*`}
              value={taxData.street}
              name={`street`}
              onChange={handleInputChange}
              ref={el => inputRefs.current.street = el}
            />
            {/* error */}
            {taxData.streetError && (
              <p
                className={'text-red-500 text-xs mt-1 mx-3'}
              >
                {taxData.streetError}
              </p>
            )}
          </div>

          {/* exterior number */}
          <div
            className={'col-span-6'}
          >
            <input
              type="text"
              className={`input input-border-gray ${taxData.exteriorNumberError ? 'input-error' : ''}`}
              placeholder={`Número Exterior*`}
              value={taxData.exteriorNumber}
              name={`exteriorNumber`}
              onChange={handleInputChange}
              ref={el => inputRefs.current.exteriorNumber = el}
            />
            {/* error */}
            {taxData.exteriorNumberError && (
              <p
                className={'text-red-500 text-xs mt-1 mx-3'}
              >
                {taxData.exteriorNumberError}
              </p>
            )}
          </div>

          {/* interior number */}
          <div
            className={'col-span-6'}
          >
            <input
              type="text"
              className={`input input-border-gray ${taxData.interiorNumberError ? 'input-error' : ''}`}
              placeholder={`Número Interior`}
              value={taxData.interiorNumber}
              name={`interiorNumber`}
              onChange={handleInputChange}
              ref={el => inputRefs.current.interiorNumber = el}
            />
            {/* error */}
            {taxData.interiorNumberError && (
              <p
                className={'text-red-500 text-xs mt-1 mx-3'}
              >
                {taxData.interiorNumberError}
              </p>
            )}
          </div>

          {/* email */}
          <div
            className={'col-span-12 md:col-span-6'}
          >
            <input
              type="text"
              className={`input input-border-gray ${taxData.emailError ? 'input-error' : ''}`}
              placeholder={`Correo Electrónico*`}
              value={taxData.email}
              name={`email`}
              onChange={handleInputChange}
              ref={el => inputRefs.current.email = el}
            />
            {/* error */}
            {taxData.emailError && (
              <p
                className={'text-red-500 text-xs mt-1 mx-3'}
              >
                {taxData.emailError}
              </p>
            )}
          </div>

          {/* neighborhood */}
          <div
            className={'col-span-12 md:col-span-6'}
          >
            <input
              type="text"
              className={`input input-border-gray ${taxData.neighborhoodError ? 'input-error' : ''}`}
              placeholder={`Colonia*`}
              value={taxData.neighborhood}
              name={`neighborhood`}
              onChange={handleInputChange}
              ref={el => inputRefs.current.neighborhood = el}
            />
            {/* error */}
            {taxData.neighborhoodError && (
              <p
                className={'text-red-500 text-xs mt-1 mx-3'}
              >
                {taxData.neighborhoodError}
              </p>
            )}
          </div>

          {/* zip code */}
          <div
            className={'col-span-6'}
          >
            <input
              type="text"
              className={`input input-border-gray ${taxData.zipCodeError ? 'input-error' : ''}`}
              placeholder={`Código Postal*`}
              value={taxData.zipCode}
              name={`zipCode`}
              onChange={handleInputChange}
              ref={el => inputRefs.current.zipCode = el}
            />
            {/* error */}
            {taxData.zipCodeError && (
              <p
                className={'text-red-500 text-xs mt-1 mx-3'}
              >
                {taxData.zipCodeError}
              </p>
            )}
          </div>

          {/* tax zip code */}
          <div
            className={'col-span-6'}
          >
            <input
              type="text"
              className={`input input-border-gray ${taxData.taxZipCodeError ? 'input-error' : ''}`}
              placeholder={`Código Postal Fiscal*`}
              value={taxData.taxZipCode}
              name={`taxZipCode`}
              onChange={handleInputChange}
              ref={el => inputRefs.current.taxZipCode = el}
            />
            {/* error */}
            {taxData.taxZipCodeError && (
              <p
                className={'text-red-500 text-xs mt-1 mx-3'}
              >
                {taxData.taxZipCodeError}
              </p>
            )}
          </div>

          {/* state */}
          <div
            className={'col-span-12'}
          >
            <input
              type="text"
              className={`input input-border-gray ${taxData.stateError ? 'input-error' : ''}`}
              placeholder={`Estado*`}
              value={taxData.state}
              name={`state`}
              onChange={handleInputChange}
              ref={el => inputRefs.current.state = el}
            />
            {/* error */}
            {taxData.stateError && (
              <p
                className={'text-red-500 text-xs mt-1 mx-3'}
              >
                {taxData.stateError}
              </p>
            )}
          </div>

          {/* municipality */}
          <div
            className={'col-span-12'}
          >
            <input
              type="text"
              className={`input input-border-gray ${taxData.municipalityError ? 'input-error' : ''}`}
              placeholder={`Municipio/Alcaldía*`}
              value={taxData.municipality}
              name={`municipality`}
              onChange={handleInputChange}
              ref={el => inputRefs.current.municipality = el}
            />
            {/* error */}
            {taxData.municipalityError && (
              <p
                className={'text-red-500 text-xs mt-1 mx-3'}
              >
                {taxData.municipalityError}
              </p>
            )}
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

            {!taxData.showAccountDataForm && (
              <div
                className={`ml-auto`}
                style={{width: '150px'}}
              >
                <div className="button-container">
                  <button
                    className="button button-orange font-medium block w-full disabled:opacity-50"
                    onClick={handleNextForm}
                    disabled={!isValidForm && !dontHaveTaxData}
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
