import React from "react";

interface ButtonProps {
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ className }) => {
  return (
    <button
      className={`bg-black text-white text-lg px-8 py-4 rounded-full hover:bg-gray-800 transition duration-300 ${className}`}
    >
      Get started
    </button>
  );
};

export default Button;
