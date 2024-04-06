"use client";
import React, {useEffect, useMemo, useRef} from "react";
import Image from "next/image";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import { differenceInYears } from 'date-fns';
import {
  setCurp, setCurpError,
  setDateOfBirth, setDateOfBirthError,
  setDayDateOfBirth, setDayDateOfBirthError,
  setMonthDateOfBirth, setMonthDateOfBirthError,
  setYearDateOfBirth, setYearDateOfBirthError,
  setEmail,
  setGender, setGenderError,
  setIdBackPicture,
  setIdFrontPicture,
  setName,
  setPhone, setPhoneError,
  setShowShippingForm
} from "@/lib/features/personal-data/personalDataSlice";
import {ModalContext} from "@/contexts/ModalContext";

const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));
const months = [
  { index: 1, name: "Febrero" },
  { index: 2, name: "Marzo" },
  { index: 3, name: "Abril" },
  { index: 0, name: "Enero" },
  { index: 4, name: "Mayo" },
  { index: 5, name: "Junio" },
  { index: 6, name: "Julio" },
  { index: 7, name: "Agosto" },
  { index: 8, name: "Septiembre" },
  { index: 9, name: "Octubre" },
  { index: 10,name: "Noviembre" },
  { index: 11,name: "Diciembre" }
];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 101 }, (_, i) => currentYear - i);

