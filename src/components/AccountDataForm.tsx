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
    <div className={'p-3 md:p-6 lg:p-9 xl:p-12 mb-3 md:mb-6 lg:mb-9 xl:mb-12'}>
      {/* header */}
      <header>
        <h3 className={'font-medium text-white text-center text-3xl sm:text-5xl mb-3 sm:mb-6'}>
          ¿Dónde quieres recibir tu <span className="text-highlight">cashback</span>?
        </h3>
        <p className={'text-base text-white text-center px-16'}>
          <span className={'font-medium text-highlight'}>Importante: </span> 
          Asegúrate de ser el titular de la cuenta, ingresar los datos correctos y verificar que no haya límite de depósitos mensuales para recibir tu cashback correctamente.
        </p>
      </header>

      {/* form */}
      <div className={'lg:container mx-auto w-full'}>
        <div className={'grid grid-cols-12 form-card gap-3 sm:gap-4 md:gap-5 lg:gap-6 w-full mx-auto p-6 md:p-8 lg:p-10 xl:p-12'}>
          {/* bank name */}
          <div className={'col-span-12'}>
            <input
              type="text"
              className={`input input-border-gray ${accountData.bankNameError ? 'input-error' : ''}`}
              placeholder={`Banco*`}
              value={accountData.bankName}
              name={'bankName'}
              onChange={handleInputChange}
              ref={el => inputRefs.current.bankName = el}
            />
            {/* error */}
            {accountData.bankNameError && (
              <p className={'text-red-500 text-xs mt-1 mx-3'}>
                {accountData.bankNameError}
              </p>
            )}
          </div>

          {/* bank account number */}
          <div className={'col-span-12'}>
            <input
              type="text"
              className={`input input-border-gray ${accountData.bankAccountNumberError ? 'input-error' : ''}`}
              placeholder={`Número de Cuenta*`}
              value={accountData.bankAccountNumber}
              name={`bankAccountNumber`}
              onChange={handleInputChange}
              ref={el => inputRefs.current.bankAccountNumber = el}
            />
            {/* error */}
            {accountData.bankAccountNumberError && (
              <p className={'text-red-500 text-xs mt-1 mx-3'}>
                {accountData.bankAccountNumberError}
              </p>
            )}
          </div>

          {/* confirmation */}
          <div className={'col-span-12'}>
            <input
              type="text"
              className={`input input-border-gray`}
              placeholder={`Confirma tu Número de Cuenta*`}
              value={accountData.bankAccountNumberConfirmation}
              name={`bankAccountNumberConfirmation`}
              onChange={handleInputChange}
              ref={el => inputRefs.current.bankAccountNumberConfirmation = el}
            />
          </div>

          {/* interbank clabe */}
          <div className={'col-span-12'}>
            <input
              type="text"
              className={`input input-border-gray ${accountData.interbankClabeError ? 'input-error' : ''}`}
              placeholder={`Clave Interbancaria*`}
              value={accountData.interbankClabe}
              name={`interbankClabe`}
              onChange={handleInputChange}
              ref={el => inputRefs.current.interbankClabe = el}
            />
            {/* error */}
            {accountData.interbankClabeError && (
              <p className={'text-red-500 text-xs mt-1 mx-3'}>
                {accountData.interbankClabeError}
              </p>
            )}
          </div>

          {/* confirmation */}
          <div className={'col-span-12'}>
            <input
              type="text"
              className={`input input-border-gray`}
              placeholder={`Confirma tu clave interbancaria*`}
              value={accountData.interbankClabeConfirmation}
              name={`interbankClabeConfirmation`}
              onChange={handleInputChange}
              ref={el => inputRefs.current.interbankClabeConfirmation = el}
            />
          </div>

          <div className={'col-span-12'}>
            <p className={`text-base text-white font-medium`}>
              Campos Obligatorios*
            </p>
          </div>

          {/* next */}
          {!accountData.showPaymentForm && (
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
