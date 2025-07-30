import { createContext, useContext } from "react";

// Context Creation
const PlanContext = createContext()

// Context Provider
export function PlanProvider({ children }) {
  
  const values = 10

  return (
    <PlanContext.Provider value={{values}}>
      {children}
    </PlanContext.Provider>
  )
}

// Context Usage
export function usePlan() {
  return useContext(PlanContext)
}

