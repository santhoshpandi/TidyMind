import { useEffect, useState, useRef } from 'react';
import { animate } from 'animejs';
import { PiPlantBold } from "react-icons/pi";

const messages = [
  'Organizing your peaceful flow...',
  'Aligning with your goals...',
  'Adding clarity to your morning...',
  'Creating mindful momentum...',
  'Finding balance and intention...',
  'Brewing productivity and peace...',
  'Sketching your focused journey...',
];

export default function LoadingTemplate() {
  const [messageIndex, setMessageIndex] = useState(() => Math.floor(Math.random() * messages.length));
  const messageRef = useRef(null);

  // Helper to split message into span-wrapped letters
  const wrapText = text => {
  return text.split('').map((char, idx) => {
    const isSpace = char === ' ';
    return (
      <span
        key={idx}
        className="inline-block"
        style={{
          display: 'inline-block',
          opacity: 0,
          whiteSpace: isSpace ? 'pre' : 'normal',
          width: isSpace ? '0.4em' : 'auto',
        }}
      >
        {isSpace ? '\u00A0' : char}
      </span>
    );
  });
};


  // Animate message in wave
  const animateWave = () => {
    const letters = messageRef.current?.children || [];
    animate([...letters], {
      opacity: [0, 1],
      translateY: [10, 0],
      delay: (_, i) => i * 40,
      duration: 600,
      easing: 'inOut(2)',
    });
  };

  // Animate entrance
  useEffect(() => {
    animate('.loading-box', {
      opacity: [0, 1],
      scale: [0.95, 1],
      duration: 1000,
      easing: 'inOut(3)',
    });

    animate('.loading-title', {
      translateY: [-10, 0],
      opacity: [0, 1],
      delay: 300,
      duration: 800,
      easing: 'inOut(3)',
    });

    animateWave();
  }, []);

  // Change messages every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Re-animate letters on message change
  useEffect(() => {
    animateWave();
  }, [messageIndex]);

  return (
    <div className="loading-box w-full max-w-xl p-10 text-center border border-orange-200 bg-white/60 rounded-xl shadow-lg backdrop-blur text-orange-700 transition-all duration-500">
      <div className="loading-title text-2xl font-semibold mb-4 ">        
        <PiPlantBold className='text-orange-600 md:text-4xl text-3xl inline mr-2' /> 
        Preparing your personalized day plan...
      </div>

      <div
        ref={messageRef}
        className="text-lg font-light tracking-wide min-h-[2rem]"
      >
        {wrapText(messages[messageIndex])}
      </div>
    </div>
  );
}
