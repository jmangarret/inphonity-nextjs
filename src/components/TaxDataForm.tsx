"use client";
import React, {use, useEffect, useMemo, useRef} from "react";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {
  setName,
  setRfc,
  setFiscalRegime,
  setStreet,
  setExteriorNumber,
  setInteriorNumber,
  setNeighborhood,
  setZipCode,
  setState,
  setMunicipality,
  setShowAccountDataForm,
  setRfcError,
} from "@/lib/features/tax-data/taxDataSlice";
import Image from "next/image";

export default function TaxDataForm() {
  const dispatch = useAppDispatch();
  const [myAddressAreEqual, setMyAddressAreEqual] = React.useState(false);
  const [dontHaveTaxData, setDontHaveTaxData] = React.useState(false);
  const taxData = useAppSelector((state) => state.taxData);
  const shipping = useAppSelector((state) => state.shipping);
  const personalData = useAppSelector((state) => state.personalData);
  const fieldsOrder: (keyof typeof taxData)[] = useMemo(() => [
    "name",
    "rfc",
    'fiscalRegime',
    "street",
    "exteriorNumber",
    "neighborhood",
    "zipCode",
    "state",
    "municipality",
    "rfcError"
  ], []);
  const inputRefs = useRef<{[key in keyof typeof taxData]: HTMLInputElement | null}>({} as {[key in keyof typeof taxData]: HTMLInputElement | null});
  const isValidForm = useMemo(() => {
    return !fieldsOrder.some(field => {
      if (field.endsWith('Error')) {
        return taxData[field as keyof typeof taxData];
      }
      if (!field.endsWith('Error')) {
        return !taxData[field as keyof typeof taxData];
      }
      return false;
    });
  }, [fieldsOrder, taxData]);
  const [fiscalRegimes, setFiscalRegimes] = React.useState<Array<{value: string; label: string}>>([]);

  /**
   * Fetch fiscal regimes from API
   */
  const fetchFiscalRegimes = async () => {
    try {
      const api = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
      const response = await fetch(`${api}/api/tax-data/fiscal-regimes`);
      const data = await response.json();

      setFiscalRegimes(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    if (taxData.showAccountDataForm){
      let scrollSection = document.getElementById("AccountFormSection")?.getBoundingClientRect().top || 0
      window.scrollTo({
        top: window.scrollY + scrollSection,
        behavior: 'smooth'
      });
    }
  },[taxData.showAccountDataForm])

  useEffect(() => {
    const firstErrorField = fieldsOrder.find(field => taxData[`${field}Error` as keyof typeof taxData]);
    if (firstErrorField && inputRefs.current[firstErrorField]) {
      inputRefs.current[firstErrorField]!.focus();
    }
  }, [
    taxData.rfcError,
    taxData.fiscalRegime,
    taxData.streetError,
    taxData.exteriorNumberError,
    taxData.interiorNumberError,
    taxData.neighborhoodError,
    taxData.zipCodeError,
    taxData.stateError,
    taxData.municipalityError,
  ]);

  useEffect(() => {
    fetchFiscalRegimes();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;

    switch (name) {
      case "rfc":
        dispatch(setRfc(value));
        if (value.length == 13){
          handleRfc(e);
        }
        break;
      case 'fiscalRegime':
        dispatch(setFiscalRegime(value));
        break;
      case "street":
        dispatch(setStreet(value));
        break;
      case "exteriorNumber":
        dispatch(setExteriorNumber(value.replace(/[^A-Za-z0-9_\u00C0-\u017F]/g, '')));
        break;
      case "interiorNumber":
        dispatch(setInteriorNumber(value.replace(/[^A-Za-z0-9_\u00C0-\u017F]/g, '')));
        break;
      case "neighborhood":
        dispatch(setNeighborhood(value));
        break;
      case "zipCode":
        dispatch(setZipCode(value.replace(/\D/g, '')));
        break;
      case "state":
        dispatch(setState(value));
        break;
      case "municipality":
        dispatch(setMunicipality(value));
        break;
    }
  }

  const handleRfc = (e: { target: { value: any; }; }) => {
    const value = e.target.value;
    if(value.length < 13 || value.length > 13){
      dispatch(setRfcError('El campo RFC debe contener 13 caracteres.'));
    }else{
      dispatch(setRfcError(''));
    }
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
    dispatch(setStreet(shipping.street));
    dispatch(setExteriorNumber(shipping.number));
    dispatch(setInteriorNumber(shipping.interiorNumber));
    dispatch(setNeighborhood(shipping.neighborhood));
    dispatch(setZipCode(shipping.zipCode));
    dispatch(setState(shipping.state));
    dispatch(setMunicipality(shipping.city));
  }

  const emptyTaxAddressData = () => {
    dispatch(setStreet(''));
    dispatch(setExteriorNumber(''));
    dispatch(setInteriorNumber(''));
    dispatch(setNeighborhood(''));
    dispatch(setZipCode(''));
    dispatch(setZipCode(''));
    dispatch(setMunicipality(''));
  }

  const handleNextForm = () => {
      dispatch(setShowAccountDataForm(true));
  }

  useEffect(() => {
    const fullName = `${personalData.name} ${personalData.lastName} ${personalData.secondLastName}`;
    dispatch(setName(fullName));
  },);

  return (
    <div className={'p-3 md:p-6 lg:p-9 xl:p-12'} id="TaxFormSection" >
      {/* header */}
      <header>
        <h3 className={'font-medium text-black text-center text-3xl sm:text-5xl mb-3 sm:mb-6 lg:ml-12'}>
          Llena tus datos <span className="text-custom-blue">fiscales</span>
        </h3>
      </header>

      <div className="col-span-12 md:col-span-10">
        {/* notice */}
        <div className="text-white m-3 pb-2.5 text-center font-medium">
          <h3 className={`text-highlight-red text-3xl`}>
            Aviso importante
          </h3>
        </div>
        <div className="lg:container bg-white p-8 text-black rounded-md mx-auto w-[90%] lg:w-[80%] border-2 border-[#EB522D]">
          <p className={`text-base leading-none`}>
          Es importante tener RFC con homoclave para recibir los pagos de tu cashback.
          Tienes 90 días para tramitarlo y no perder este beneficio. También necesitarás tu Constancia de Situación Fiscal actualizada y estar en el régimen de Asimilados al Salario. El Régimen Fiscal se otorga según la actividad económica; una persona
          puede tener más de uno asignado.
          </p>
        </div>
      </div>

      {/* form */}
      <div className={'lg:container mx-auto w-full'}>
        <div className={'grid grid-cols-12 form-card gap-3 sm:gap-4 md:gap-5 lg:gap-6 w-full mx-auto p-6 md:p-8 lg:p-10 xl:p-12'}>
          <div className="col-span-12 flex items-center text-white mb-2">
            <input
              type="checkbox"
              id={'dontHaveTaxData'}
              className="form-checkbox green-check h-5 w-5 text-green-500"
              name={'dontHaveTaxData'}
              onChange={() => setDontHaveTaxData(!dontHaveTaxData)}
            />
            <label htmlFor={`dontHaveTaxData`}>
              <span className={`ml-2 inline-block text-black`}>No tengo mi información fiscal a la mano o actualizada</span>
            </label>
          </div>

          <div className={'col-span-12'}>
            <input
              type="text"
              className={`input input-border-black`}
              placeholder={`Nombre Completo*`}
              value={taxData.name}
              name={'name'}
              disabled
              onChange={handleInputChange}
              onBlur={handleRfc}
              ref={el => {inputRefs.current.name = el}}
            />
          </div>
           {/* rfc */}
           <div className={'col-span-12'}>
            <input
              type="text"
              className={`input input-border-black ${taxData.rfcError ? 'input-error' : ''}`}
              placeholder={`RFC*`}
              value={taxData.rfc}
              name={'rfc'}
              onChange={handleInputChange}
              onBlur={handleRfc}
              ref={el => {inputRefs.current.rfc = el}}
              maxLength={13}
              minLength={13}
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

          {/* fiscal regime */}
          <div className={'col-span-12'}>
            <select
              className={`input input-border-black`}
              value={taxData.fiscalRegime}
              name={'fiscalRegime'}
              onChange={handleInputChange}
            >
              <option value={''}>Régimen Fiscal*</option>
              {fiscalRegimes.map((regime, index) => (
                <option
                  key={index}
                  value={regime['value']}
                >
                  {regime['label']}
                </option>
              ))}
            </select>
          </div>

          {/* street */}
          <div
            className={'col-span-12'}
          >
            <input
              type="text"
              className={`input input-border-black ${taxData.streetError ? 'input-error' : ''}`}
              placeholder={`Dirección fiscal - calle*`}
              value={taxData.street}
              name={`street`}
              onChange={handleInputChange}
              ref={el => {inputRefs.current.street = el}}
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
              className={`input input-border-black ${taxData.exteriorNumberError ? 'input-error' : ''}`}
              placeholder={`Número exterior*`}
              value={taxData.exteriorNumber}
              name={`exteriorNumber`}
              onChange={handleInputChange}
              ref={el => {inputRefs.current.exteriorNumber = el}}
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
              className={`input input-border-black ${taxData.interiorNumberError ? 'input-error' : ''}`}
              placeholder={`Número interior`}
              value={taxData.interiorNumber}
              name={`interiorNumber`}
              onChange={handleInputChange}
              ref={el => {inputRefs.current.interiorNumber = el}}
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

           {/* zip code */}
           <div
            className={'col-span-6'}
          >
            <input
              type="text"
              className={`input input-border-black ${taxData.zipCodeError ? 'input-error' : ''}`}
              placeholder={`Código postal*`}
              value={taxData.zipCode}
              name={`zipCode`}
              onChange={handleInputChange}
              ref={el => {inputRefs.current.zipCode = el}}
              maxLength={5}
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

          {/* neighborhood */}
          <div className={'col-span-6'}>
            <input
              type="text"
              className={`input input-border-black ${taxData.neighborhoodError ? 'input-error' : ''}`}
              placeholder={`Colonia*`}
              value={taxData.neighborhood}
              name={`neighborhood`}
              onChange={handleInputChange}
              ref={el => {inputRefs.current.neighborhood = el}}
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

          {/* state */}
          <div className={'col-span-6'}>
            <input
              type="text"
              className={`input input-border-black ${taxData.stateError ? 'input-error' : ''}`}
              placeholder={`Estado*`}
              value={taxData.state}
              name={`state`}
              onChange={handleInputChange}
              ref={el => {inputRefs.current.state = el}}
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
            className={'col-span-6'}
          >
            <input
              type="text"
              className={`input input-border-black ${taxData.municipalityError ? 'input-error' : ''}`}
              placeholder={`Municipio/Alcaldía*`}
              value={taxData.municipality}
              name={`municipality`}
              onChange={handleInputChange}
              ref={el => {inputRefs.current.municipality = el}}
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

          <div className={'col-span-12 flex justify-between'}>
              <div>
                <span className={`text-base text-black font-medium`}>
                  Campos Obligatorios*
                </span>
              </div>
          </div>

          {/* next */}
          {!taxData.showAccountDataForm && (
            <div className={`col-span-12`}>
              <div className="flex justify-center">
                <div className="button-container">
                  <button
                    className="btn-xl multi-border bg-black text-white font-medium block disabled:opacity-50"
                    onClick={handleNextForm}
                    disabled={!isValidForm && !dontHaveTaxData}
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
