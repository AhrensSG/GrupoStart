import DesktopTemplate from "@/components/services/DesktopTemplate";
import DesktopCommunityManagerSection from "@/components/services/auxiliarComponents/DesktopCommunityManagerSection";
import ComunnityManager from "@/components/services/servicesV2/ComunnityManager";
import React from "react";

const DesktopCommunityManager = () => {
  return (
      
      <DesktopTemplate
        footerImg="/services/FooterJirafe3.svg"
        icon="/services/Jirafe10.svg"
        media="/MediaPlayer.svg"
      >
        <ComunnityManager/>
        <DesktopCommunityManagerSection />
      </DesktopTemplate>
  );
};

export default DesktopCommunityManager;
