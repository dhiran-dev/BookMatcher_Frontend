import React from "react";
import MainForm from "./MainForm";


const Hero = () => {
  return (
    <div className="hero flex flex-col justify-center items-center w-5/6   mt-20">
      <div className="top-section h-full w-full flex flex-col justify-center items-center">
        <h1 className="text-3xl">Choose your book preference</h1>
        <MainForm />
      </div>
    </div>
  );
};

export default Hero;
