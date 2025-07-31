import React, { useState, useEffect, useRef } from "react";
import Home_1 from './components/Home_1';
import Mood_2 from './components/Mood_2';
import Focus_3 from './components/Focus_3';
import Planner_4 from './components/Planner_4';
import Navigation from "./components/animations/Navigation";
import SlideIndicator from "./components/animations/SlideIndicator";

const TOTAL_SLIDES = 4;

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesWrapperRef = useRef();

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight" && currentSlide < TOTAL_SLIDES - 1) {
        setCurrentSlide((s) => s + 1);
      } else if (e.key === "ArrowLeft" && currentSlide > 0) {
        setCurrentSlide((s) => s - 1);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentSlide]);

  // Touch navigation
  useEffect(() => {
    let startX = 0;
    let endX = 0;
    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
    };
    const handleTouchEnd = (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentSlide < TOTAL_SLIDES - 1) setCurrentSlide((s) => s + 1);
        else if (diff < 0 && currentSlide > 0) setCurrentSlide((s) => s - 1);
      }
    };
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentSlide]);

  // Slide animation
  useEffect(() => {
    if (slidesWrapperRef.current) {
      slidesWrapperRef.current.style.transform = `translateX(-${currentSlide * 100}vw)`;
    }
  }, [currentSlide]);

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
{/* 
         <div className="w-screen">
          <Planner_4 active = {currentSlide === 3} />
        </div> */}

      {/* Slide indicators */}
      <SlideIndicator currentSlide={currentSlide} TOTAL_SLIDES = {TOTAL_SLIDES} />
      <Navigation />

    </div>
  );
}

export default App;
