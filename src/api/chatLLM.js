
// server/api/generate-plan.js
import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();

router.post('/generate-plan', async (req, res) => {
  const { userMessage } = req.body;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`, // keep secret!
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.2-3b-instruct:free',
        messages: [
          { role: 'system', content: 'You are a helpful and focused daily planner assistant.' },
          { role: 'user', content: userMessage },
        ],
      }),
    });

    const data = await response.json();
    console.log(data)
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get LLM response' });
  }
});

export default router;

// export async function fetchLLMResponse(userMessage) {
//   const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       "Authorization": "Bearer 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", 
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