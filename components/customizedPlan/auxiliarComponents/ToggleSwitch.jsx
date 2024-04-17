import React from "react";

const ToggleSwitch = ({ value, setValue }) => {
  return (
    <div
      className={`cursor-pointer relative max-w-12`}
      onClick={() => setValue(!value)}
    >
      <div
        className={`absolute w-12 h-[22px] rounded-full ${
          !value
            ? "bg-gray-300"
            : "bg-[#FB8A00]"
        } duration-300 px-3`}
      >
        <div
          className={`absolute right-[26px] top-[3px] w-4 h-4 rounded-full ${
            !value
              ? "translate-x-0 bg-white"
              : "translate-x-[22px] bg-white"
          }   transform transition duration-500`}
        ></div>
      </div>
    </div>
  );
};

export default ToggleSwitch;
