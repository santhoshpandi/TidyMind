
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { userMessage } = req.body;

  if (!userMessage) {
    return res.status(400).json({ error: 'Missing userMessage' });
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.2-3b-instruct:free",
        messages: [
          { role: "system", content: "You are a helpful and focused daily planner assistant." },
          { role: "user", content: userMessage }
        ]
      })
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'OpenRouter API failed' });
    }

    const data = await response.json();
    res.status(200).json({ content: data.choices?.[0]?.message?.content || "" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
