import DesktopTemplate from "@/components/services/DesktopTemplate";
import DesktopGraphicDesignSection from "@/components/services/auxiliarComponents/DesktopGraphicDesignSection";
import React from "react";

const DesktopGraphicDesign = () => {
  return (
    <DesktopTemplate
      footerImg="/services/FooterJirafe2.svg"
      icon="/services/Jirafe5.svg"
      media="/MediaPlayer.svg"
    >
      <DesktopGraphicDesignSection />
    </DesktopTemplate>
  );
};

export default DesktopGraphicDesign;
