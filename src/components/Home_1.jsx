import React from "react";
import FloatingShapes from "./animations/FloatingShapes";
import { useSlide } from "../contexts/SlideContext";

const Home_1 = ({ active }) => {

  const { setCurrentSlide } = useSlide()

  return (
    <div
      className="w-screen h-screen flex flex-col justify-center items-center p-8 relative">
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
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setCurrentSlide(1)}
              className=" px-5 py-2 rounded-4xl  text-lg text-orange-800 bg-[#FFE6D6] shadow duration-150 hover:scale-[115%]">
              Start..
            </button>
            <button
              onClick={() => setCurrentSlide(3)}
              className=" px-5 py-2 rounded-4xl  text-lg text-orange-800 bg-[#FFE6D6] shadow duration-150 hover:scale-[115%]">
              My Plan
            </button>
          </div>
        </div>
      }

    </div>
  )
};

export default Home_1;
