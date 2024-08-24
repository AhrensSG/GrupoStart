import DesktopTemplate from "@/components/services/DesktopTemplate";
import DesktopBrandingSection from "@/components/services/auxiliarComponents/DesktopBrandingSection";
import Branding from "@/components/services/servicesV2/Branding";
import React from "react";

const DesktopBranding = () => {
  return (
    <DesktopTemplate
      footerImg="/services/FooterJirafe5.svg"
      icon="/services/Jirafe12.svg"
      media="/MediaPlayer.svg"
    >
      <Branding />
      <DesktopBrandingSection />
    </DesktopTemplate>
  );
};

export default DesktopBranding;
