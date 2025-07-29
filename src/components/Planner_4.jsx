import React from "react";
import FloatingShapes from "./animations/FloatingShapes";

const Planner_4 = ({ active }) => (
  <div className="w-screen h-screen flex flex-col justify-center items-center p-8 relative">
    <FloatingShapes />
    {active && (
      <div
        key="planner-active"
        className="max-w-xl w-full  animate-slideIn transition-opacity duration-1000 relative z-10 opacity-100"
      >
        <div className="bg-white/60 backdrop-blur-lg border-2 border-orange-200 rounded-2xl p-12 w-full text-center shadow-lg">
          <div className="text-lg text-orange-900 leading-relaxed">
            Your AI-generated day plan will appear here.
            <br /><br />
            Based on your mood and focus areas, TidyMind will create a personalized, thoughtful plan to help you navigate your day with clarity and purpose.
          </div>
        </div>
      </div>
    )}
  </div>
);

export default Planner_4;
