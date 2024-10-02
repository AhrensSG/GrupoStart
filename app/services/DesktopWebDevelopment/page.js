import DesktopTemplate from "@/components/services/DesktopTemplate";
import React from "react";
import Media from "@/components/services/servicesV2/Media";

const DesktopWebDevelopment = () => {
  return (
    <DesktopTemplate
    style={{
      display: "flex",
      height: "100%", // Agrega un estilo de height
      width: "100%", // Agrega un estilo de width
      overflow: "hidden", // Agrega un estilo de overflow
    }}
    >
      <Media />
    </DesktopTemplate>
  );
};

export default DesktopWebDevelopment;
