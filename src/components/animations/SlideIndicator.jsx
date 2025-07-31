import { useSlide } from "../../contexts/SlideContext"

export default function SlideIndicator({ TOTAL_SLIDES, currentSlide }) {

  const array = Array.from({ length: TOTAL_SLIDES })
  const { setCurrentSlide } = useSlide()

  return (
    <div className="fixed top-8 right-8 flex gap-2 z-10">
      {array.map((_, i) => (
        <div
          key={i}
          onClick={()=>setCurrentSlide(i)}
          className={`w-3 h-3 rounded-full transition-all cursor-pointer ${currentSlide === i ? "bg-orange-500 scale-125" : "bg-orange-400/30"
            }`}
        />
      ))}
    </div>
  )
}