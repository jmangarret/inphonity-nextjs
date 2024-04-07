"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useInitialPaymentMutation, useRegisterMutation, ApiValidationError } from "@/lib/services/registersApi";
import {
  setLastNameError,
  setNameError,
  setPhoneError,
  setSecondLastNameError,
  setEmailError,
  setCurpError,
  setDateOfBirthError,
  setIdFrontPictureError,
  setIdBackPictureError,
  resetErrors as personalDataResetErrors
} from "@/lib/features/personal-data/personalDataSlice";
import {
  setCityError,
  setNeighborhoodError,
  setNumberError,
  setStateError,
  setStreetError,
  setZipCodeError,
  resetErrors as shippingResetErrors
} from "@/lib/features/shipping/shippingSlice";
import { ModalContext } from "@/contexts/ModalContext";
import {
  setBankAccountNumberError,
  setBankNameError,
  setInterbankClabeError,
  resetErrors as accountDataResetErrors
} from "@/lib/features/account-data/accountDataSlice";
import { resetErrors as taxDateResetErrors } from "@/lib/features/tax-data/taxDataSlice";
import { PreRegistration, useGetInvitationByIdQuery } from "@/lib/services/invitationsApi";
import { setIsPaid } from "@/lib/features/plan/planSlice";
import PlusDecoration from "@/components/PlusDecoration";

type PaymentFormProps = {
  invitationId: string;
};

interface TabItemProps {
  title: string;
  activeTab: string;
  onClick: () => void;
}

declare let OpenPay: any;

const formatNumberToMoney = (number: number) => {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(number);
}

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

async function printDiv(divId: string) {
  const input = document.getElementById(divId);

  if (input) {
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const pageWidth = 612;
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const scaleFactor = pageWidth / imgWidth;
    const width = imgWidth * scaleFactor / 4;
    const height = imgHeight * scaleFactor / 4;

    // @ts-ignore
    pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
    pdf.save(`comprobante-de-pago-${new Date().toLocaleDateString()}.pdf`);
  }
}

async function copyToClipboard(divId: string) {
  const input = document.getElementById(divId);

  if (input) {
    const canvas = await html2canvas(input);
    canvas.toBlob(async (blob) => {
      try {

        await navigator.clipboard.write([
          new ClipboardItem({
            // @ts-ignore
            'image/png': blob
          })
        ]);
      } catch (error) {
      }
    });
  }
}

