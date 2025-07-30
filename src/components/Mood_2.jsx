import React from "react";
import FloatingShapes from "./animations/FloatingShapes";

const Mood_2 = ({ active }) => (
  <div className="w-screen h-screen flex flex-col justify-center items-center p-8 relative">
    <FloatingShapes />
    {active && (
      <div
        key="mood-active"
        className='text-center max-w-xl w-full animate-slideIn transition-opacity duration-1000 relative z-10 opacity-100'
      >
        <h2 className="text-3xl md:text-4xl font-light text-orange-700 mb-8 tracking-tight">
          How are you feeling today?
        </h2>
        <div className="w-full max-w-lg mb-8">
          <input
            type="text"
            id="moodInput"
            className="w-full px-8 py-6 border-2 border-orange-200 rounded-full text-base bg-white/80 backdrop-blur text-orange-900 transition-all outline-none focus:border-orange-500 focus:shadow-lg focus:bg-white/95 placeholder:text-orange-600/70"
            placeholder="Express your current mood or emotional state..."
          />
        </div>
      </div>
    )}
  </div>
);

export default Mood_2;
