"use client";
import React, { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { differenceInYears } from 'date-fns';
import {
  setDocType,
  setIdPassportPicture,
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
  setShowShippingForm,
  setIdAddressPicture,
  setIdTaxPicture,
  setNationality,
  setOccupation,
  setLastName,
  setSecondLastName
} from "@/lib/features/personal-data/personalDataSlice";
import { ModalContext } from "@/contexts/ModalContext";

const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));
const months = [
  { index: 0, name: "Enero" },
  { index: 1, name: "Febrero" },
  { index: 2, name: "Marzo" },
  { index: 3, name: "Abril" },
  { index: 4, name: "Mayo" },
  { index: 5, name: "Junio" },
  { index: 6, name: "Julio" },
  { index: 7, name: "Agosto" },
  { index: 8, name: "Septiembre" },
  { index: 9, name: "Octubre" },
  { index: 10, name: "Noviembre" },
  { index: 11, name: "Diciembre" }
];
const currentDay = new Date().getDate();
const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 101 }, (_, i) => currentYear - i);

const maxDate = currentYear - 18 + "-" + 0 + (currentMonth + 1) + "-" + 0 + currentDay;

export default function PersonalDataForm() {
  const { openModal } = React.useContext(ModalContext);
  const dispatch = useAppDispatch();
  const personalData = useAppSelector((state) => state.personalData);
  const fieldsOrder: (keyof typeof personalData)[] = useMemo(() => [
    'name',
    'lastName',
    'secondLastName',
    'nationality',
    'phone',
    'email',
    'curp',
    'gender',
    'docType',
    'occupation',
    'dateOfBirth',
    'idPassportPicture',
    'idAddressPicture',
    'idTaxPicture'
  ], []);
  const inputRefs = useRef<{ [key in keyof typeof personalData]: HTMLInputElement | HTMLSelectElement | null }>({} as { [key in keyof typeof personalData]: HTMLInputElement | null });
  const isValidForm = useMemo(() => {
    return !fieldsOrder.some(field => {
      //valid docType
      if (field == "docType"){
        if (personalData["docType"]=="INE"){
          return !personalData["idFrontPicture"] || !personalData["idBackPicture"];
        }
        if (personalData["docType"]=="Passport"){
          return !personalData["idPassportPicture"];
        }
      }

      if (!field.endsWith('Error')) {
        return !personalData[field as keyof typeof personalData];
      }
      return false;
    });
  }, [fieldsOrder, personalData]);

  useEffect(() => {
    const { dayDateOfBirth, monthDateOfBirth, yearDateOfBirth } = personalData
    if (dayDateOfBirth && monthDateOfBirth && yearDateOfBirth) {
      let value = new Date(Number(yearDateOfBirth), Number(monthDateOfBirth), Number(dayDateOfBirth));
      const age = differenceInYears(new Date(), new Date(value));
      dispatch(setDateOfBirth(value.toString()));

      if (age < 18) {
        dispatch(setDateOfBirthError('Debes tener al menos 18 años'));
      } else {
        dispatch(setDateOfBirthError(''));
      }
    }
  }, [personalData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        dispatch(setName(value.replace(/[^A-Za-z\s]+/g, '')));
        break;
      case 'lastName':
        dispatch(setLastName(value.replace(/[^A-Za-z\s]+/g, '')));
        break;
      case 'secondLastName':
        dispatch(setSecondLastName(value.replace(/[^A-Za-z\s]+/g, '')));
        break;
      case 'phone':
        dispatch(setPhone(value.replace(/\D/g, '')));
        break;
      case 'nationality':
        dispatch(setNationality(value));
        break;
      case 'occupation':
        dispatch(setOccupation(value));
        break;      
      case 'email':
        dispatch(setEmail(value));
        break;
      case 'curp':
        dispatch(setCurp(value));
        break;
      case 'docType':
        dispatch(setDocType(value));
        break;
      case 'gender':
        dispatch(setGender(value));
        break;
      case 'dateOfBirth':
        dispatch(setDateOfBirth(value));
        const age = differenceInYears(new Date(), new Date(value));
        if (age < 18) {
          dispatch(setDateOfBirthError('Debes tener al menos 18 años'));
        } else {
          dispatch(setDateOfBirthError(''));
        }
        break;
      default:
        break;
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target?.result;
        if (name === 'idFrontPicture') {
          dispatch(setIdFrontPicture(data as string));
        }
        if (name === 'idBackPicture') {
          dispatch(setIdBackPicture(data as string));
        }
        if (name === 'idPassportPicture') {
          dispatch(setIdPassportPicture(data as string));
        }
        if (name === 'idAddressPicture') {
          dispatch(setIdAddressPicture(data as string));
        }
        if (name === 'idTaxPicture') {
          dispatch(setIdTaxPicture(data as string));
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
      <div className="flex flex-col items-center justify-center h-full bg-black bg-modal-verde">
        <p
          className={`text-center text-3xl lg:text-3xl p-4 md:p-5 text-white ajuste_centro`}
        >
          <span className="font-medium">Sube una <span className="text-highlight">foto por ambos lados</span> <br />
            de tu <span className="text-highlight">identificación oficial (INE o Pasaporte)</span>.
          </span>
        </p>
      </div>,
    );
  }

  const showModalWithPassportInfo = (e: React.MouseEvent) => {
    e.preventDefault();
    openModal(
      <div className="flex flex-col items-center justify-center h-full bg-black bg-modal-verde">
        <p
          className={`text-center text-3xl lg:text-3xl p-4 md:p-5 text-white ajuste_centro`}
        >
          <span className="font-medium">Sube una <span className="text-highlight">foto de frente </span>
            de tu <span className="text-highlight">Pasaporte</span>.
          </span>
        </p>
      </div>,
    );
  }

  const showModalWithAddressProof = (e: React.MouseEvent) => {
    e.preventDefault();
    openModal(
      <div className="flex flex-col items-center justify-center h-full bg-black bg-modal-verde">
        <p
          className={`text-center text-3xl lg:text-3xl p-4 md:p-5 text-white ajuste_centro`}
        >
          <span className="font-medium">Sube una <span className="text-highlight">foto</span> clara o el <span className="text-highlight">PDF</span><br />
            de tu comprobante de domicilio</span><br />
          (de la dirección donde quieres recibir<br />
          tu Kit de Bienvenida).
          <br /><br />
          Este debe ser menor a 3 meses.<br />
          Los comprobantes oficiales<br />
          son los siguientes:<br />
          gas, luz, teléfono, internet,<br />
          agua o predial.
        </p>
      </div>,
    );
  }

  const showModalWithTaxStatusProof = (e: React.MouseEvent) => {
    e.preventDefault();
    openModal(
      <div className="flex flex-col items-center justify-center h-full bg-black bg-modal-verde">
        <p
          className={`text-center text-3xl lg:text-3xl p-4 md:p-5 text-white ajuste_centro`}
        >
          <span className="font-medium">Sube una <span className="text-highlight">foto clara</span> o el <span className="text-highlight">PDF</span> de
            <br />
            tu Constancia de Situación
            <br />
            Fiscal</span> (CSF) actualizada.
          <br />
          <br />
          Esta debe ser menor a 3 meses,
          <br />
          y puedes descargarla desde el
          <br />
          portal del SAT
        </p>
      </div>,
    );
  }

  return (
    <div className={'p-3 md:p-6 lg:p-9 xl:p-12 bg-white'}>
      {/* header */}
      <header className={'mb-2'}>
        <h3 className={'font-medium text-3xl sm:text-5xl mb-1 sm:mb-3 text-black text-center'}>
          Llena los <span className="text-custom-blue"> siguientes datos</span>
        </h3>
        <p className={'text-base text-black text-center'}>
          <strong className={'font-medium text-custom-blue'}>Importante:</strong> 
          Ten a la mano tu credencial de elector y comprobante de domicilio
        </p>
      </header>

      {/* form */}
      <div className={'lg:container mx-auto w-full'}>
        <div className={'grid grid-cols-12 form-card gap-3 sm:gap-4 md:gap-5 lg:gap-6 text-white w-full mx-auto p-6 md:p-8 lg:p-10 xl:p-12'}>
          {/* <div className={'col-span-12'}>
            <input 
              type="text"
              className={`input input-border-black ${personalData.nameError ? 'input-error' : ''}`}
              placeholder="Nombre completo*"
              value={personalData.name}
              name={'name'}
              onChange={handleInputChange}
              ref={el => inputRefs.current.name = el}
            />
            {personalData.nameError && (
              <p
                className={'text-red-500 text-xs mt-1 mx-3'}
              >
                {personalData.nameError}
              </p>
            )}
          </div> */}
           {/* name */}
           <div
            className={'col-span-12 lg:col-span-4'}
          >
            <input
              type="text"
              className={`input input-border-black ${personalData.nameError ? 'input-error' : ''}`}
              placeholder="Nombre*"
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
          {/* last name */}
          <div
            className={'col-span-12 lg:col-span-4'}
          >
            <input
              type="text"
              className={`input input-border-black ${personalData.lastNameError ? 'input-error' : ''}`}
              placeholder="Apellido paterno*"
              value={personalData.lastName}
              name={'lastName'}
              onChange={handleInputChange}
              ref={el => inputRefs.current.lastName = el}
            />
            {/* error */}
            {personalData.lastNameError && (
              <p
                className={'text-red-500 text-xs mt-1 mx-3'}
              >
                {personalData.lastNameError}
              </p>
            )}
          </div>
          {/* second last name */}
          <div
            className={'col-span-12 lg:col-span-4'}
          >
            <input
              type="text"
              className={`input input-border-black ${personalData.secondLastNameError ? 'input-error' : ''}`}
              placeholder="Apellido materno*"
              value={personalData.secondLastName}
              name={'secondLastName'}
              onChange={handleInputChange}
              ref={el => inputRefs.current.secondLastName = el}
            />
            {/* error */}
            {personalData.secondLastNameError && (
              <p
                className={'text-red-500 text-xs mt-1 mx-3'}
              >
                {personalData.secondLastNameError}
              </p>
            )}
          </div>
          {/* nationality */}
          <div className={'col-span-12'}>
            <select
              defaultValue={personalData.nationality}
              className={`input input-border-black`}
              name="nationality"
              onChange={handleInputChange}
              ref={el => inputRefs.current.nationality = el}
              >
              <option disabled value="" aria-readonly>Nacionalidad*</option>
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
          <div className="col-span-4 lg:col-span-3 text-black place-content-center text-xl">
            <label htmlFor="dateOfBirth">Fecha de nacimiento*</label>
          </div>
          <div className={'col-span-8 lg:col-span-9'}>
            <input
              id={'dateOfBirth'}
              type="date"
              className={`input input-border-black ${personalData.dateOfBirthError ? 'input-error' : ''}`}
              placeholder="Fecha de nacimiento*"
              value={personalData.dateOfBirth}
              name={'dateOfBirth'}
              onChange={handleInputChange}
              ref={el => inputRefs.current.dateOfBirth = el}
              max={maxDate}
            />
            {/* error */}
            {personalData.dateOfBirthError && (
              <p className={'text-red-500 text-xs mt-1 mx-3'}>
                {personalData.dateOfBirthError}
              </p>
            )}
          </div>
          {/* <div className="col-span-12 sm:col-span-2">
            <select  
              defaultValue=""
              className="input"
              name={'dayDateOfBirth'}
              onChange={handleInputChange}
              ref={el => inputRefs.current.dayDateOfBirth = el}
            >
              <option disabled value={''}>Día</option>
              {
                days.map(val => {
                  return <option key={val} value={val}>{val}</option>
                })
              }
            </select>
          </div>
          <div className="col-span-12 sm:col-span-3">
            <select  
              defaultValue=""
              className="input"
              name={'monthDateOfBirth'}
              onChange={handleInputChange}
              ref={el => inputRefs.current.monthDateOfBirth = el}
            >
              <option disabled value={''}>Mes</option>
              {
                months.map(val => {
                  return <option key={val.index} value={val.index}>{val.name}</option>
                })
              }
            </select>
          </div>
          <div className="col-span-12 sm:col-span-3">
            <select  
              defaultValue=""
              className="input"
              name={'yearDateOfBirth'}
              onChange={handleInputChange}
              ref={el => inputRefs.current.yearDateOfBirth = el}
            >
              <option disabled value={''}>Año</option>
              {
                years.map(val => {
                  return <option key={val} value={val}>{val}</option>
                })
              }
            </select>
          </div> */}
          {/* error 
          {personalData.dateOfBirthError && (
            <span className="col-span-12 text-center">
              <p className={'text-red-500 text-xs mt-1 mx-3'}>
                {personalData.dateOfBirthError}
              </p>
            </span>
          )}*/}
          {/* curp */}
          <div className={'col-span-12'}>
            <input 
              type="text"
              className={`input input-border-black ${personalData.curpError ? 'input-error' : ''}`}
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
              defaultValue={personalData.gender}
              className={`input input-border-black ${personalData.genderError ? 'input-error' : ''}`}
              name={'gender'}
              onChange={handleInputChange}
              ref={el => inputRefs.current.gender = el}
            >
              <option disabled value="">Sexo*</option>
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
              className={`input input-border-black ${personalData.phoneError ? 'input-error' : ''}`}
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
              className={`input input-border-black ${personalData.emailError ? 'input-error' : ''}`}
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
              defaultValue={personalData.occupation}
              className={`input input-border-black`}
              name={'occupation'}
              onChange={handleInputChange}
            >
              <option disabled value="">Ocupación*</option>
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

          <div className="col-span-12 text-black">
            <div className="mb-5 ml-6">
              <label>
                <input  name="docType" type="radio" className="radio" value={'INE'} onChange={handleInputChange} />
                <span> INE</span>
              </label>
            </div>
            <div className="ml-6">
              <label>
                <input  name="docType" type="radio" className="radio" value={'Passport'} onChange={handleInputChange} />
                <span> Pasaporte</span>
              </label>
            </div>
          </div>

          {/* oficial identification image (front) */}
          {personalData.docType == 'INE' && (
            <div className={'col-span-12 lg:col-span-6'}>
              <label className={`flex input input-border-black ${personalData.idFrontPictureError ? 'input-error' : ''}`}>
                <span className={'overflow-hidden truncate'}>Identificación oficial frente*</span>
                <div className={'ml-auto flex'}>
                  <Image
                    src={'/img/upload-icon.svg'}
                    alt={'Subir archivo'}
                    width={20}
                    height={20}
                    className={'inline-block w-5'}
                    style={{ verticalAlign: 'middle' }}
                  />
                  <Image
                    src={'/img/question-mark-icon.svg'}
                    alt={'¿Qué es esto?'}
                    width={20}
                    height={20}
                    className={'inline-block w-5 ml-2 pointer'}
                    style={{ verticalAlign: 'middle' }}
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
              <div
                className={'flex justify-center mt-2 md:mt-3'}
              >
                {personalData.idFrontPicture && (
                  <img
                    src={personalData.idFrontPicture}
                    alt={'Identificación oficial frente'}
                    width={200}
                    height={200}
                  />
                )}
              </div>
            </div>
          )}

          {/* oficial identification image (back) */}
          {personalData.docType == 'INE' && (
            <div className={'col-span-12 lg:col-span-6'}>
              <label className={`flex input input-border-black ${personalData.idBackPictureError ? 'input-error' : ''}`}>
                <span className={'overflow-hidden truncate'}>Identificación oficial vuelta*</span>
                <div className={'ml-auto flex'}>
                  <Image
                    src={'/img/upload-icon.svg'}
                    alt={'Subir archivo'}
                    width={20}
                    height={20}
                    className={'inline-block w-5'}
                    style={{ verticalAlign: 'middle' }}
                  />
                  <Image
                    src={'/img/question-mark-icon.svg'}
                    alt={'¿Qué es esto?'}
                    width={20}
                    height={20}
                    className={'inline-block w-5 ml-2 pointer'}
                    style={{ verticalAlign: 'middle' }}
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
              <div
                className={'flex justify-center mt-2 md:mt-3'}
              >
                {personalData.idBackPicture && (
                  <img
                    src={personalData.idBackPicture}
                    alt={'Identificación oficial vuelta'}
                    width={200}
                    height={200}
                  />
                )}
              </div>
            </div>
          )}

          {/* passport */}
          {personalData.docType == 'Passport' && (
            <>
              <div className={'col-span-6 lg:col-span-6'}>
                <label className={`flex input input-border-black ${personalData.idBackPictureError ? 'input-error' : ''}`}>
                  <span className={'overflow-hidden truncate'}>Pasaporte*</span>
                  <div className={'ml-auto flex'}>
                    <Image
                      src={'/img/upload-icon.svg'}
                      alt={'Subir archivo'}
                      width={20}
                      height={20}
                      className={'inline-block w-5'}
                      style={{ verticalAlign: 'middle' }}
                    />
                    <Image
                      src={'/img/question-mark-icon.svg'}
                      alt={'¿Qué es esto?'}
                      width={20}
                      height={20}
                      className={'inline-block w-5 ml-2 pointer'}
                      style={{ verticalAlign: 'middle' }}
                      onClick={showModalWithPassportInfo}
                    />
                  </div>
                  <input 
                    type="file"
                    accept={'image/*'}
                    className={'hidden'}
                    name={'idPassportPicture'}
                    onChange={handleFileChange}
                    ref={el => inputRefs.current.idPassportPicture = el}
                  />
                </label>
                {/* preview */}
                <div className={'flex justify-center mt-2 md:mt-3'}>
                  {personalData.idPassportPicture && (
                    <img
                      src={personalData.idPassportPicture}
                      alt={'Pasaporte'}
                      width={200}
                      height={200}
                    />
                  )}
                </div>
              </div>
              <div className={'col-span-6 lg:col-span-6'}>
                {/* relleno */}
              </div>
            </>
          )}

          {/* proof of address */}
          <div className={'col-span-12 md:col-span-6'}>
            <label className={'flex input input-border-black'}>
              <span className={'overflow-hidden truncate'}>Comprobante de domicilio*</span>
              <div className={'ml-auto flex'}>
                <Image
                  src={'/img/upload-icon.svg'}
                  alt={'Subir archivo'}
                  width={20}
                  height={20}
                  className={'inline-block w-5'}
                  style={{ verticalAlign: 'middle' }}
                />
                <Image
                  src={'/img/question-mark-icon.svg'}
                  alt={'¿Qué es esto?'}
                  width={20}
                  height={20}
                  className={'inline-block w-5 ml-2 pointer'}
                  style={{ verticalAlign: 'middle' }}
                  onClick={showModalWithAddressProof}
                />
              </div>
              <input 
                  type="file"
                  accept={'image/*'}
                  className={'hidden'}
                  name={'idAddressPicture'}
                  onChange={handleFileChange}
                  ref={el => inputRefs.current.idAddressPicture = el}
                />
            </label>
            {/* error */}
            {personalData.idAddressPictureError && (
                  <p
                    className={'text-red-500 text-xs mt-1 mx-3'}
                  >
                    {personalData.idAddressPictureError}
                  </p>
                )}
            {/* preview */}
            <div
                className={'flex justify-center mt-2 md:mt-3'}
              >
                {personalData.idAddressPicture && (
                  <img
                    src={personalData.idAddressPicture}
                    alt={'Comprobante de domicilio'}
                    width={200}
                    height={200}
                  />
                )}
              </div>
          </div>
          {/* proof of tax status */}
          <div className={'col-span-12 md:col-span-6'}>
            <label className={'flex input input-border-black'}>
              <span className={'overflow-hidden truncate'}>Constancia de situación fiscal*</span>
              <div className={'ml-auto flex'}>
                <Image
                  src={'/img/upload-icon.svg'}
                  alt={'Subir archivo'}
                  width={20}
                  height={20}
                  className={'inline-block w-5'}
                  style={{ verticalAlign: 'middle' }}
                />
                <Image
                  src={'/img/question-mark-icon.svg'}
                  alt={'¿Qué es esto?'}
                  width={20}
                  height={20}
                  className={'inline-block w-5 ml-2 pointer'}
                  style={{ verticalAlign: 'middle' }}
                  onClick={showModalWithTaxStatusProof}
                />
              </div>
              <input 
                type="file"
                accept={'image/*'}
                className={'hidden'}
                name={'idTaxPicture'}
                onChange={handleFileChange}
                ref={el => inputRefs.current.idTaxPicture = el}
              />
            </label>
            {/* error */}
            {personalData.idTaxPictureError && (
                  <p
                    className={'text-red-500 text-xs mt-1 mx-3'}
                  >
                    {personalData.idTaxPictureError}
                  </p>
                )}
            {/* preview */}
            <div
                className={'flex justify-center mt-2 md:mt-3'}
              >
                {personalData.idTaxPicture && (
                  <img
                    src={personalData.idTaxPicture}
                    alt={'Constancia de situación fiscal'}
                    width={200}
                    height={200}
                  />
                )}
              </div>
          </div>

          <div className={'col-span-12'}>
            <p className={`text-base text-black font-medium`}>
              Campos Obligatorios*
            </p>
          </div>

          {/* next */}
          {!personalData.showShippingForm && (
            <div className={`col-span-12`}>
              <div className="flex justify-center">
                <div className="button-container ">
                  <button
                    className="btn-xl multi-border bg-black font-medium text-white disabled:opacity-50"
                    onClick={()=>handleNextForm()}
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
