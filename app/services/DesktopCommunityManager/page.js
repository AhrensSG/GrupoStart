import DesktopTemplate from "@/components/services/DesktopTemplate";
import DesktopCommunityManagerSection from "@/components/services/auxiliarComponents/DesktopCommunityManagerSection";
import React from "react";

const DesktopCommunityManager = () => {
  return (
    <DesktopTemplate
      footerImg="/services/FooterJirafe3.svg"
      icon="/services/Jirafe10.svg"
      media="/MediaPlayer.svg"
    >
      <DesktopCommunityManagerSection />
    </DesktopTemplate>
  );
};

export default DesktopCommunityManager;
