import Image from "next/image";
import React from "react";

const CheckSpan = ({
  title = "Contenido de valor e imágenes del cliente o el internet",
  icon = "/services/CheckIcon.svg"
}) => {
  return (
    <span className="flex justify-start items-start gap-2">
      <Image
        src={icon}
        width={20}
        height={20}
        alt="checkIcon"
      />
      {title}
    </span>
  );
};

export default CheckSpan;
