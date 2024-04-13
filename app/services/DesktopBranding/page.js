import DesktopTemplate from "@/components/services/DesktopTemplate";
import DesktopBrandingSection from "@/components/services/auxiliarComponents/DesktopBrandingSection";
import React from "react";

const DesktopBranding = () => {
  return (
    <DesktopTemplate
      footerImg="/services/FooterJirafe5.svg"
      icon="/services/Jirafe12.svg"
      media="/MediaPlayer.svg"
    >
      <DesktopBrandingSection />
    </DesktopTemplate>
  );
};

export default DesktopBranding;
