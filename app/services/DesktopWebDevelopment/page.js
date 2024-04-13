import DesktopTemplate from "@/components/services/DesktopTemplate";
import DesktopWebDevelopmentSection from "@/components/services/auxiliarComponents/DesktopWebDevelopmentSection";
import React from "react";

const DesktopWebDevelopment = () => {
  return (
    <DesktopTemplate
      footerImg="/services/FooterJirafe4.svg"
      icon="/services/Jirafe11.svg"
      media="/MediaPlayer.svg"
    >
      <DesktopWebDevelopmentSection />
    </DesktopTemplate>
  );
};

export default DesktopWebDevelopment;
