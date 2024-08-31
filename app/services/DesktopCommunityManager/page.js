import DesktopTemplate from "@/components/services/DesktopTemplate";
import ComunnityManager from "@/components/services/servicesV2/ComunnityManager";
import React from "react";

const DesktopCommunityManager = () => {
  return (
      
      <DesktopTemplate
        icon="/services/Jirafe10.svg"
        media="/MediaPlayer.svg"
      >
        <ComunnityManager/>
      </DesktopTemplate>
  );
};

export default DesktopCommunityManager;
