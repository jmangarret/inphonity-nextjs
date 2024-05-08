"use client";
import React, {useEffect, useMemo, useRef} from "react";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {
  setBankName,
  setBankAccountNumber,
  setBankAccountNumberConfirmation,
  setInterbankClabe,
  setInterbankClabeConfirmation, setShowPaymentForm,
  setInterbankClabeError,
} from "@/lib/features/account-data/accountDataSlice";
import { ModalContext } from "@/contexts/ModalContext";

export default function AccountDataForm() {
  const dispatch = useAppDispatch();
  const accountData = useAppSelector((state) => state.accountData);
  const { openModal } = React.useContext(ModalContext);

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
        dispatch(setBankAccountNumber(value.replace(/\D/g, '')));
        break;
      case "bankAccountNumberConfirmation":
        dispatch(setBankAccountNumberConfirmation(value.replace(/\D/g, '')));
        break;
      case "interbankClabe":
        dispatch(setInterbankClabe(value));
        if(value.length == 18){
          handleErrorClave(e);
        }
        break;
      case "interbankClabeConfirmation":
        dispatch(setInterbankClabeConfirmation(value));
        break;
      default:
        break;
    }
  }

  const handleAccountNumber = () => {
    if (accountData.bankAccountNumber !== accountData.bankAccountNumberConfirmation) {
      if (!accountData.bankAccountNumber || !accountData.bankAccountNumberConfirmation){
        return true;
      }
      setShowPaymentForm(false);
      openModal(
        <div className="flex flex-col items-center justify-center h-full text-white">
            <p className={`text-center text-3xl lg:text-3xl p-4 md:p-5 text-white ajuste_centro`}>
            El Número de Cuenta no coincide.
          </p>
        </div>,
      );

      return false;
    }
    return true;
  }

  const handleErrorClave = (e: { target: { value: any; }; }) => {
    const value = e.target.value;
    if(value.length < 18 || value.length > 18){
      dispatch(setInterbankClabeError('El campo CLABE interbancaria debe contener 18 caracteres.'));
    }else{
      dispatch(setInterbankClabeError(''));
    }
  }

  const handleClave = () => {
    if (accountData.interbankClabe !== accountData.interbankClabeConfirmation) {
      if (!accountData.interbankClabe || !accountData.interbankClabeConfirmation){
        return true;
      }
      setShowPaymentForm(false);
      openModal(
        <div className="flex flex-col items-center justify-center h-full text-white">
            <p className={`text-center text-3xl lg:text-3xl p-4 md:p-5 text-white ajuste_centro`}>
            La CLABE interbancaria no coincide.
          </p>
        </div>,
      );

      return false;
    }
    return true;
  }

  const handleNextForm = () => {
    if (handleAccountNumber() && handleClave()){
      dispatch(setShowPaymentForm(true));
    }
  }

  return (
    <div className={'p-3 md:p-6 lg:p-9 xl:p-12'}>
      {/* header */}
      <header>
        <h3 className={'font-medium text-custom-blue text-center text-3xl sm:text-5xl mb-3 sm:mb-6'}>
          ¿Dónde quieres recibir tu cashback?
        </h3>
        <p className={'text-base text-black text-center px-16'}>
          <span className={'font-medium text-highlight-red'}>Importante: </span> 
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
              className={`input input-border-black ${accountData.bankNameError ? 'input-error' : ''}`}
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
              className={`input input-border-black ${accountData.bankAccountNumberError ? 'input-error' : ''}`}
              placeholder={`Número de cuenta*`}
              value={accountData.bankAccountNumber}
              name={`bankAccountNumber`}
              onChange={handleInputChange}
              onBlur={handleAccountNumber}
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
              className={`input input-border-black`}
              placeholder={`Confirma tu número de cuenta*`}
              value={accountData.bankAccountNumberConfirmation}
              name={`bankAccountNumberConfirmation`}
              onChange={handleInputChange}
              onBlur={handleAccountNumber}
              ref={el => inputRefs.current.bankAccountNumberConfirmation = el}
            />
          </div>

          {/* interbank clabe */}
          <div className={'col-span-12'}>
            <input 
              type="text"
              className={`input input-border-black ${accountData.interbankClabeError ? 'input-error' : ''}`}
              placeholder={`CLABE interbancaria*`}
              value={accountData.interbankClabe}
              name={`interbankClabe`}
              onChange={handleInputChange}
              onBlur={handleErrorClave}
              ref={el => inputRefs.current.interbankClabe = el}
              minLength={18}
              maxLength={18}
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
              className={`input input-border-black`}
              placeholder={`Confirma tu CLABE interbancaria*`}
              value={accountData.interbankClabeConfirmation}
              name={`interbankClabeConfirmation`}
              onChange={handleInputChange}
              onBlur={handleClave}
              ref={el => inputRefs.current.interbankClabeConfirmation = el}
              minLength={18}
              maxLength={18}
            />
          </div>

          <div className={'col-span-12'}>
            <p className={`text-base text-black font-medium`}>
              Campos Obligatorios*
            </p>
          </div>

          {/* next */}
          {!accountData.showPaymentForm && (
            <div className={`col-span-12`}>
              <div className="flex justify-center">
                <div className="button-container">
                  <button
                    className="btn-xl multi-border bg-black font-medium text-white disabled:opacity-50"
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