const PaymentForm: React.FC<PaymentFormProps> = ({ invitationId }) => {
  const { openModal, closeModal } = React.useContext(ModalContext);
  const dispatch = useAppDispatch();
  const accountData = useAppSelector((state) => state.accountData);
  const personalData = useAppSelector((state) => state.personalData);
  const shipping = useAppSelector((state) => state.shipping);
  const taxData = useAppSelector((state) => state.taxData);
  const plan = useAppSelector((state) => state.plan);
  const shippingData = useAppSelector((state) => state.shipping);
  const {
    isLoading: invitationIsLoading,
    isFetching: invitationIsFetching,
    data: invitationData,
    error: invitationError,
    refetch: invitationRefetch
  } = useGetInvitationByIdQuery(invitationId);
  const [register, { isLoading: registerIsLoading, error: registerError }] = useRegisterMutation();
  const [initialPayment, {
    isLoading: initialPaymentIsLoading,
    error: initialPaymentError
  }] = useInitialPaymentMutation();
  const [activeTab, setActiveTab] = useState("Pago con tarjeta");
  const [form, setForm] = useState({
    cardHolderName: "",
    cadHolderNameError: "",
    cardNumber: "",
    cardNumberError: "",
    expirationDateMonth: "",
    expirationDateMonthError: "",
    expirationDateYear: "",
    expirationDateYearError: "",
    cvv: "",
    cvvError: "",
    isSubmitting: false,
  });

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handlePayment = async (method: string) => {
    setForm({
      ...form,
      isSubmitting: true
    });

    const invitationId = window.location.pathname.split("/")[2];

    // reset errors
    dispatch(taxDateResetErrors());
    dispatch(accountDataResetErrors());
    dispatch(shippingResetErrors());
    dispatch(personalDataResetErrors());

    // register
    try {
      await register({
        invitation_id: invitationId,
        first_name: personalData.name,
        last_name: personalData.lastName,
        mother_last_name: personalData.secondLastName,
        contact_phone_number: personalData.phone,
        curp: personalData.curp,
        gender: personalData.gender,
        bank_name: accountData.bankName,
        bank_account_number: accountData.bankAccountNumber,
        bank_account_number_confirmation: accountData.bankAccountNumber,
        interbank_clabe: accountData.interbankClabe,
        interbank_clabe_confirmation: accountData.interbankClabe,
        email: personalData.email,
        date_of_birth: personalData.dateOfBirth,
        id_front_picture: personalData.idFrontPicture,
        id_back_picture: personalData.idBackPicture,
        address_zip_code: shippingData.zipCode,
        address_state: shippingData.state,
        address_city: shippingData.city,
        address_neighborhood: shippingData.neighborhood,
        address_complement: shippingData.complement,
        address_number: shippingData.number,
        address_interior_number: shippingData.interiorNumber,
        address: shippingData.street,
        rfc: taxData.rfc,
        name: taxData.name,
        tax_zip_code: taxData.zipCode,
        street: taxData.street,
        exterior_number: taxData.exteriorNumber,
        interior_number: taxData.interiorNumber,
        neighborhood: taxData.neighborhood,
        zip_code: taxData.zipCode,
        municipality: taxData.municipality,
        state: taxData.state,
        tax_email: taxData.email,
        product_id: plan.id!,
        is_esim: shippingData.isEsim,
      }).unwrap();
    } catch (error) {
      const { data } = error as ApiValidationError;

      if (data.message) {
        openModal(
          <div>
            <p
              className={`text-center text-lg p-4 md:p-5`}
            >
              {data.message}
            </p>
          </div>,
        );
      }

      setForm({
        ...form,
        isSubmitting: false
      });

      return;
    }

    OpenPay.setId(process.env.NEXT_PUBLIC_OPENPAY_ID);
    OpenPay.setApiKey(process.env.NEXT_PUBLIC_OPENPAY_PK);
    OpenPay.setSandboxMode(process.env.NEXT_PUBLIC_OPENPAY_PRODUCTION === 'false');

    // validate card
    if (method === 'card') {
      let errors = {};
      if (!form.cardHolderName) {
        errors = {
          ...errors,
          cadHolderNameError: 'Ingresa el nombre del titular de la tarjeta.'
        }

      }
      if (!form.cardNumber) {
        errors = {
          ...errors,
          cardNumberError: 'Ingresa el número de la tarjeta.'
        }
      }
      if (!form.expirationDateMonth || !form.expirationDateYear) {
        errors = {
          ...errors,
          expirationDateMonthError: 'Ingresa el mes de expiración de la tarjeta.',
          expirationDateYearError: 'Ingresa el año de expiración de la tarjeta.'
        }
      }
      if (!form.cvv) {
        errors = {
          ...errors,
          cvvError: 'Ingresa el código de seguridad de la tarjeta.'
        }
      }
      if (Object.keys(errors).length > 0) {
        setForm({
          ...form,
          ...errors
        });
        return;
      }

      OpenPay.token.create({
        "card_number": form.cardNumber.replace(/\s/g, ''),
        "holder_name": form.cardHolderName,
        "expiration_year": form.expirationDateYear.slice(-2),
        "expiration_month": form.expirationDateMonth,
        "cvv2": form.cvv,
      }, (response: any) => {
        initialPayment({
          invitation_id: parseInt(invitationId),
          token_id: response.data.id,
          payment_method: 'card',
          deviceIdHiddenFieldName: 'deviceIdHiddenFieldName'
        }).then((response: any) => {
          // check if response contains error
          if (response.data.error) {
            openModal(
              <div
                className={`flex flex-col items-center justify-center h-full`}
              >
                <div className={`grid grid-cols-12`}>
                  <div className="hidden md:flex md:col-span-2 justify-center relative">
                    {/* PlusDecoration */}
                    <PlusDecoration
                      className="w-4 md:w-8 relative mx-auto"
                    />
                    {/* PlusDecoration */}
                    <PlusDecoration
                      className="w-9 md:w-12 lg:w-16 xl:w-20 absolute"
                      style={{ bottom: '0' }}
                    />
                  </div>

                  <div
                    className="col-span-12 md:col-span-8"
                  >
                    <h1 className={`text-6xl font-medium mb-12 text-center text-white ajuste_centro`}>
                      ¡Ups!
                    </h1>

                    <div
                      className={`flex mt-10 mb-10 justify-center`}
                    >
                      <div>
                        <Image
                          src={`/img/emoji-sorry.svg`}
                          alt={`SIM física`}
                          width={150}
                          height={150}
                          className={`ml-auto`}
                        />
                      </div>
                    </div>

                    <h1 className={`text-2xl font-medium mb-12`}>
                      Parece que hubo un pequeño
                      problema al procesar tu pago.
                      <br />
                      <br />
                      No te preocupes, <span className="text-highlight">intenta nuevamente
                        o utiliza otro método de pago.</span>
                    </h1>

                    <div className="button-container w-3/5 mx-auto">
                      <button
                        className="btn-xl multi-border font-medium block w-full"
                        onClick={closeModal}
                      >
                        Reintentar
                      </button>
                    </div>
                  </div>
                  <div
                    className={`hidden md:flex md:col-span-2 justify-center items-center`}
                  >
                    {/* PlusDecoration */}
                    <PlusDecoration
                      className="w-9 md:w-12 lg:w-16 xl:w-20"
                    />
                  </div>
                </div>
              </div>,
            );

            setForm({
              ...form,
              isSubmitting: false
            });

            return;
          }


          const { data }: { data: PreRegistration } = response;

          setForm({
            ...form,
            isSubmitting: false
          });

          invitationRefetch();
          dispatch(setIsPaid(true));

          openModal(
            <div
              className={`text-center bg-black text-white p-4 md:p-5 py-6 md:py-7 bg-black bg-vertical-gradient-black`}
              id={`payment-ticket`}
              style={{ width: '450px', height: '800px' }}
            >
              <div className={`grid grid-cols-12`}>
                <div className="hidden md:flex md:col-span-2 justify-center relative">
                  {/* PlusDecoration */}
                  <PlusDecoration
                    className="w-4 md:w-8 relative mx-auto"
                  />
                  {/* PlusDecoration */}
                  <PlusDecoration
                    className="w-9 md:w-12 lg:w-16 xl:w-20 absolute"
                    style={{ bottom: '0' }}
                  />
                </div>
                <div
                  className="col-span-12 md:col-span-8"
                >
                  <Image
                    src={`/img/payment-success-icon.svg`}
                    alt={`SIM física`}
                    width={150}
                    height={150}
                    className={`mx-auto block`}
                  />
                  <h1 className={`text-2xl font-medium mb-12`}>
                    Bienvenido a inphonity
                    <br />
                    <span style={{ color: '#00BF63' }}>Tu pago fue exitoso</span>
                    <br />
                    {formatNumberToMoney(data.product.price)}
                  </h1>

                  <div
                    className={`flex mb-6 border-segmented-top pt-3`}
                  >
                    <div
                      className={`w-1/2 border-segmented-right`}
                    >
                      <p
                        className={`text-sm font-light p-4 text-left`}
                      >
                        Pagado con
                        <br />
                        <br />
                        Fecha de pago
                        <br />
                        <br />
                        Descripción
                        <br />
                        <br />
                        Referencia
                      </p>
                    </div>
                    <div
                      className={`w-1/2`}
                    >
                      <p
                        className={`text-sm font-medium p-4 text-right`}
                      >
                        {form.cardNumber.slice(0, 4) + '**** **** ' + form.cardNumber.slice(-4)}
                        <br />
                        <br />
                        {new Date().toLocaleDateString()}
                        <br />
                        <br />
                        {data.product.name}
                        <br />
                        <br />
                        {data.payment_reference}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`text-sm font-light mb-12`}
                  >
                    <p>
                      Tu comprobante de pago ha sido enviado a
                      <br />
                      <span className={`font-medium`}>{personalData.email}</span>
                    </p>
                  </div>

                  <div className="flex w-3/5 mx-auto mb-6 justify-center">
                    <button
                      className={`text-white text-sm`}
                      onClick={() => printDiv('payment-ticket')}
                    >
                      <Image
                        src={`/img/download-icon.svg`}
                        alt={`Descargar comprobante`}
                        width={34}
                        height={34}
                        className={`block mx-auto`}
                      />
                      Descargar
                    </button>
                    <button
                      className={`ml-4 text-white text-sm`}
                      onClick={() => {
                        copyToClipboard('payment-ticket').then(() => {
                          openModal(
                            <div>
                              <p
                                className={`text-center text-lg p-4 md:p-5`}
                              >
                                Comprobante de pago copiado al portapapeles.
                              </p>
                            </div>,
                          );
                        });
                      }}
                    >
                      <Image
                        src={`/img/sharing-icon.svg`}
                        alt={`Compartir comprobante`}
                        width={24}
                        height={24}
                        className={`block mx-auto`}
                      />
                      Compartir
                    </button>
                  </div>

                  <div className="button-container w-3/5 mx-auto">
                    <button
                      className="button button-black font-medium block w-full disabled:opacity-50"
                      onClick={closeModal}
                    >
                      Aceptar
                    </button>
                  </div>
                </div>
                <div
                  className={`hidden md:flex md:col-span-2 justify-center items-center`}
                >
                  {/* PlusDecoration */}
                  <PlusDecoration
                    className="w-9 md:w-12 lg:w-16 xl:w-20"
                  />
                </div>
              </div>
            </div>,
          );
        });
      }, (response: any) => {
        setForm({
          ...form,
          isSubmitting: false
        });
        openModal(
          <div
            className={`text-center bg-black text-white p-4 md:p-5 py-6 md:py-7 bg-orange-gradient`}
          >
            <div className={`grid grid-cols-12`}>
              <div className="hidden md:flex md:col-span-2 justify-center relative">
                {/* PlusDecoration */}
                <PlusDecoration
                  className="w-4 md:w-8 relative mx-auto"
                />
                {/* PlusDecoration */}
                <PlusDecoration
                  className="w-9 md:w-12 lg:w-16 xl:w-20 absolute"
                  style={{ bottom: '0' }}
                />
              </div>

              <div
                className="col-span-12 md:col-span-8"
              >
                <h1 className={`text-4xl font-medium mb-12`}>
                  ¡Ups!
                </h1>

                <div
                  className={`flex mb-12 justify-center`}
                >
                  <div>
                    <Image
                      src={`/img/emoji-sorry.svg`}
                      alt={`SIM física`}
                      width={150}
                      height={150}
                      className={`ml-auto`}
                    />
                  </div>
                </div>

                <h1 className={`text-2xl font-medium mb-12`}>
                  Parece que hubo un pequeño
                  <br />
                  problema al procesar tu pago.
                  <br />
                  <br />
                  No te preocupes, intenta nuevamente
                  <br />
                  o utiliza otro método de pago.
                </h1>

                <div className="button-container w-3/5 mx-auto">
                  <button
                    className="button button-black font-medium block w-full disabled:opacity-50"
                    onClick={closeModal}
                  >
                    Reintentar
                  </button>
                </div>
              </div>
              <div
                className={`hidden md:flex md:col-span-2 justify-center items-center`}
              >
                {/* PlusDecoration */}
                <PlusDecoration
                  className="w-9 md:w-12 lg:w-16 xl:w-20"
                />
              </div>
            </div>
          </div>,
        );
      });
    }

    if (method === 'cash') {
      initialPayment({
        invitation_id: parseInt(invitationId),
        payment_method: 'cash',
      }).unwrap().then((data: any) => {

        setForm({
          ...form,
          isSubmitting: false
        });

        invitationRefetch();

        openModal(
          <div>
            <p
              className={`text-center text-lg p-4 md:p-5`}
            >
              Se ha generado tu referencia de pago.
            </p>
          </div>,
        ).then(() => {
          window.open(data.payment_url!, '_blank');
        });
      }).catch((error) => {
        setForm({
          ...form,
          isSubmitting: false
        });

        openModal(
          <div>
            <p
              className={`text-center text-lg p-4 md:p-5`}
            >
              Hubo un error al generar tu referencia de pago.
              <br />
              Intenta nuevamente.
            </p>
          </div>,
        );
      });
    }
  }

  useEffect(() => {
    if (registerError && 'data' in registerError) {
      const { data } = registerError as ApiValidationError;

      Object.entries(data.errors).forEach((error) => {
        const [key, value] = error;

        if (key === "first_name") {
          dispatch(setNameError(value[0]));
        }
        if (key === "last_name") {
          dispatch(setLastNameError(value[0]));
        }
        if (key === "mother_last_name") {
          dispatch(setSecondLastNameError(value[0]));
        }
        if (key === "contact_phone_number") {
          dispatch(setPhoneError(value[0]));
        }
        if (key === "email") {
          dispatch(setEmailError(value[0]));
        }
        if (key === "curp") {
          dispatch(setCurpError(value[0]));
        }
        if (key === "date_of_birth") {
          dispatch(setDateOfBirthError(value[0]));
        }
        if (key === "id_front_picture") {
          dispatch(setIdFrontPictureError(value[0]));
        }
        if (key === "id_back_picture") {
          dispatch(setIdBackPictureError(value[0]));
        }
        if (key === "address") {
          dispatch(setStreetError(value[0]));
        }
        if (key === "address_state") {
          dispatch(setStateError(value[0]));
        }
        if (key === "address_city") {
          dispatch(setCityError(value[0]));
        }
        if (key === "address_neighborhood") {
          dispatch(setNeighborhoodError(value[0]));
        }
        if (key === "address_zip_code") {
          dispatch(setZipCodeError(value[0]));
        }
        if (key === "address_number") {
          dispatch(setNumberError(value[0]));
        }
        if (key === "bank_name") {
          dispatch(setBankNameError(value[0]));
        }
        if (key === "interbank_clabe") {
          dispatch(setInterbankClabeError(value[0]));
        }
        if (key === "bank_account_number") {
          dispatch(setBankAccountNumberError(value[0]));
        }
        if (key === "product_id") {
          openModal(
            <div>
              <p
                className={`text-center text-lg p-4 md:p-5`}
              >
                Por favor, selecciona un plan.
              </p>
            </div>,
          );
        }
      });
    }
  }, [registerError, initialPaymentError]);

  return (
    <div className="m-3 md:p-6 lg:p-9 xl:p-12">
      {/* header */}
      <header
        className={'mb-4 md:mb-8 lg:mb-12 xl:mb-16 lg:ml-12'}
      >
        <h3
          className={'font-medium text-3xl sm:text-5xl mb-1 sm:mb-3'}
          style={{ color: '#F79F1A' }}
        >
          <Image
            src={`/img/orange-isotipo.svg`}
            alt={`inphonity isotipo`}
            width={40}
            height={40}
            className={`inline-block mr-2 w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14`}
            style={{ verticalAlign: 'middle' }}
          />
          Realiza pago
        </h3>
      </header>

      {invitationData && invitationData.pre_registration?.payment_status === 'paid' ? (
        <div className="bg-black text-white rounded-3xl p-5 m-3 text-center mb-10 font-medium">
          <h3 className={`text-highlight text-3xl md:text-6xl mb-6`}>
            Gracias por tu pago.
          </h3>
          <p className={`text-base mb-3`}>
            Tu pago ha sido registrado con éxito.
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row rounded-tl-md rounded-tr-md">
            <TabItem
              title={`Pago con tarjeta`}
              activeTab={activeTab}
              onClick={() => handleTabClick("Pago con tarjeta")}
            />
            <TabItem
              title={`Pago en efectivo`}
              activeTab={activeTab}
              onClick={() => handleTabClick("Pago en efectivo")}
            />
            <TabItem
              title={`Pago con transferencia interbancaria (SPEI)`}
              activeTab={activeTab}
              onClick={() => handleTabClick("Pago con transferencia interbancaria (SPEI)")}
            />
          </div>
          <div className="bg-white rounded-bl-md rounded-br-md p-6 md:p-8 lg:p-10 xl:p-12 border-2 border-highlight">
            {activeTab === "Pago con tarjeta" && (
              <div
                className={'grid grid-cols-12 form-card gap-3 sm:gap-4 md:gap-5 lg:gap-6 bg-white w-full mx-auto'}
                id={'payment-card'}
              >
                <p
                  className={`col-span-12 text-black text-3xl font-medium`}
                >
                  Tarjeta de crédito y débito
                </p>
                <div
                  className={'col-span-12'}
                >
                  <Image
                    src={`/img/card-brands.svg`}
                    alt={`cards`}
                    width={150}
                    height={30}
                    className={`w-40 sm:w-52 md:w-60 lg:w-72 xl:w-80`}
                  />
                </div>
                {/* cardholder name */}
                <div className={'col-span-12'}>
                  <input
                    type="text"
                    className={`input input-border-gray ${form.cadHolderNameError ? 'input-error' : ''}`}
                    placeholder={'Nombre en la tarjeta'}
                    value={form.cardHolderName}
                    onChange={(e) => setForm({ ...form, cardHolderName: e.target.value })}
                  />
                  {form.cadHolderNameError && (
                    <p
                      className={'text-red-500 text-xs mt-1 mx-3'}
                    >
                      {form.cadHolderNameError}
                    </p>
                  )}
                </div>

                {/* card number */}
                <div className={'col-span-12'}>
                  <input
                    value={form.cardNumber}
                    onChange={(e: { target: { value: any; }; }) => setForm({ ...form, cardNumber: e.target.value })}
                    type="text"
                    className={`input input-border-gray ${form.cardNumberError ? 'input-error' : ''}`}
                    placeholder="Número de tarjeta"
                  />
                  {/* error */}
                  {form.cardNumberError && (
                    <p
                      className={'text-red-500 text-xs mt-1 mx-3'}
                    >
                      {form.cardNumberError}
                    </p>
                  )}
                </div>

                <div
                  className={'col-span-12 flex gap-3 items-center'}
                >
                  <div
                  >
                    <label htmlFor="">
                      Fecha de expiración
                    </label>
                  </div>
                  {/* expiration date month */}
                  <div
                    className={'flex-1'}
                  >
                    <select
                      className={`input input-border-gray`}
                      value={form.expirationDateMonth}
                      onChange={(e) => setForm({ ...form, expirationDateMonth: e.target.value })}
                    >
                      <option value={""}>Mes</option>
                      {Array.from(Array(12).keys()).map((month) => {
                        const paddedMonth = (month + 1).toString().padStart(2, '0');
                        return (
                          <option
                            key={month}
                            value={paddedMonth}
                          >
                            {paddedMonth}
                          </option>
                        );
                      })}
                    </select>

                    {/* error */}
                    {form.expirationDateMonthError && (
                      <p
                        className={'text-red-500 text-xs mt-1 mx-3'}
                      >
                        {form.expirationDateMonthError}
                      </p>
                    )}
                  </div>

                  {/* expiration date year */}
                  <div className={'flex-1'}>
                    <select
                      className={`input input-border-gray`}
                      value={form.expirationDateYear}
                      onChange={(e) => setForm({ ...form, expirationDateYear: e.target.value })}
                    >
                      <option value={""}>Año</option>
                      {Array.from(Array(10).keys()).map((year) => (
                        <option
                          key={year}
                          value={new Date().getFullYear() + year}
                        >
                          {new Date().getFullYear() + year}
                        </option>
                      ))}
                    </select>
                    {/* error */}
                    {form.expirationDateYearError && (
                      <p
                        className={'text-red-500 text-xs mt-1 mx-3'}
                      >
                        {form.expirationDateYearError}
                      </p>
                    )}
                  </div>
                </div>

                {/* cvv */}
                <div className={'col-span-6'}>
                  <input
                    type="text"
                    className={`input input-border-gray ${form.cvvError ? 'input-error' : ''}`}
                    placeholder="Ingresa CVV"
                    value={form.cvv}
                    onChange={(e: { target: { value: any; }; }) => setForm({ ...form, cvv: e.target.value })}
                  />
                  {/* error */}
                  {form.cvvError && (
                    <p
                      className={'text-red-500 text-xs mt-1 mx-3'}
                    >
                      {form.cvvError}
                    </p>
                  )}
                </div>

                <div
                  className={'col-span-12'}
                >
                  <div className="button-container w-2/4 mx-auto">
                    <button
                      className="button button-black font-medium block w-full disabled:opacity-50"
                      onClick={() => handlePayment('card')}
                      disabled={initialPaymentIsLoading || form.isSubmitting}
                    >
                      Pagar
                    </button>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "Pago en efectivo" && (
              <div>
                <div className="button-container w-2/4 mx-auto">
                  <button
                    className="button button-black font-medium block w-full disabled:opacity-50"
                    onClick={() => handlePayment('cash')}
                    disabled={initialPaymentIsLoading || form.isSubmitting}
                  >
                    Generar referencia
                  </button>
                </div>
              </div>
            )}
            {activeTab === "Pago con transferencia interbancaria (SPEI)" && (
              <p>No disponible por el momento.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const TabItem: React.FC<TabItemProps> = ({ title, activeTab, onClick }) => {
  return (
    <button
      className={`px-4 py-2 bg-white ${activeTab === title
          ? "border-t-2 border-x-2 border-highlight relative"
          : "text-gray-500"
        }`}
      onClick={onClick}
      style={{
        borderBottom: '2px solid #FFF',
        bottom: '-2px'
      }}
    >
      {title}
    </button>
  );
};

export default PaymentForm;
