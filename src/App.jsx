import React, { useState, useEffect, useRef } from "react";
import Home_1 from './components/Home_1';
import Mood_2 from './components/Mood_2';
import Focus_3 from './components/Focus_3';
import Planner_4 from './components/Planner_4';
import Navigation from "./components/animations/Navigation";
import SlideIndicator from "./components/animations/SlideIndicator";
import { useSlide } from "./contexts/SlideContext";


function App() {
  
  const {slidesWrapperRef, currentSlide, TOTAL_SLIDES} = useSlide()

  return (
    <div className="relative w-screen  overflow-hidden font-sans bg-gradient-to-br from-[#FFF4EF] to-[#FFEDE1]">
      <div
        ref={slidesWrapperRef}
        className="flex w-[400vw] transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
      >
        <div className="w-screen h-screen">
          <Home_1 active={currentSlide === 0} />
        </div>
        <div className="w-screen h-screen">
          <Mood_2 active={currentSlide === 1} />
        </div>
        <div className="w-screen h-screen">
          <Focus_3 active={currentSlide === 2} />
        </div>
        <div className="w-screen">
          <Planner_4 active = {currentSlide === 3} />
        </div>
      </div>

         {/* <div className="w-screen">
          <Planner_4 active = {currentSlide === 3} />
        </div> */}

      {/* Slide indicators */}
      <SlideIndicator currentSlide={currentSlide} TOTAL_SLIDES = {TOTAL_SLIDES} />
      <Navigation />

    </div>
  );
}

export default App;
