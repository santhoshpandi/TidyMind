import { createContext, useContext, useEffect, useState } from "react";
import { fetchGeminiResponse } from "../api/chatGemini";
// Context Creation
const PlanContext = createContext()

// Context Provider
export function PlanProvider({ children }) {

  const rawData = localStorage.getItem('plan')
  const parsedData = JSON.parse(rawData)

  const initialSchedule = parsedData || [
    // { time: "6:00 AM - 7:00 AM", task: "Morning Run + Cold Shower", done: false },
    // { time: "7:00 AM - 8:00 AM", task: "Healthy Breakfast & Mindful Journaling", done: false },
    // { time: "8:00 AM - 10:00 AM", task: "Deep Work: Focus on Priority Tasks", done: false },
    // { time: "10:00 AM - 10:30 AM", task: "Short Walk & Hydration Break", done: false },
    // { time: "10:30 AM - 12:30 PM", task: "Creative Session / Learning", done: false },
    // { time: "12:30 PM - 1:30 PM", task: "Lunch & Relaxation", done: false },
    // { time: "1:30 PM - 3:30 PM", task: "Collaborative Work / Meetings", done: false },
    // { time: "3:30 PM - 4:00 PM", task: "Tea Break & Reflection", done: false },
    // { time: "4:00 PM - 6:00 PM", task: "Wrap Up Tasks & Plan Tomorrow", done: false },
    // { time: "6:00 PM onwards", task: "Family Time / Hobbies / Rest", done: false },
  ];

  const [schedule, setSchedule] = useState(initialSchedule);
  const [feeling, setFeeling] = useState(localStorage.getItem('feeling') || 'happy')
  const [focus, setFocus] = useState(localStorage.getItem('focus') || 'study')

  const [loading, setLoading] = useState(false)

  async function fetchPlan() {
    if (feeling === '' || focus === '') return;

    const userMessage = `
            I'm feeling "${feeling}" today and I want to focus on "${focus}".

            If either the mood or focus seems like gibberish (e.g., random letters), assume a calm, neutral emotional state and a generic productivity-focused intention.

            Now, generate a realistic, motivating day plan in this strict JSON format:

            [
              { "time": "6:00AM - 7:00AM", "task": "Short task", "done": false },
              { "time": "7:00AM - 8:00AM", "task": "Another task", "done": false }
            ]
            Keep the plan realistic, motivating, and structured by time.

            Guidelines:
            - Keep each "task" under 30 characters 
            - Only return valid, raw JSON (no markdown, code blocks, or extra text)
            - Do not explain anything — just return the JSON array.
            `;

    setLoading(true) // For Loading Template
    const res = await fetchGeminiResponse(userMessage)

    if(res) {
      // console.log(res)
      const cleaned = res
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      const plan = JSON.parse(cleaned); // if the result is JSON string
    
      setSchedule(plan); // update context or component state
      localStorage.setItem('feeling', feeling); 
      localStorage.setItem('focus', focus); 
      localStorage.setItem('plan', JSON.stringify(plan)); 
      setLoading(false) // For Loading Template
    } else {
      console.error("Failed to parse Gemini response:");
    }

  }

  return (
    <PlanContext.Provider value={{ initialSchedule, schedule, setSchedule, feeling, setFeeling, focus, setFocus, loading, setLoading, fetchPlan }}>
      {children}
    </PlanContext.Provider>
  )
}

// Context Usage
export function usePlan() {
  return useContext(PlanContext)
}

