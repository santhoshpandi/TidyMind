import React from "react";
import FloatingShapes from "./animations/FloatingShapes";

const Home_1 = ({ active }) => (
  <div className="w-screen h-screen flex flex-col justify-center items-center p-8 relative">
    <FloatingShapes />
    {
      active &&
      <div className="text-center max-w-2xl  w-full opacity-0 animate-slideIn">
        <h1 className="text-4xl md:text-6xl font-light text-amber-800 mb-6 tracking-tight">
          Welcome to TidyMind
        </h1>
        <p className="text-lg md:text-xl text-orange-900 mb-12 font-light leading-relaxed">
          Your personal AI companion for organizing thoughts, setting intentions, and creating meaningful daily plans.
        </p>
      </div>
    }

  </div>
);

export default Home_1;
