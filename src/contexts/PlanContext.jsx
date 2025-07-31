import { createContext, useContext, useEffect, useState } from "react";

// Context Creation
const PlanContext = createContext()

// Context Provider
export function PlanProvider({ children }) {

  const rawData = localStorage.getItem('plan')
  const parsedData = JSON.parse(rawData)

  const initialSchedule = parsedData || [
    { time: "6:00 AM - 7:00 AM", task: "Morning Run + Cold Shower", done: false },
    { time: "7:00 AM - 8:00 AM", task: "Healthy Breakfast & Mindful Journaling", done: false },
    { time: "8:00 AM - 10:00 AM", task: "Deep Work: Focus on Priority Tasks", done: false },
    { time: "10:00 AM - 10:30 AM", task: "Short Walk & Hydration Break", done: false },
    { time: "10:30 AM - 12:30 PM", task: "Creative Session / Learning", done: false },
    { time: "12:30 PM - 1:30 PM", task: "Lunch & Relaxation", done: false },
    { time: "1:30 PM - 3:30 PM", task: "Collaborative Work / Meetings", done: false },
    { time: "3:30 PM - 4:00 PM", task: "Tea Break & Reflection", done: false },
    { time: "4:00 PM - 6:00 PM", task: "Wrap Up Tasks & Plan Tomorrow", done: false },
    { time: "6:00 PM onwards", task: "Family Time / Hobbies / Rest", done: false },
  ];

  const [schedule, setSchedule] = useState(initialSchedule);
  const [feeling, setFeeling] = useState('happy')
  const [focus, setFocus] = useState('study')


  async function fetchPlan() {
    if (feeling === '' || focus === '') return;
    const userMessage = `
          I'm feeling "${feeling}" today and I want to focus on "${focus}".

          If either the mood or focus seems like gibberish or not meaningful (e.g., random characters), then assume a calm, neutral emotional state and a generic productivity-focused intention.

          Now, create a personalized, productive day plan for me in this JSON format:

          [
            { "time": "6:00 AM - 7:00 AM", "task": "Your task here", "done": false },
            { "time": "7:00 AM - 8:00 AM", "task": "Next task", "done": false }
          ]

          Keep the plan realistic, motivating, and structured by time. Only return valid JSON with no explanation.
          `;


    const res = await fetch('/api/generate-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userMessage }),
    });
    

    (function () {
      // setSchedule(prev => plan)
      localStorage.setItem('plan', JSON.stringify(initialSchedule))
    })()
    
  }


  return (
    <PlanContext.Provider value={{ initialSchedule, schedule, setSchedule, feeling, setFeeling, focus, setFocus, fetchPlan }}>
      {children}
    </PlanContext.Provider>
  )
}

// Context Usage
export function usePlan() {
  return useContext(PlanContext)
}

