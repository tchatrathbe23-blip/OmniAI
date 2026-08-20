import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Sparkles,
  Send,
  Copy,
  Check,
  Download,
  Trash2,
  Sliders,
  History,
  Lightbulb,
  Zap,
  Bot,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Dynamically import Three.js background with SSR disabled
const ThreeBackground = dynamic(() => import("@/components/ThreeBackground"), {
  ssr: false,
});

const PRESETS = [
  {
    icon: "🚀",
    label: "Startup Pitch",
    prompt: "Write a high-converting 60-second pitch for an AI-powered autonomous coding IDE.",
  },
  {
    icon: "🌌",
    label: "Sci-Fi Lore",
    prompt: "Describe the first contact protocol between humans and a sentient Dyson sphere AI in 2180.",
  },
  {
    icon: "⚡",
    label: "React Hook",
    prompt: "Create a custom React hook `useDebounceEffect` with clean TypeScript and usage example.",
  },
  {
    icon: "📧",
    label: "Cold Email",
    prompt: "Draft a polite, compelling cold email to a VP of Engineering pitching developer tooling.",
  },
  {
    icon: "🧠",
    label: "ELI5 Physics",
    prompt: "Explain quantum entanglement simply to a 10-year old with engaging analogies.",
  },
];

export default function AiTextGenerator() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [model, setModel] = useState("openai/gpt-oss-120b");
  const [tone, setTone] = useState("balanced");
  const [temperature, setTemperature] = useState(0.7);
  const [history, setHistory] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [error, setError] = useState(null);
  const [metaInfo, setMetaInfo] = useState(null);

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ai_gen_history");
      if (saved) setHistory(JSON.parse(saved));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const saveToHistory = (item) => {
    const updated = [item, ...history.slice(0, 9)];
    setHistory(updated);
    try {
      localStorage.setItem("ai_gen_history", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem("ai_gen_history");
    } catch (e) {
      console.error(e);
    }
  };

  const handleGenerate = async (overridePrompt) => {
    const textToSubmit = (overridePrompt || prompt).trim();
    if (!textToSubmit || loading) return;

    setLoading(true);
    setError(null);
    setResponse("");
    setMetaInfo(null);

    try {
      const res = await axios.post("/api/generate", {
        prompt: textToSubmit,
        model,
        tone,
        temperature,
      });

      const output = res.data.result;
      setResponse(output);
      setMetaInfo({
        model: res.data.model,
        isDemo: res.data.isDemo,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      });

      saveToHistory({
        prompt: textToSubmit,
        response: output,
        tone,
        model: res.data.model,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      });

      // Confetti celebratory burst
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#a855f7", "#3b82f6", "#06b6d4"],
      });
    } catch (err) {
      console.error("Generation error:", err);
      const errMsg = err.response?.data?.error || "Failed to generate text. Check your API settings.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!response) return;
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!response) return;
    const blob = new Blob([response], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ai-generation-${Date.now()}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSurpriseMe = () => {
    const randomPreset = PRESETS[Math.floor(Math.random() * PRESETS.length)];
    setPrompt(randomPreset.prompt);
  };

  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col items-center justify-between p-4 sm:p-6 lg:p-8 selection:bg-purple-500/30 selection:text-purple-200">
      {/* 3D Three.js Live Canvas */}
      <ThreeBackground isGenerating={loading} />

      {/* Ambient background glows */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-purple-600/15 via-indigo-600/10 to-blue-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-4xl mx-auto space-y-6 pt-4 pb-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-2">
            <Badge variant="gradient">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              <span>3D Spatial AI Studio • v2.0</span>
            </Badge>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            <span className="text-gradient">OmniText</span>{" "}
            <span className="text-white">AI Engine</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Generate stories, architecture, code, and strategies powered by advanced language models with live spatial 3D feedback.
          </p>
        </motion.div>

        {/* Input Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card glow className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-purple-400" />
                <CardTitle>Prompt Studio</CardTitle>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowSettings(!showSettings)}
                  className="flex items-center gap-1.5"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>{showSettings ? "Hide Settings" : "Tune Engine"}</span>
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Expandable Settings Bar */}
              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border border-white/10 rounded-xl bg-black/40 p-4 space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Model Selector */}
                      <div>
                        <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                          AI Model
                        </label>
                        <select
                          value={model}
                          onChange={(e) => setModel(e.target.value)}
                          className="w-full text-xs glass-input rounded-lg px-3 py-2 text-slate-200 outline-none"
                        >
                          <option value="openai/gpt-oss-120b">GPT OSS 120B (Groq Flagship & Smartest)</option>
                          <option value="openai/gpt-oss-20b">GPT OSS 20B (Ultra-Fast)</option>
                          <option value="qwen/qwen3.6-27b">Qwen 3.6 27B (Groq)</option>
                          <option value="groq/compound-mini">Groq Compound Mini</option>
                        </select>
                      </div>

                      {/* Tone / Persona Selector */}
                      <div>
                        <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                          Persona / Tone
                        </label>
                        <select
                          value={tone}
                          onChange={(e) => setTone(e.target.value)}
                          className="w-full text-xs glass-input rounded-lg px-3 py-2 text-slate-200 outline-none"
                        >
                          <option value="balanced">⚖️ Balanced & Eloquent</option>
                          <option value="creative">🎨 Creative & Vivid</option>
                          <option value="professional">💼 Professional & Concise</option>
                          <option value="coder">💻 Expert Software Engineer</option>
                          <option value="concise">⚡ Ultra-Concise Bullet Points</option>
                        </select>
                      </div>

                      {/* Creativity / Temperature */}
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <label className="text-xs font-semibold text-slate-300">
                            Creativity (Temp)
                          </label>
                          <span className="text-xs text-purple-400 font-mono">{temperature}</span>
                        </div>
                        <input
                          type="range"
                          min="0.1"
                          max="1.2"
                          step="0.1"
                          value={temperature}
                          onChange={(e) => setTemperature(parseFloat(e.target.value))}
                          className="w-full accent-purple-500 cursor-pointer"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Prompt Textarea */}
              <div className="relative">
                <Textarea
                  placeholder="Describe what you want to create or ask anything..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                      handleGenerate();
                    }
                  }}
                  rows={4}
                  className="pr-12 text-base leading-relaxed"
                />
                {prompt && (
                  <button
                    onClick={() => setPrompt("")}
                    className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 p-1 transition-colors"
                    title="Clear prompt"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs text-slate-400 flex items-center gap-1 mr-1">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Presets:
                </span>
                {PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setPrompt(p.prompt);
                    }}
                    className="text-xs px-2.5 py-1 rounded-lg glass-card text-slate-300 hover:text-white hover:border-purple-500/40 transition-all flex items-center gap-1"
                  >
                    <span>{p.icon}</span>
                    <span>{p.label}</span>
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>{prompt.length} chars</span>
                  <span>•</span>
                  <span>{prompt.trim() ? prompt.trim().split(/\s+/).length : 0} words</span>
                  <button
                    onClick={handleSurpriseMe}
                    className="text-purple-400 hover:text-purple-300 hover:underline flex items-center gap-1 ml-2 transition-all"
                  >
                    <Zap className="w-3 h-3" /> Surprise Me
                  </button>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Button
                    onClick={() => handleGenerate()}
                    disabled={loading || !prompt.trim()}
                    className="w-full sm:w-auto min-w-[150px] flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-purple-200" />
                        <span>Synthesizing...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Generate</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Error Alert */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 flex items-start gap-3 backdrop-blur-md"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-400" />
              <div className="text-sm">
                <p className="font-semibold">Generation Failed</p>
                <p className="text-red-300/80 text-xs mt-0.5">{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Output Result Card */}
        <AnimatePresence>
          {response && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
            >
              <Card glow className="border-purple-500/30">
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <CardTitle className="text-base">Generated Output</CardTitle>
                    {metaInfo?.isDemo && (
                      <Badge variant="default" className="text-[10px] bg-amber-500/10 text-amber-300 border-amber-500/30">
                        Demo Mode
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 text-xs"
                      title="Copy to clipboard"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </Button>

                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleDownload}
                      className="flex items-center gap-1.5 text-xs"
                      title="Download markdown"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export</span>
                    </Button>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="bg-black/30 rounded-xl p-5 border border-white/5 font-mono text-sm leading-relaxed whitespace-pre-wrap selection:bg-purple-500/40">
                    {response}
                  </div>

                  {metaInfo && (
                    <div className="flex items-center justify-between text-xs text-slate-500 mt-3 pt-2 border-t border-white/5">
                      <span>Model: {metaInfo.model}</span>
                      <span>Generated at {metaInfo.timestamp}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recent Generations History */}
        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-4"
          >
            <Card className="bg-black/20">
              <CardHeader className="flex flex-row items-center justify-between py-3">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-slate-400" />
                  <h4 className="text-sm font-semibold text-slate-300">Session History</h4>
                  <span className="text-xs text-slate-500">({history.length})</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearHistory}
                  className="text-xs text-slate-500 hover:text-red-400"
                >
                  Clear All
                </Button>
              </CardHeader>
              <CardContent className="space-y-2 pt-0 max-h-60 overflow-y-auto">
                {history.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setPrompt(item.prompt);
                      setResponse(item.response);
                    }}
                    className="p-3 rounded-xl glass-card cursor-pointer hover:border-purple-500/40 transition-all text-xs flex justify-between items-center group"
                  >
                    <div className="truncate pr-4">
                      <span className="font-semibold text-slate-200 block truncate group-hover:text-purple-300">
                        {item.prompt}
                      </span>
                      <span className="text-slate-500 truncate block mt-0.5 max-w-md">
                        {item.response.slice(0, 90)}...
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 flex-shrink-0">
                      {item.timestamp}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center text-xs text-slate-500 py-4">
        <span>Powered by Next.js, Three.js 3D & OpenAI LLMs • Designed with Glassmorphism</span>
      </footer>
    </div>
  );
}
