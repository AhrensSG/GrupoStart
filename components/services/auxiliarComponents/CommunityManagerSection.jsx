import React from "react";


const CommunityManagerSection = () => {
  return (
<div className="w-full h-full flex flex-col justify-between items-center gap-4">
      <div>
        <h2 className="text-4xl font-medium text-[#0853FC] text-center">
          Elegí tu plan
        </h2>
      </div>
      <div className="flex flex-col w-2/3 justify-center items-start gap-4">
        <span className="text-xl cursor-pointer">1 Plan emprendedor</span>
        <span className="text-xl cursor-pointer">2 Plan empresarial</span>
        <span className="text-xl cursor-pointer">3 Plan corporativo</span>
        <span className="text-xl cursor-pointer">
          4 Quiero mi plan personalizado
        </span>
      </div>
      <button className="border w-2/3 py-2 px-3 rounded-md bg-[#0853FC] text-white font-medium mt-2">
        Contratar
      </button>
    </div>
  );
};

export default CommunityManagerSection;
