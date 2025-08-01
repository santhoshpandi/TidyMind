import { createContext, useContext, useState, useRef, useEffect } from "react";

// Context Creation
const SlideContext = createContext()

// Context Provider
export function SlideProvider({ children }) {

  const TOTAL_SLIDES = 4;
  
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
    <SlideContext.Provider value={{TOTAL_SLIDES, currentSlide, setCurrentSlide, slidesWrapperRef}}>
      {children}
    </SlideContext.Provider>
  )
}

// Context Usage
export function useSlide() {
  return useContext(SlideContext)
}

