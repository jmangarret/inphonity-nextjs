"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Countdown from "@/components/Countdown";
import { useGetInvitationByIdQuery, useRejectInvitationMutation } from "@/lib/services/invitationsApi";
import { ModalContext } from "@/contexts/ModalContext";
import PlusDecoration from "@/components/PlusDecoration";
import { request } from "@/mocks/request-data";

type InvitationSectionProps = {
  invitationId: string;
};

const InvitationSection: React.FC<InvitationSectionProps> = ({ invitationId }) => {
  const router = useRouter();
  const { openModal } = React.useContext(ModalContext);
  // TODO: descomentar
  const {
    isLoading: isLoadingInvitation,
    isFetching: isFetchingInvitation,
    data: invitationData,
    error: invitationError
  } = useGetInvitationByIdQuery(invitationId);
  // const { isLoading: isLoadingInvitation, isFetching: isFetchingInvitation, data: invitationData, error: invitationError, refetch: invitationRefetch } = request;

  const [rejectInvitation, {
    isLoading: isRejectingInvitation,
    error: rejectError
  }] = useRejectInvitationMutation();

  const handleReject = async () => {
    try {
      await rejectInvitation(invitationId);

      openModal(
        <div>
          <p
            className={`text-center text-xl lg:text-3xl p-4 md:p-5 text-white`}
          >
            Entendemos que en este momento <br /> <b>no estés listo para unirte a inphonity.</b>
            <br />
            <br />
            ¡Hasta pronto!
          </p>
        </div>,
      ).then(() => {
        window.location.href = 'https://inphonity.com/';
      });
    } catch (err) {
    }
  };

  const handleAccept = () => {
    router.push(`/accepted/${invitationId}`);
  };

  return (
    <section className="container mx-auto p-3 sm:p-6 md:p-8 bg-[url('/img/Seccion-7.svg')]">
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-3 text-center">
          {/* plus decoration */}
          {/* <div className="hidden md:block md:col-span-1 relative">
            <PlusDecoration
              className={`w-10 md:w-12 lg:w-14 xl:w-16 absolute`}
              style={{bottom: '20%'}}
            />
          </div> */}
          <div className={`col-span-12 md:col-span-12`}>
            <h2 className="text-3xl lg:text-5xl mb-8 sm:mb-12 md:mb-16 lg:mb-20 text-center mt-6 lg:mt-8 xl:mt-10">
              Haz realidad todo lo que <span className="font-medium text-highlight">siempre imaginaste</span>
            </h2>
          </div>
          {/* plus decoration */}
          {/* <div className="hidden md:block md:col-span-1 relative">
            <PlusDecoration
              className={`w-4 md:w-6 lg:w-8 xl:w-10 absolute`}
              style={{bottom: '10%'}}
            />
          </div> */}

          {/* plus decoration */}
          {/* <div className="hidden md:block md:col-span-1 relative">
            <PlusDecoration
              className={`w-4 md:w-6 lg:w-8 xl:w-10 absolute`}
              style={{bottom: '10%'}}
            />
          </div> */}
          {/* countdown */}
          <div className="col-span-12 bg-white p-10 rounded-3xl border-4 border-white shadow-lg gap-4 mx-auto lg:w-[64.375rem] lg:h-[29.438rem]">
            <div className={`col-span-12 md:col-span-12 mb-10`}>
              <h2
                className="text-black font-medium text-3xl sm:text-4xl lg:text-5xl mb-5 sm:mb-7 md:mb-9 lg:mb-12 xl:mb-14 text-center mx-auto"
              >
                Tiempo restante
              </h2>
              {/* TODO: descomentar  */}
              {isLoadingInvitation || isFetchingInvitation ? (
                <div
                  className="font-medium text-2xl sm:text-3xl lg:text-5xl xl:text-8xl bg-gray-300 animate-pulse h-6 sm:h-7 md:h-8 lg:h-9 xl:h-10 mb-3 w-3/4 inline-block"
                  style={{verticalAlign: "middle"}}
                ></div>
              ) : (
                invitationData && (
              <Countdown
                expiresAt={invitationData.expires_at}
              />
              )
              )}
            </div>
            {/* accept invitation */}
            <div className="col-span-12 sm:col-span-0 md:col-span-0 lg:col-span-2 mt-10"></div>
            <div className="flex justify-center gap-4 flex-wrap">
              <div className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4">
                <div className="button-container w-4/5 lg:w-72 mx-auto flex justify-center">
                  <button className="btn-xl multi-border font-medium text-black block w-full"
                    onClick={handleReject}
                    disabled={isRejectingInvitation}
                  >
                    DECLINAR
                  </button>
                </div>
              </div>

              <div className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4">
                <div className="button-container w-4/5 lg:w-72 mx-auto mb-6 flex justify-center">
                  <button className="btn-xl multi-border font-medium bg-black text-white block w-full"
                    onClick={handleAccept}
                  >
                    ACEPTAR INVITACIÓN
                  </button>
                </div>
              </div>
            </div>
            <div className="col-span-12 sm:col-span-0 md:col-span-0 lg:col-span-2"></div>
          </div>
          {/* plus decoration */}
          {/* <div className="hidden md:block md:col-span-1 relative">
            <PlusDecoration
              className={`w-10 md:w-12 lg:w-14 xl:w-16 absolute`}
              style={{bottom: '20%'}}
            />
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default InvitationSection;
