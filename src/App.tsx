import React, { useState, useEffect } from "react";
import { CinematicState, SavedPrompt } from "./types";
import { DEFAULT_STATE, CAMERAS, COLOR_GRADINGS, FOCAL_LENGTHS, LENS_TYPES, APERTURES, DEPTH_OF_FIELDS, ANGLES, MOTIONS, LIGHTING_TYPES, FILM_STOCKS, ASPECT_RATIOS } from "./constants";
import { compilePrompt } from "./utils";
import CineMonitor from "./components/CineMonitor";
import PromptForm from "./components/PromptForm";
import PresetsPanel from "./components/PresetsPanel";
import PromptHistory from "./components/PromptHistory";
import {
  Film,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Shuffle,
  Globe,
  Plus,
  BookOpen
} from "lucide-react";

export default function App() {
  const [state, setState] = useState<CinematicState>(DEFAULT_STATE);
  const [lang, setLang] = useState<"es" | "en">("es");
  const [compiledEs, setCompiledEs] = useState("");
  const [compiledEn, setCompiledEn] = useState("");
  const [history, setHistory] = useState<SavedPrompt[]>([]);
  const [copiedText, setCopiedText] = useState<"es" | "en" | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Compile prompt whenever the state updates
  useEffect(() => {
    setCompiledEs(compilePrompt(state, "es"));
    setCompiledEn(compilePrompt(state, "en"));
  }, [state]);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cine_prompt_history");
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load prompt history", e);
    }
  }, []);

  // Show temp toast feedback helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Compile and save current prompt manually/automatically to history
  const handleGenerateAndSave = () => {
    const promptEs = compilePrompt(state, "es");
    const promptEn = compilePrompt(state, "en");

    const newHistoryItem: SavedPrompt = {
      id: "prompt_" + Date.now(),
      timestamp: Date.now(),
      title: `${state.camera.replace(/_/g, " ").toUpperCase()} • ${state.subject.substring(0, 24)}...`,
      promptEs,
      promptEn,
      state: { ...state }
    };

    const updated = [newHistoryItem, ...history];
    setHistory(updated);
    localStorage.setItem("cine_prompt_history", JSON.stringify(updated));
    showToast(lang === "es" ? "¡Prompt compilado y guardado en el historial!" : "Prompt compiled and saved to history!");

    // Smooth scroll to the compiled prompt area
    const outputEl = document.getElementById("compiled-output-area");
    if (outputEl) {
      outputEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Copy prompt to clipboard
  const handleCopyToClipboard = (text: string, type: "es" | "en") => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    showToast(
      lang === "es"
        ? `¡Prompt en ${type === "es" ? "Español" : "Inglés"} copiado al portapapeles!`
        : `Copied ${type === "es" ? "Spanish" : "English"} prompt to clipboard!`
    );
    setTimeout(() => {
      setCopiedText(null);
    }, 2000);
  };

  // Load a prompt from history
  const handleLoadPrompt = (saved: SavedPrompt) => {
    setState(saved.state);
    showToast(lang === "es" ? "¡Configuración de toma cargada!" : "Camera configuration loaded!");
  };

  // Delete individual history item
  const handleDeletePrompt = (id: string) => {
    const updated = history.filter((item) => item.id !== id);
    setHistory(updated);
    localStorage.setItem("cine_prompt_history", JSON.stringify(updated));
  };

  // Clear entire history
  const handleClearHistory = () => {
    if (window.confirm(lang === "es" ? "¿Seguro que deseas vaciar el historial?" : "Are you sure you want to clear your history?")) {
      setHistory([]);
      localStorage.removeItem("cine_prompt_history");
    }
  };

  // Reset to default settings
  const handleResetSettings = () => {
    setState(DEFAULT_STATE);
    showToast(lang === "es" ? "Ajustes restablecidos al estándar." : "Settings reset to standard.");
  };

  // Randomize all options (Director's Roulette) for inspiration!
  const handleShuffleSettings = () => {
    const getRandomItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)].id;

    // Standard subjects & locations list to shuffle if blank
    const subjects = [
      "A weary cyberpunk bounty hunter gazing into neon lights",
      "An enigmatic sorcerer holding an ancient leatherbound book",
      "A fierce astronaut looking through a visor reflected with solar flares",
      "A jazz saxophonist playing with deep concentration under a dim spotlight",
      "A rustic baker covered in flour kneading bread dough enthusiastically",
      "A wild stallion running majestically through shallow mist",
      "A high-tech android repairing its own glowing arm wires",
      "An archeologist dusting off a golden skull inside a dark tomb"
    ];

    const locations = [
      "a rain-slicked Tokyo alleyway saturated with violet neon glow",
      "a sun-drenched rustic Italian kitchen during golden hour",
      "a cold desolate lunar base surrounded by twinkling stars",
      "a smoky 1940s jazz club with thick ambient atmosphere",
      "an overgrown greenhouse with light shafts filtering through cracked glass",
      "a futuristic high-speed train carriage overlooking a neon cityscape",
      "a wind-swept desert canyon under a giant crimson sun"
    ];

    const randomState: CinematicState = {
      camera: getRandomItem(CAMERAS),
      focalLength: getRandomItem(FOCAL_LENGTHS),
      lensType: getRandomItem(LENS_TYPES),
      aperture: getRandomItem(APERTURES),
      depthOfField: getRandomItem(DEPTH_OF_FIELDS),
      angle: getRandomItem(ANGLES),
      motion: getRandomItem(MOTIONS),
      lightingType: getRandomItem(LIGHTING_TYPES.filter(l => !l.id.startsWith("sidelight"))),
      lightingDirection: getRandomItem(LIGHTING_TYPES.filter(l => l.id.startsWith("sidelight") || l === LIGHTING_TYPES[0])),
      colorGrading: getRandomItem(COLOR_GRADINGS),
      filmStock: getRandomItem(FILM_STOCKS),
      subject: subjects[Math.floor(Math.random() * subjects.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      aspectRatio: ASPECT_RATIOS[Math.floor(Math.random() * ASPECT_RATIOS.length)].id
    };

    setState(randomState);
    showToast(lang === "es" ? "🎲 ¡Toma aleatoria generada!" : "🎲 Random shot randomized!");
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col font-sans selection:bg-amber-500 selection:text-zinc-950">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs font-mono font-semibold px-4 py-3 rounded-lg shadow-2xl flex items-center gap-2 animate-fade-in">
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Panel */}
      <header className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/10">
              <Film className="w-5.5 h-5.5 text-zinc-950 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-wider font-display text-white uppercase flex items-center gap-1.5">
                CinePrompt <span className="text-amber-500 text-xs font-mono px-1.5 py-0.5 border border-amber-500/30 bg-amber-500/5 rounded">STUDIO</span>
              </h1>
              <p className="text-[11px] font-mono text-zinc-500 tracking-wide mt-0.5">
                {lang === "es"
                  ? "DISEÑO DE PROMPTS CINEMATOGRÁFICOS DE ALTO NIVEL"
                  : "PREMIUM CINEMATOGRAPHY PROMPT DESK"}
              </p>
            </div>
          </div>

          {/* Quick Header Controls */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex bg-zinc-900 p-1 rounded-lg border border-zinc-850">
              <button
                onClick={() => setLang("es")}
                className={`text-[10px] font-bold font-mono px-3 py-1.5 rounded-md transition-all ${
                  lang === "es" ? "bg-zinc-800 text-amber-400" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                ESP
              </button>
              <button
                onClick={() => setLang("en")}
                className={`text-[10px] font-bold font-mono px-3 py-1.5 rounded-md transition-all ${
                  lang === "en" ? "bg-zinc-800 text-amber-400" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                ENG
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleShuffleSettings}
                className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-850 hover:border-zinc-750 rounded-lg text-zinc-400 hover:text-amber-400 transition-colors"
                title={lang === "es" ? "Ruleta de Director (Aleatorio)" : "Director's Roulette (Randomize)"}
              >
                <Shuffle className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetSettings}
                className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-850 hover:border-zinc-750 rounded-lg text-zinc-400 hover:text-zinc-200 transition-colors"
                title={lang === "es" ? "Restablecer valores" : "Reset settings"}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Studio Desk Workspace */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 lg:py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* Left Hand: Parameter Selector Form Desk */}
        <section className="lg:col-span-7 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-500" />
              <h2 className="text-sm font-semibold tracking-wider text-zinc-300 uppercase font-mono">
                {lang === "es" ? "Configuración de Toma" : "Shot Orchestration"}
              </h2>
            </div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase">
              {lang === "es" ? "Paso a paso" : "Step by step"}
            </span>
          </div>
          
          <PromptForm
            state={state}
            onChange={setState}
            onGenerate={handleGenerateAndSave}
            lang={lang}
          />
        </section>

        {/* Right Hand: Cine Monitor + Compiled Output + Presets */}
        <section className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Live camera viewfinder overlay */}
          <CineMonitor state={state} compiledPrompt={compiledEn} />

          {/* Compiled Output Board */}
          <div className="bg-zinc-950 rounded-xl border border-zinc-800 p-5 shadow-lg flex flex-col justify-between" id="compiled-output-area">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-[11px] font-mono font-bold text-amber-400 tracking-wider uppercase">
                  {lang === "es" ? "PROMPT COMPILADO" : "COMPILED PROMPT"}
                </span>
                <span className="text-[9px] font-mono text-zinc-500 uppercase">
                  {lang === "es" ? "Listo para Generador" : "Ready for Generator"}
                </span>
              </div>

              {/* Main English Output (Recommended for Midjourney/Flux) */}
              <div className="space-y-4">
                <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 relative group">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-sky-400" /> English (Midjourney / Flux / SD)
                    </span>
                    <button
                      onClick={() => handleCopyToClipboard(compiledEn, "en")}
                      className="text-[11px] font-mono text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 transition-colors"
                    >
                      {copiedText === "en" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                          <span className="text-emerald-400">¡Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{lang === "es" ? "Copiar" : "Copy"}</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-zinc-200 font-mono leading-relaxed select-all">
                    {compiledEn}
                  </p>
                </div>

                {/* Spanish Equivalent / Translation */}
                <div className="bg-zinc-900/60 rounded-xl p-4 border border-zinc-800/60 relative group">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-zinc-600" /> Español (Referencia)
                    </span>
                    <button
                      onClick={() => handleCopyToClipboard(compiledEs, "es")}
                      className="text-[11px] font-mono text-zinc-400 hover:text-zinc-200 flex items-center gap-1 transition-colors"
                    >
                      {copiedText === "es" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">¡Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{lang === "es" ? "Copiar" : "Copy"}</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {compiledEs}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-900/80 flex gap-2">
              <button
                onClick={handleGenerateAndSave}
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-extrabold py-2.5 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors shadow-lg cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{lang === "es" ? "Guardar en Historial" : "Save to History"}</span>
              </button>
            </div>
          </div>

          {/* Quick loading cinematic Presets Panel */}
          <PresetsPanel
            currentState={state}
            onSelectPreset={setState}
            lang={lang}
          />

          {/* Prompt compilation history list */}
          <PromptHistory
            history={history}
            onLoadPrompt={handleLoadPrompt}
            onDeletePrompt={handleDeletePrompt}
            onClearHistory={handleClearHistory}
            lang={lang}
          />

        </section>
      </main>

      {/* Production Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950/40 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center font-mono text-[10px] text-zinc-600">
          <p>
            {lang === "es"
              ? "CinePrompt Studio — Creado para directores de cine, directores de fotografía y artistas digitales de IA."
              : "CinePrompt Studio — Tailored for filmmakers, cinematographers, and digital AI artists."}
          </p>
          <p className="mt-1 opacity-60">
            © {new Date().getFullYear()} CinePrompt. No cookies stored outside localStorage.
          </p>
        </div>
      </footer>
    </div>
  );
}
