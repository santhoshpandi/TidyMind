export default function SlideIndicator({ TOTAL_SLIDES, currentSlide }) {

  const array = Array.from({ length: TOTAL_SLIDES })

  return (
    <div className="fixed top-8 right-8 flex gap-2 z-10">
      {array.map((_, i) => (
        <div
          key={i}
          className={`w-3 h-3 rounded-full transition-all ${currentSlide === i ? "bg-orange-500 scale-125" : "bg-orange-400/30"
            }`}
        />
      ))}
    </div>
  )
}