import React from "react";
import FloatingShapes from "./animations/FloatingShapes";
import PlanTemplate from './template/PlanTemplate'
import DefaultTemplate from './template/DefaultTemplate.jsx'

const Planner_4 = ({ active }) => (
  <div className="w-screen min-h-screen flex flex-col justify-center items-center  relative">
    <FloatingShapes />
    {active && (
      <div
        key="planner-active"
        className="  w-full gap-4 py-4 animate-slideIn transition-opacity duration-1000 relative z-10 opacity-100 flex flex-col items-center"
      >     
        <DefaultTemplate />
        <PlanTemplate />
      </div>
    )}
  </div>
);

export default Planner_4;
