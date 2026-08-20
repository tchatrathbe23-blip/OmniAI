import OpenAI from "openai";

const PERSONA_PROMPTS = {
  balanced: "You are an intelligent, helpful, and eloquent AI assistant. Provide clear, well-structured, high-quality responses.",
  creative: "You are a highly creative writer and storyteller. Use rich metaphors, engaging tone, vivid descriptions, and captivating style.",
  professional: "You are an executive business consultant and professional communicator. Provide polished, precise, concise, and structured output.",
  coder: "You are an expert full-stack software engineer. Provide clean, well-commented code, modern architectural patterns, and concise explanations.",
  concise: "You are a master of brevity. Provide maximum insight in the fewest words possible with clean bullet points.",
};

// Supported models on Groq
const VALID_MODELS = [
  "openai/gpt-oss-120b",
  "openai/gpt-oss-20b",
  "qwen/qwen3.6-27b",
  "groq/compound-mini",
  "groq/compound",
  "canopylabs/orpheus-v1-english",
];

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const {
    prompt,
    model = "openai/gpt-oss-120b",
    temperature = 0.7,
    tone = "balanced",
    maxTokens = 1024,
  } = req.body || {};

  if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
    return res.status(400).json({ error: "Please provide a valid text prompt." });
  }

  const apiKey = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "Groq API key not configured. Please set GROQ_API_KEY in your .env.local file.",
    });
  }

  try {
    const groq = new OpenAI({
      apiKey,
      baseURL: "https://api.groq.com/openai/v1",
    });

    // Ensure model is valid for Groq, otherwise default to gpt-oss-120b
    let selectedModel = model;
    if (!VALID_MODELS.includes(selectedModel)) {
      selectedModel = "openai/gpt-oss-120b";
    }

    const systemPrompt = PERSONA_PROMPTS[tone] || PERSONA_PROMPTS.balanced;

    const completion = await groq.chat.completions.create({
      model: selectedModel,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt.trim() },
      ],
      temperature: Number(temperature) || 0.7,
      max_tokens: Number(maxTokens) || 1024,
    });

    const result = completion.choices[0]?.message?.content?.trim();

    if (!result) {
      throw new Error("No response returned from Groq.");
    }

    return res.status(200).json({
      result,
      model: completion.model || selectedModel,
      usage: completion.usage,
      isDemo: false,
    });
  } catch (error) {
    console.error("Groq API Error:", error);

    const status = error.status || 500;
    const message =
      error.error?.message ||
      error.message ||
      "Failed to generate text from Groq. Please check your Groq API key.";

    return res.status(status).json({
      error: message,
      details: error.code || "GROQ_ERROR",
    });
  }
}
