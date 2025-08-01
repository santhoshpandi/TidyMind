
export async function fetchGeminiResponse(userMessage) {
  const response = await fetch(
    `${import.meta.env.VITE_GEMINI_MODEL_URI}?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: userMessage }],
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    console.error("Gemini error:", error);
    throw new Error(`Gemini API error: ${error.error?.message || response.status}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  return text;
}


// export async function fetchLLMResponse(userMessage) {

//   const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       model: "meta-llama/llama-3.2-3b-instruct:free",
//       messages: [
//         { role: "system", content: "You are a helpful and focused daily planner assistant." },
//         { role: "user", content: userMessage }
//       ]
//     })
//   });

//   console.log(response)
//   if (!response.ok) {
//     throw new Error(`LLM API error: ${response.status}`);
//   }

//   const data = await response.json();
//   return data.choices?.[0]?.message?.content || "No response from LLM.";
// }