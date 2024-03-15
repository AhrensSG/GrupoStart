import React from "react";

const BulletSVG = ({ w = 21, h = 20 }) => {
  return (
    <div className="min-w-[21px]">
      <svg xmlns="http://www.w3.org/2000/svg" width={w} height={h} fill="none" viewBox="0 0 20 20">
        <circle cx={10.5} cy={10} r={10} fill="#FB8A00" />
      </svg>
    </div>
  );
};

export default BulletSVG;
