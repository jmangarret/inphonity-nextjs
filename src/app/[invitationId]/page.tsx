import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LandingSection from "@/app/[invitationId]/LandingSection";
import HeroSection from "@/app/[invitationId]/HeroSection";
import BenefitsSection from "@/app/[invitationId]/BenefitsSection";
import PortabilitySection from "@/app/[invitationId]/PortabilitySection";
import OfferSection from "@/app/[invitationId]/OfferSection";
import CoverageSection from "@/app/[invitationId]/CoverageSection";
import InvitationSection from "@/app/[invitationId]/InvitationSection";

export default function Home({ params }: { params: { invitationId: string } }) {
  return (
    <>
      <Header />
      <main>
        <LandingSection
          invitationId={params.invitationId}
        />
        <HeroSection />
        <BenefitsSection />
        <PortabilitySection />
        <OfferSection />
        <CoverageSection />
        <InvitationSection
          invitationId={params.invitationId}
        />
        {/*<ContactSection />*/}
      </main>
      <Footer />
    </>
  );
}
