"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Countdown from "@/components/Countdown";
import {useGetInvitationByIdQuery, useRejectInvitationMutation} from "@/lib/services/invitationsApi";
import {ModalContext} from "@/contexts/ModalContext";
import PlusDecoration from "@/components/PlusDecoration";

type InvitationSectionProps = {
  invitationId: string;
};

const InvitationSection: React.FC<InvitationSectionProps> = ({invitationId}) => {
  const router = useRouter();
  const { openModal } = React.useContext(ModalContext);
  const {
    isLoading: isLoadingInvitation,
    isFetching: isFetchingInvitation,
    data: invitationData,
    error: invitationError
  } = useGetInvitationByIdQuery(invitationId);
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
            className={`text-center text-lg p-4 md:p-5`}
          >
            Entendemos que en este momento no estés listo para unirte a inphonity.
            <br/>
            <br/>
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
    <section
      className="p-3 sm:p-6 md:p-8 lg:p-10 xl:p-12"
    >
      <div
        className="container mx-auto"
      >
        <div className="grid grid-cols-12 gap-3 text-center">
          {/* plus decoration */}
          {/* <div className="hidden md:block md:col-span-1 relative">
            <PlusDecoration
              className={`w-10 md:w-12 lg:w-14 xl:w-16 absolute`}
              style={{bottom: '20%'}}
            />
          </div> */}
          <div className={`col-span-12 md:col-span-12`}>
            <h2
              className="text-2xl sm:text-3xl lg:text-5xl mb-8 sm:mb-12 md:mb-16 lg:mb-20 text-center mt-6 lg:mt-8 xl:mt-10"
            >
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
          <div className={`col-span-12 md:col-span-12`}>
            <h2
              className="font-medium text-2xl sm:text-3xl lg:text-5xl mb-5 sm:mb-7 md:mb-9 lg:mb-12 xl:mb-14 text-center mx-auto"
            >
              Tiempo restante
            </h2>
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
          <div className="col-span-12 md:col-span-2"></div>
          <div className="col-span-12 md:col-span-4">
          <div className="button-container w-4/5 lg:w-72 mx-auto">
              <button
                className="button buttom-border-bottom-fix font-medium block w-full border-2"
                style={{background: 'rgba(0, 0, 0, 0)', color: 'white'}}
                onClick={handleReject}
                disabled={isRejectingInvitation}
              >
                Declinar
              </button>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4">
          <div className="button-container w-4/5 lg:w-72 mx-auto mb-6">
              <button
                className={`button buttom-border-bottom-fix font-medium block w-full border-2`}
                style={{background: 'rgba(0, 0, 0, 0)', color: 'white'}}
                onClick={handleAccept}
              >
                Aceptar invitación
              </button>
            </div>
          </div>
          <div className="col-span-12 md:col-span-2"></div>
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
