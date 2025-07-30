

const FloatingShapes = () => (
  <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
    <div
      className="absolute rounded-full bg-gradient-to-br from-[#FFE8D9] to-[#FFE7D7] animate-float"
      style={{
        width: "200px",
        height: "200px",
        top: "10%",
        left: "10%",
        animationDelay: "0s",
      }}
    />
    <div
      className="absolute rounded-full bg-gradient-to-br from-[#FEE6D6] to-[#FFE7D6] animate-float"
      style={{
        width: "150px",
        height: "150px",
        top: "60%",
        right: "15%",
        animationDelay: "2s",
      }}
    />
    <div
      className="absolute rounded-full bg-gradient-to-br from-[#FEE6D6] to-[#FFE7D6] animate-float"
      style={{
        width: "100px",
        height: "100px",
        bottom: "20%",
        left: "20%",
        animationDelay: "4s",
      }}
    />
    <style>
      {`
        @keyframes float {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}
    </style>
  </div>
);


export default FloatingShapes;