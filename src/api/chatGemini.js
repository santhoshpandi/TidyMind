import axios from "axios";
import { enqueueSnackbar } from "notistack";

export async function fetchGeminiResponse(userMessage) {

  try {
    const response = await axios.post(
      // API EndPoint
      `${import.meta.env.VITE_GEMINI_MODEL_URI}?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
      // Prompt in Body
      {
        contents: [
          {
            parts: [{ text: userMessage }]
          }
        ]
      },
      // Headers Configuration
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    const data = response.data
    // console.log(response)
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return text;
  }
  catch (err) {
    enqueueSnackbar('Error in API, Try again later...', { variant: 'error' })
    console.error("Gemini error:", err.message);
    return JSON.stringify([])
  }

}
