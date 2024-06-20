"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ValidateCompatibility from "@/app/accepted/[invitationId]/ValidateCompatibility";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RegisterForms from "@/app/accepted/[invitationId]/RegisterForms";
import SignContract from "@/app/accepted/[invitationId]/SignContract";
import SelectOfferSection from "@/app/accepted/[invitationId]/SelectOfferSection";
import { useAppSelector } from "@/lib/hooks";
import { useGetInvitationByIdQuery } from "@/lib/services/invitationsApi";
import Image from "next/image";
import { request } from "@/mocks/request-data";

export default function Accepted({ params }: { params: { invitationId: string } }) {
  const plan = useAppSelector((state) => state.plan);
  const invitationIdDecoded = atob(params.invitationId.replace("%3D", "="));
  const {
    isLoading: isLoadingInvitation,
    isFetching: isFetchingInvitation,
    data: invitationData,
    error: invitationError
  } = useGetInvitationByIdQuery(invitationIdDecoded);
  // const { isLoading: invitationIsLoading, isFetching: invitationIsFetching, data: invitationData, error: invitationError, refetch: invitationRefetch } = request;

  
  const router = useRouter();
  //TODO: descomentar
  React.useEffect(() => {
    if (invitationError) {
      router.push('/404');
    }
  }, [invitationError, router]);

  return (
    <>
      <main>
        <ValidateCompatibility />
        <SelectOfferSection />
        <RegisterForms
          invitationId={invitationIdDecoded!}
        />
        {invitationData && invitationData.status === 'accepted' && (
          <SignContract
            invitationId={params.invitationId!}
            invitationIdDecoded={invitationIdDecoded!}
          />
        )}
      </main>
      <Footer />
    </>
  );
}
