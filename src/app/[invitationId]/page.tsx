"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LandingSection from "@/app/[invitationId]/LandingSection";
import HeroSection from "@/app/[invitationId]/HeroSection";
import BenefitsSection from "@/app/[invitationId]/BenefitsSection";
import PortabilitySection from "@/app/[invitationId]/PortabilitySection";
import OfferSection from "@/app/[invitationId]/OfferSection";
import CoverageSection from "@/app/[invitationId]/CoverageSection";
import InvitationSection from "@/app/[invitationId]/InvitationSection";
import PaymentsSection from "@/app/[invitationId]/PaymentsMethod";
import ContactSection from "./ContactSection";
const Home = ({ params }: { params: { invitationId: string } }) => {
  const invitationIdDecoded = atob(params.invitationId.replace("%3D", "="));
  return (
    <>
      {/* <Header /> */}
      <main>
        <LandingSection invitationId={invitationIdDecoded!} />
        <HeroSection />
        <BenefitsSection />
        <PortabilitySection />
        <CoverageSection />
        <OfferSection />
        <PaymentsSection />
        <InvitationSection invitationId={invitationIdDecoded!} invitationHash={params.invitationId.replace("%3D", "=")} />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
};

export default Home;
