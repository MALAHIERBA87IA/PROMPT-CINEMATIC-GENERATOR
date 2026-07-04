import React, { useState } from "react";
import { SavedPrompt } from "../types";
import {
  Clock,
  Copy,
  Check,
  Trash2,
  FolderOpen,
  ArrowUpRight,
  Globe
} from "lucide-react";

interface PromptHistoryProps {
  history: SavedPrompt[];
  onLoadPrompt: (saved: SavedPrompt) => void;
  onDeletePrompt: (id: string) => void;
  onClearHistory: () => void;
  lang: "es" | "en";
}

export default function PromptHistory({
  history,
  onLoadPrompt,
  onDeletePrompt,
  onClearHistory,
  lang
}: PromptHistoryProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedLang, setCopiedLang] = useState<"es" | "en" | null>(null);

  const handleCopy = (text: string, id: string, copyLang: "es" | "en") => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setCopiedLang(copyLang);
    setTimeout(() => {
      setCopiedId(null);
      setCopiedLang(null);
    }, 2000);
  };

  const formatTime = (timestamp: number) => {
    const d = new Date(timestamp);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + " - " + d.toLocaleDateString();
  };

  return (
    <div className="bg-zinc-950 rounded-xl border border-zinc-800 p-5 shadow-lg" id="prompt-history-root">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-zinc-400" />
          <h3 className="text-sm font-semibold tracking-wider text-zinc-200 uppercase">
            {lang === "es" ? "HISTORIAL DE PROMPTS" : "PROMPT HISTORY"}
          </h3>
        </div>
        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="text-[10px] font-mono font-semibold text-red-400 hover:text-red-300 transition-colors uppercase"
          >
            {lang === "es" ? "Limpiar todo" : "Clear all"}
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="border border-dashed border-zinc-800/80 rounded-xl p-6 text-center">
          <Clock className="w-8 h-8 text-zinc-600 mx-auto mb-2.5" />
          <p className="text-xs text-zinc-400 font-medium">
            {lang === "es" ? "Aún no has generado ningún prompt." : "You haven't generated any prompts yet."}
          </p>
          <p className="text-[10px] text-zinc-500 font-mono mt-1">
            {lang === "es" ? "Completa el formulario y presiona 'Generar Prompt'" : "Complete the form and click 'Generate Prompt'"}
          </p>
        </div>
      ) : (
        <div className="space-y-3.5 max-h-[420px] overflow-y-auto pr-1">
          {history.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700/80 p-4 rounded-xl transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div className="flex justify-between items-start gap-2 mb-2">
                <div>
                  <h4 className="text-xs font-semibold text-zinc-200 font-mono line-clamp-1">
                    {item.title}
                  </h4>
                  <span className="text-[9px] font-mono text-zinc-500 block mt-0.5">
                    {formatTime(item.timestamp)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onLoadPrompt(item)}
                    className="p-1.5 bg-zinc-950/60 hover:bg-zinc-800 border border-zinc-800 rounded-md text-zinc-400 hover:text-zinc-200 transition-colors flex items-center gap-1 text-[9px] font-mono uppercase"
                    title={lang === "es" ? "Cargar en el editor" : "Load in editor"}
                  >
                    <FolderOpen className="w-3 h-3 text-cyan-400" />
                    <span className="hidden sm:inline">Cargar</span>
                  </button>
                  <button
                    onClick={() => onDeletePrompt(item.id)}
                    className="p-1.5 bg-zinc-950/60 hover:bg-red-950/40 hover:border-red-900/40 border border-zinc-800 rounded-md text-zinc-400 hover:text-red-400 transition-colors"
                    title={lang === "es" ? "Eliminar" : "Delete"}
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Collapsible/Scrolling Box of the prompt preview */}
              <div className="space-y-2 mt-1">
                {/* EN Prompt (Industry Standard) */}
                <div className="bg-zinc-950 rounded-lg p-2.5 border border-zinc-800 relative group/prompt">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[8px] font-mono font-semibold text-zinc-500 uppercase flex items-center gap-1">
                      <Globe className="w-2.5 h-2.5" /> English (Recomendado para Generadores)
                    </span>
                    <button
                      onClick={() => handleCopy(item.promptEn, item.id, "en")}
                      className="text-[9px] font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
                    >
                      {copiedId === item.id && copiedLang === "en" ? (
                        <>
                          <Check className="w-2.5 h-2.5 text-emerald-400" />
                          <span className="text-emerald-400">¡Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-2.5 h-2.5" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-[10px] text-zinc-300 font-mono leading-relaxed line-clamp-3 select-all">
                    {item.promptEn}
                  </p>
                </div>

                {/* ES Prompt */}
                <div className="bg-zinc-950 rounded-lg p-2.5 border border-zinc-800/60 relative group/prompt">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[8px] font-mono font-semibold text-zinc-500 uppercase flex items-center gap-1">
                      <Globe className="w-2.5 h-2.5" /> Español (Traducción de referencia)
                    </span>
                    <button
                      onClick={() => handleCopy(item.promptEs, item.id, "es")}
                      className="text-[9px] font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
                    >
                      {copiedId === item.id && copiedLang === "es" ? (
                        <>
                          <Check className="w-2.5 h-2.5 text-emerald-400" />
                          <span className="text-emerald-400">¡Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-2.5 h-2.5" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-[10px] text-zinc-400 leading-relaxed line-clamp-2">
                    {item.promptEs}
                  </p>
                </div>
              </div>

              {/* Quick tags summary of selected options */}
              <div className="flex flex-wrap gap-1 mt-2.5 border-t border-zinc-800/60 pt-2 text-[8px] font-mono text-zinc-500 uppercase">
                <span className="bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800">
                  {item.state.camera.replace(/_/g, " ")}
                </span>
                <span className="bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800">
                  {item.state.focalLength}
                </span>
                <span className="bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800">
                  {item.state.lensType}
                </span>
                <span className="bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800">
                  {item.state.colorGrading.replace(/_/g, " ")}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
