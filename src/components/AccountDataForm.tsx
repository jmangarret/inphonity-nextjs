"use client";
import React, {useEffect, useMemo, useRef} from "react";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {
  setBankName,
  setBankAccountNumber,
  setBankAccountNumberConfirmation,
  setInterbankClabe,
  setInterbankClabeConfirmation, setShowPaymentForm,
} from "@/lib/features/account-data/accountDataSlice";
import Image from "next/image";

export default function AccountDataForm() {
  const dispatch = useAppDispatch();
  const accountData = useAppSelector((state) => state.accountData);
  const fieldsOrder: (keyof typeof accountData)[] = useMemo(() => [
    "bankName",
    "bankAccountNumber",
    "bankAccountNumberConfirmation",
    "interbankClabe",
    "interbankClabeConfirmation",
  ], []);
  const inputRefs = useRef<{ [key in keyof typeof accountData]: HTMLInputElement | null }>({} as { [key in keyof typeof accountData]: HTMLInputElement | null });
  const isValidForm = useMemo(() => {
    return !fieldsOrder.some(field => {
      if (!field.endsWith('Error')) {
        return !accountData[field as keyof typeof accountData];
      }
      return false;
    });
  }, [fieldsOrder, accountData]);

  useEffect(() => {
    const firstErrorField = fieldsOrder.find(field => accountData[`${field}Error` as keyof typeof accountData]);
    if (firstErrorField && inputRefs.current[firstErrorField]) {
      inputRefs.current[firstErrorField]!.focus();
    }
  }, [
    accountData.bankNameError,
    accountData.bankAccountNumberError,
    accountData.interbankClabeError,
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;

    switch (name) {
      case "bankName":
        dispatch(setBankName(value));
        break;
      case "bankAccountNumber":
        dispatch(setBankAccountNumber(value));
        break;
      case "bankAccountNumberConfirmation":
        dispatch(setBankAccountNumberConfirmation(value));
        break;
      case "interbankClabe":
        dispatch(setInterbankClabe(value));
        break;
      case "interbankClabeConfirmation":
        dispatch(setInterbankClabeConfirmation(value));
        break;
      default:
        break;
    }
  }

  const handleNextForm = () => {
    dispatch(setShowPaymentForm(true));
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
          ¿Dónde quieres recibir
          tu cashback?
        </h3>
        <p className={'text-base'}>
          <strong className={'font-medium'}>Importante:</strong> Asegúrate de ser el titular de la cuenta, ingresar los datos correctos y verificar que no haya límite de depósitos mensuales para recibir tu cashback correctamente.
        </p>
      </header>

      {/* form */}
      <div
        className={'lg:container mx-auto w-full'}
      >
        <div
          className={'grid grid-cols-12 form-card gap-3 sm:gap-4 md:gap-5 lg:gap-6 bg-white w-full mx-auto mt-4 md:mt-8 lg:mt-12 xl:mt-16 p-6 md:p-8 lg:p-10 xl:p-12'}
        >
          {/* bank name */}
          <div
            className={'col-span-12'}
          >
            <input
              type="text"
              className={`input input-border-gray ${accountData.bankNameError ? 'input-error' : ''}`}
              placeholder={`Nombre del Banco`}
              value={accountData.bankName}
              name={'bankName'}
              onChange={handleInputChange}
              ref={el => inputRefs.current.bankName = el}
            />
            {/* error */}
            {accountData.bankNameError && (
              <p
                className={'text-red-500 text-xs mt-1 mx-3'}
              >
                {accountData.bankNameError}
              </p>
            )}
          </div>

          {/* bank account number */}
          <div
            className={'col-span-12'}
          >
            <input
              type="text"
              className={`input input-border-gray ${accountData.bankAccountNumberError ? 'input-error' : ''}`}
              placeholder={`Número de Cuenta`}
              value={accountData.bankAccountNumber}
              name={`bankAccountNumber`}
              onChange={handleInputChange}
              ref={el => inputRefs.current.bankAccountNumber = el}
            />
            {/* error */}
            {accountData.bankAccountNumberError && (
              <p
                className={'text-red-500 text-xs mt-1 mx-3'}
              >
                {accountData.bankAccountNumberError}
              </p>
            )}
          </div>

          {/* confirmation */}
          <div
            className={'col-span-12'}
          >
            <input
              type="text"
              className={`input input-border-gray`}
              placeholder={`Confirmar Número de Cuenta`}
              value={accountData.bankAccountNumberConfirmation}
              name={`bankAccountNumberConfirmation`}
              onChange={handleInputChange}
              ref={el => inputRefs.current.bankAccountNumberConfirmation = el}
            />
          </div>

          {/* interbank clabe */}
          <div
            className={'col-span-12'}
          >
            <input
              type="text"
              className={`input input-border-gray ${accountData.interbankClabeError ? 'input-error' : ''}`}
              placeholder={`CLABE Interbancaria`}
              value={accountData.interbankClabe}
              name={`interbankClabe`}
              onChange={handleInputChange}
              ref={el => inputRefs.current.interbankClabe = el}
            />
            {/* error */}
            {accountData.interbankClabeError && (
              <p
                className={'text-red-500 text-xs mt-1 mx-3'}
              >
                {accountData.interbankClabeError}
              </p>
            )}
          </div>

          {/* confirmation */}
          <div
            className={'col-span-12'}
          >
            <input
              type="text"
              className={`input input-border-gray`}
              placeholder={`Confirmar CLABE Interbancaria`}
              value={accountData.interbankClabeConfirmation}
              name={`interbankClabeConfirmation`}
              onChange={handleInputChange}
              ref={el => inputRefs.current.interbankClabeConfirmation = el}
            />
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

            {!accountData.showPaymentForm && (
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
