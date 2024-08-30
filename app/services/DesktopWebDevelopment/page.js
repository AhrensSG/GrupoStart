import DesktopTemplate from "@/components/services/DesktopTemplate";
import DesktopWebDevelopmentSection from "@/components/services/auxiliarComponents/DesktopWebDevelopmentSection";
import React from "react";
import Media from "@/components/services/servicesV2/Media";

const DesktopWebDevelopment = () => {
  return (
    <DesktopTemplate
      footerImg="/services/FooterJirafe4.svg"
      icon="/services/Jirafe11.svg"
      media="/MediaPlayer.svg"
    >
      <Media />
      <DesktopWebDevelopmentSection />
    </DesktopTemplate>
  );
};

export default DesktopWebDevelopment;
