import React from "react";
import Circle from "../assets/ellipse-165.svg";
import Icon from "../assets/icons.svg";

const FontCircle: React.FC = () => {
  return (
    <div className="flex items-center justify-center rounded-full w-32 h-32 relative">
      <img
        src={Circle}
        alt="Ellipse"
        className="absolute top-0 left-0 w-full h-full z-0"
      />
      <div className="z-10 flex items-center justify-center bg-white w-12 h-12 rounded-full">
        <img src={Icon} alt="Icon" className="w-8 h-8" />
      </div>
      <div className="absolute text-black text-sm">
        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1 left-1"></span>
      </div>
    </div>
  );
};

export default FontCircle;
