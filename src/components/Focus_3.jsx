import React from "react";
import FloatingShapes from './animations/FloatingShapes';
import { usePlan } from "../contexts/PlanContext";
import { useSlide } from "../contexts/SlideContext";
import { useRef, useEffect } from "react";
import { enqueueSnackbar } from "notistack";


const Focus_3 = ({ active }) => {

  const { focus, setFocus, fetchPlan } = usePlan()
  const { setCurrentSlide, currentSlide } = useSlide()
  const inputRef = useRef(null);

  useEffect(() => {
    if (currentSlide === 2 && inputRef.current) {
       const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 700); // Adjust delay if needed (100ms usually works)

    return () => clearTimeout(timer);
    }
  }, [currentSlide]);



  function handleChange(e) {
    setFocus(e.target.value)
    // console.log(focus)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      if (focus === '') {
        enqueueSnackbar('You should have some focus',{variant:'info'})
        return
      }
      
      fetchPlan()
      setCurrentSlide(prev => prev + 1); 
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center p-8 relative">
      <FloatingShapes />
      {active && (
        <div
          key="focus-active"
          className="text-center max-w-2xl w-full animate-slideIn transition-opacity duration-1000 relative z-10 opacity-100"
        >
          <h2 className="text-3xl md:text-4xl font-light text-orange-700 mb-8 tracking-tight">
            What do you want to focus on?
          </h2>
          <div className="w-full max-w-lg mb-8">
            <input
              ref={inputRef}
              type="text"
              id="focusInput"
              onKeyDown={handleKeyDown}
              value={focus}
              onChange={handleChange}
              className="w-full px-8 py-6 border-2 border-orange-200 rounded-full text-base bg-white/80 backdrop-blur text-orange-900 transition-all outline-none focus:border-orange-500 focus:shadow-lg focus:bg-white/95 placeholder:text-orange-600/70"
              placeholder="Share your goals, priorities, or areas of focus..."
            />
          </div>
        </div>
      )}
    </div>
  )

};

export default Focus_3;