export default function PersonalDataForm() {
  const {openModal} = React.useContext(ModalContext);
  const dispatch = useAppDispatch();
  const personalData = useAppSelector((state) => state.personalData);
  const fieldsOrder: (keyof typeof personalData)[] = useMemo(() => [
    'name',
    'phone',
    'email',
    'curp',
    'gender',
    'idFrontPicture',
    'idBackPicture',
    'dayDateOfBirth',
    'monthDateOfBirth',
    'yearDateOfBirth',
  ], []);
  const inputRefs = useRef<{ [key in keyof typeof personalData]: HTMLInputElement | HTMLSelectElement | null }>({} as { [key in keyof typeof personalData]: HTMLInputElement | null });
  const isValidForm = useMemo(() => {
    return !fieldsOrder.some(field => {
      if (!field.endsWith('Error')) {
        return !personalData[field as keyof typeof personalData];
      }
      return false;
    });
  }, [fieldsOrder, personalData]);

  useEffect(()=>{
    const {dayDateOfBirth, monthDateOfBirth, yearDateOfBirth} = personalData
    if (dayDateOfBirth && monthDateOfBirth && yearDateOfBirth){
      let value = new Date( Number(yearDateOfBirth), Number(monthDateOfBirth),Number(dayDateOfBirth));
      const age = differenceInYears(new Date(), new Date(value));
      dispatch(setDateOfBirth(value.toString()));
  
      if (age < 18) {
        dispatch(setDateOfBirthError('Debes tener al menos 18 años'));
      } else {
        dispatch(setDateOfBirthError(''));
      }
    }
  },[personalData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;

    switch (name) {
      case 'name':
        dispatch(setName(value));
        break;
      case 'phone':
        dispatch(setPhone(value));
        break;
      case 'email':
        dispatch(setEmail(value));
        break;
      case 'curp':
        dispatch(setCurp(value));
        break;
      case 'gender':
        dispatch(setGender(value));
        break;
      case 'dayDateOfBirth':
        dispatch(setDayDateOfBirth(value));
        break;
      case 'monthDateOfBirth':
        dispatch(setMonthDateOfBirth(value));
        break;
      case 'yearDateOfBirth':
        dispatch(setYearDateOfBirth(value));
        break;
      default:
        break;
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;

    if (files) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target?.result;
        if (name === 'idFrontPicture') {
          dispatch(setIdFrontPicture(data as string));
        } else {
          dispatch(setIdBackPicture(data as string));
        }
      }

      reader.readAsDataURL(file);
    }
  }

  const handleNextForm = () => {
    dispatch(setShowShippingForm(true));
  }

  const showModalWithIdentificationInfo = (e: React.MouseEvent) => {
    e.preventDefault();
    openModal(
      <div>
        <p
          className={`text-center text-lg p-4 md:p-5`}
        >
          Sube una foto por ambos
          <br/>
          lados de tu identificación oficial
          <br/>
          (INE o Pasaporte).
        </p>
      </div>,
    );
  }

  const showModalWithAddressProof = (e: React.MouseEvent) => {
    e.preventDefault();
    openModal(
      <div>
        <p
          className={`text-center text-lg p-4 md:p-5`}
        >
          Sube una foto clara o el PDF
          <br/>
          de tu comprobante de
          <br/>domicilio (de la dirección
          <br/>
          donde quieres recibir tu
          <br/>
          Kit de Bienvenida).
          <br/>
          <br/>
          Este debe ser menor a 3
          <br/>
          meses. Los comprobantes
          <br/>oficiales son los siguientes:
          <br/>
          Gas, luz, teléfono, internet,
          <br/>
          agua o predial.
        </p>
      </div>,
    );
  }

  const showModalWithTaxStatusProof = (e: React.MouseEvent) => {
    e.preventDefault();
    openModal(
      <div>
        <p
          className={`text-center text-lg p-4 md:p-5`}
        >
          Sube una foto clara o el PDF de
          <br/>
          tu Constancia de Situación
          <br/>
          Fiscal (CSF) actualizada.
          <br/>
          <br/>
          Esta debe ser menor a 3 meses,
          <br/>
          y puedes descargarla desde el
          <br/>
          portal del SAT
        </p>
      </div>,
    );
  }

  return (
    <div className={'p-3 md:p-6 lg:p-9 xl:p-12 mb-3 md:mb-6 lg:mb-9 xl:mb-12'}>
      {/* header */}
      <header className={'mb-2'}>
        <h3 className={'font-medium text-3xl sm:text-5xl mb-1 sm:mb-3 text-white text-center'}>
          Llena los <span className="text-highlight"> siguientes datos</span>
        </h3>
        <p className={'text-base text-white text-center'}>
          <strong className={'font-medium text-highlight'}>Importante:</strong> Ten a la mano tu Credencial de Elector y Comprobante de
          Domicilio
        </p>
      </header>

      {/* form */}
      <div className={'lg:container mx-auto w-full'}>
        <div className={'grid grid-cols-12 form-card gap-3 sm:gap-4 md:gap-5 lg:gap-6 text-white w-full mx-auto p-6 md:p-8 lg:p-10 xl:p-12'}>
          <div className={'col-span-12'}>
            <input
              type="text"
              className={`input input-border-gray ${personalData.nameError ? 'input-error' : ''}`}
              placeholder="Nombre Completo*"
              value={personalData.name}
              name={'name'}
              onChange={handleInputChange}
              ref={el => inputRefs.current.name = el}
            />
            {/* error */}
            {personalData.nameError && (
              <p
                className={'text-red-500 text-xs mt-1 mx-3'}
              >
                {personalData.nameError}
              </p>
            )}
          </div>
          {/* nationality */}
          <div className={'col-span-12'}>
            <select className={`input input-border-gray`}>
              <option value="" aria-readonly>Nacionalidad*</option>
              <option
                value={'mexican'}
              >
                Mexicano
              </option>
              <option
                value={'foreign'}
              >
                Extranjero
              </option>
            </select>
          </div>
          {/* name */}

           {/* date of birth */}
          <div className={'col-span-12 sm:col-span-4'}>
            <input
                id={'dateOfBirth'}
                type="text"
                className={`input input-border-gray ${personalData.dateOfBirthError ? 'input-error' : ''}`}
                placeholder="Fecha de nacimiento*"
                name={'dateOfBirth'}
                readOnly
            />
            {/* error */}
            {personalData.dateOfBirthError && (
                <p
                  className={'text-red-500 text-xs mt-1 mx-3'}
                >
                  {personalData.dateOfBirthError}
                </p>
            )}
          </div>
          <div className="col-span-12 sm:col-span-2">
            <select 
                className="input" 
                name={'dayDateOfBirth'} 
                onChange={handleInputChange}
                ref={el => inputRefs.current.dayDateOfBirth = el}
                >
              <option value={''}>Día</option>
              {
                days.map(val=>{
                  return <option key={val} value={val}>{val}</option>
                })
              }
            </select>
          </div>
          <div className="col-span-12 sm:col-span-3">
            <select 
              className="input" 
              name={'monthDateOfBirth'} 
              onChange={handleInputChange}
              ref={el => inputRefs.current.monthDateOfBirth = el}
              >
              <option value={''}>Mes</option>
              {
                months.map(val=>{
                  return <option key={val.index} value={val.index}>{val.name}</option>
                })
              }
            </select>
          </div>
          <div className="col-span-12 sm:col-span-3">
            <select 
              className="input" 
              name={'yearDateOfBirth'} 
              onChange={handleInputChange}
              ref={el => inputRefs.current.yearDateOfBirth = el}
              >
              <option value={''}>Año</option>
              {
                years.map(val=>{
                  return <option key={val} value={val}>{val}</option>
                })
              }
            </select>
          </div>

          {/* curp */}
          <div className={'col-span-12'}>
            <input
              type="text"
              className={`input input-border-gray ${personalData.curpError ? 'input-error' : ''}`}
              placeholder="CURP*"
              value={personalData.curp}
              name={'curp'}
              onChange={handleInputChange}
              ref={el => inputRefs.current.curp = el}
            />
            {/* error */}
            {personalData.curpError && (
              <p
                className={'text-red-500 text-xs mt-1 mx-3'}
              >
                {personalData.curpError}
              </p>
            )}
          </div>
          
          {/* gender */}
          <div className={'col-span-12'}>
            <select
              className={`input input-border-gray ${personalData.genderError ? 'input-error' : ''}`}
              value={personalData.gender}
              name={'gender'}
              onChange={handleInputChange}
              ref={el => inputRefs.current.gender = el}
            >
              <option value="">Sexo*</option>
              <option
                value={'male'}
              >
                Hombre
              </option>
              <option
                value={'female'}
              >
                Mujer
              </option>
            </select>
            {/* error */}
            {personalData.genderError && (
              <p
                className={'text-red-500 text-xs mt-1 mx-3'}
              >
                {personalData.genderError}
              </p>
            )}
          </div>

          {/* phone */}
          <div className={'col-span-12'}>
            <input
              type="text"
              className={`input input-border-gray ${personalData.phoneError ? 'input-error' : ''}`}
              placeholder="Teléfono*"
              value={personalData.phone}
              name={'phone'}
              onChange={handleInputChange}
              ref={el => inputRefs.current.phone = el}
            />
            {/* error */}
            {personalData.phoneError && (
              <p
                className={'text-red-500 text-xs mt-1 mx-3'}
              >
                {personalData.phoneError}
              </p>
            )}
          </div>
          
          {/* email */}
            <div className={'col-span-12'}>
            <input
              type="email"
              className={`input input-border-gray ${personalData.emailError ? 'input-error' : ''}`}
              placeholder="Correo electrónico*"
              value={personalData.email}
              name={'email'}
              onChange={handleInputChange}
              ref={el => inputRefs.current.email = el}
            />
            {/* error */}
            {personalData.emailError && (
              <p
                className={'text-red-500 text-xs mt-1 mx-3'}
              >
                {personalData.emailError}
              </p>
            )}
          </div>

          {/* occupation */}
          <div className={'col-span-12'}>
            <select
              className={`input input-border-gray`}
              name={'occupation'}
            >
              <option value="">Ocupación*</option>
              <option
                value={'student'}
              >
                Estudiante
              </option>
              <option
                value={'housewife'}
              >
                Ama de casa
              </option>
              <option
                value={'employee'}
              >
                Empleado
              </option>
              <option
                value={'merchant'}
              >
                Comerciante
              </option>
              <option
                value={'digital-platforms'}
              >
                Plataformas digitales
              </option>
              <option
                value={'retired'}
              >
                Jubilado
              </option>
            </select>
          </div>

          <div className="col-span-12 ">
            <div className="mb-5">
              <input type="radio" className="radio" /> INE
            </div>
            <div>
              <input type="radio" className="radio" /> Pasaporte
            </div>
          </div>

          {/* oficial identification image (front) */}
          <div
            className={'col-span-12 lg:col-span-6'}
          >
            <label
              className={`flex input input-border-gray ${personalData.idFrontPictureError ? 'input-error' : ''}`}
            >
              <span className={'overflow-hidden truncate'}>Identificación Oficial Frente*</span>
              <div
                className={'ml-auto flex'}
              >
                <Image
                  src={'/img/upload-icon.svg'}
                  alt={'Subir archivo'}
                  width={20}
                  height={20}
                  className={'inline-block w-5'}
                  style={{verticalAlign: 'middle'}}
                />
                <Image
                  src={'/img/question-mark-icon.svg'}
                  alt={'¿Qué es esto?'}
                  width={20}
                  height={20}
                  className={'inline-block w-5 ml-2'}
                  style={{verticalAlign: 'middle'}}
                  onClick={showModalWithIdentificationInfo}
                />
              </div>
              <input
                type="file"
                accept={'image/*'}
                className={'hidden'}
                name={'idFrontPicture'}
                onChange={handleFileChange}
                ref={el => inputRefs.current.idFrontPicture = el}
              />
            </label>
            {/* error */}
            {personalData.idFrontPictureError && (
              <p
                className={'text-red-500 text-xs mt-1 mx-3'}
              >
                {personalData.idFrontPictureError}
              </p>
            )}
            {/* preview */}
            {/* <div
              className={'flex justify-center mt-2 md:mt-3'}
            >
              {personalData.idFrontPicture && (
                <img
                  src={personalData.idFrontPicture}
                  alt={'Identificación Oficial Frente'}
                  width={200}
                  height={200}
                />
              )}
            </div> */}
          </div>
          {/* oficial identification image (back) */}
          <div
            className={'col-span-12 lg:col-span-6'}
          >
            <label
              className={`flex input input-border-gray ${personalData.idBackPictureError ? 'input-error' : ''}`}
            >
              <span className={'overflow-hidden truncate'}>Identificación Oficial Vuelta*</span>
              <div
                className={'ml-auto flex'}
              >
                <Image
                  src={'/img/upload-icon.svg'}
                  alt={'Subir archivo'}
                  width={20}
                  height={20}
                  className={'inline-block w-5'}
                  style={{verticalAlign: 'middle'}}
                />
                <Image
                  src={'/img/question-mark-icon.svg'}
                  alt={'¿Qué es esto?'}
                  width={20}
                  height={20}
                  className={'inline-block w-5 ml-2'}
                  style={{verticalAlign: 'middle'}}
                  onClick={showModalWithIdentificationInfo}
                />
              </div>
              <input
                type="file"
                accept={'image/*'}
                className={'hidden'}
                name={'idBackPicture'}
                onChange={handleFileChange}
                ref={el => inputRefs.current.idBackPicture = el}
              />
            </label>
            {/* error */}
            {personalData.idBackPictureError && (
              <p
                className={'text-red-500 text-xs mt-1 mx-3'}
              >
                {personalData.idBackPictureError}
              </p>
            )}
            {/* preview */}
            {/* <div
              className={'flex justify-center mt-2 md:mt-3'}
            >
              {personalData.idBackPicture && (
                <img
                  src={personalData.idBackPicture}
                  alt={'Identificación Oficial Vuelta'}
                  width={200}
                  height={200}
                />
              )}
            </div> */}
          </div>
         
          {/* proof of address */}
          <div
            className={'col-span-12 md:col-span-6'}
          >
            <label
              className={'flex input input-border-gray'}
            >
              <span className={'overflow-hidden truncate'}>Comprobante de domicilio*</span>
              <div
                className={'ml-auto flex'}
              >
                <Image
                  src={'/img/upload-icon.svg'}
                  alt={'Subir archivo'}
                  width={20}
                  height={20}
                  className={'inline-block w-5'}
                  style={{verticalAlign: 'middle'}}
                />
                <Image
                  src={'/img/question-mark-icon.svg'}
                  alt={'¿Qué es esto?'}
                  width={20}
                  height={20}
                  className={'inline-block w-5 ml-2'}
                  style={{verticalAlign: 'middle'}}
                  onClick={showModalWithAddressProof}
                />
              </div>
            </label>
          </div>
          {/* proof of tax status */}
          <div
            className={'col-span-12 md:col-span-6'}
          >
            <label
              className={'flex input input-border-gray'}
            >
              <span className={'overflow-hidden truncate'}>Constancia de situación fiscal*</span>
              <div
                className={'ml-auto flex'}
              >
                <Image
                  src={'/img/upload-icon.svg'}
                  alt={'Subir archivo'}
                  width={20}
                  height={20}
                  className={'inline-block w-5'}
                  style={{verticalAlign: 'middle'}}
                />
                <Image
                  src={'/img/question-mark-icon.svg'}
                  alt={'¿Qué es esto?'}
                  width={20}
                  height={20}
                  className={'inline-block w-5 ml-2'}
                  style={{verticalAlign: 'middle'}}
                  onClick={showModalWithTaxStatusProof}
                />
              </div>
            </label>
          </div>
         
          <div className={'col-span-12'}>
            <p className={`text-base text-white font-medium`}>
              Campos Obligatorios*
            </p>
          </div>

          {/* next */}
          {!personalData.showShippingForm && (
            <div className={`col-span-12`}>
              <div className="button-container flex justify-center">
                <button
                  className="btn-xl multi-border font-medium text-white disabled:opacity-50"
                  onClick={handleNextForm}
                  disabled={!isValidForm}
                >
                  SIGUIENTE
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
