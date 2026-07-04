import React, { useState, useEffect } from "react";
import { Preset, CinematicState } from "../types";
import { PRESETS } from "../constants";
import {
  Bookmark,
  Trash2,
  Plus,
  Sparkles,
  Crown,
  Users,
  Zap,
  Eye,
  Camera
} from "lucide-react";

interface PresetsPanelProps {
  currentState: CinematicState;
  onSelectPreset: (state: CinematicState) => void;
  lang: "es" | "en";
}

export default function PresetsPanel({
  currentState,
  onSelectPreset,
  lang
}: PresetsPanelProps) {
  const [userPresets, setUserPresets] = useState<Preset[]>([]);
  const [newPresetName, setNewPresetName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Load custom presets from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cine_user_presets");
      if (stored) {
        setUserPresets(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load user presets from localStorage", e);
    }
  }, []);

  // Save new custom preset
  const handleSavePreset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPresetName.trim()) return;

    const newPreset: Preset = {
      id: "user_" + Date.now(),
      nameEs: newPresetName.trim(),
      nameEn: newPresetName.trim(),
      descriptionEs: "Preset personalizado guardado por el director.",
      descriptionEn: "Custom preset saved by the director.",
      state: { ...currentState }
    };

    const updated = [newPreset, ...userPresets];
    setUserPresets(updated);
    localStorage.setItem("cine_user_presets", JSON.stringify(updated));
    setNewPresetName("");
    setIsSaving(false);
  };

  // Delete custom preset
  const handleDeletePreset = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering load selection
    const updated = userPresets.filter((p) => p.id !== id);
    setUserPresets(updated);
    localStorage.setItem("cine_user_presets", JSON.stringify(updated));
  };

  // Helper to map icon names to actual Lucide component
  const renderPresetIcon = (iconName?: string) => {
    switch (iconName) {
      case "Crown":
        return <Crown className="w-4 h-4 text-amber-400" />;
      case "Users":
        return <Users className="w-4 h-4 text-sky-400" />;
      case "Zap":
        return <Zap className="w-4 h-4 text-purple-400" />;
      case "Eye":
        return <Eye className="w-4 h-4 text-emerald-400" />;
      default:
        return <Bookmark className="w-4 h-4 text-zinc-400" />;
    }
  };

  return (
    <div className="bg-zinc-950 rounded-xl border border-zinc-800 p-5 shadow-lg" id="presets-panel-root">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="text-sm font-semibold tracking-wider text-zinc-200 uppercase">
            {lang === "es" ? "PRESETS Y ESTILOS" : "PRESETS & STYLES"}
          </h3>
        </div>
        {!isSaving && (
          <button
            onClick={() => setIsSaving(true)}
            className="text-xs bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{lang === "es" ? "Guardar actual" : "Save current"}</span>
          </button>
        )}
      </div>

      {/* Save current preset dialog */}
      {isSaving && (
        <form onSubmit={handleSavePreset} className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg mb-4 animate-fade-in">
          <p className="text-[11px] font-mono text-zinc-400 mb-2 uppercase">
            {lang === "es" ? "Guardar configuración actual como preset:" : "Save current configuration as preset:"}
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              required
              placeholder={lang === "es" ? "Nombre del preset..." : "Preset name..."}
              value={newPresetName}
              onChange={(e) => setNewPresetName(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 flex-1 font-mono"
            />
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold px-3 py-1.5 rounded text-xs transition-colors"
            >
              {lang === "es" ? "Guardar" : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setIsSaving(false)}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-400 px-2.5 py-1.5 rounded text-xs transition-colors"
            >
              {lang === "es" ? "Cancelar" : "Cancel"}
            </button>
          </div>
        </form>
      )}

      {/* Built-in Film Style Cards */}
      <div className="mb-4">
        <span className="text-[10px] font-mono font-medium text-zinc-500 tracking-wider uppercase mb-2 block">
          {lang === "es" ? "Estilos de Director de Fotografía" : "Cinematographer Presets"}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset.state)}
              className="bg-zinc-900 hover:bg-zinc-800/80 border border-zinc-800 hover:border-zinc-700/80 text-left p-3.5 rounded-lg transition-all duration-300 relative group overflow-hidden flex flex-col justify-between"
            >
              {/* Corner ambient shine */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-white/2 opacity-0 group-hover:opacity-100 rounded-bl-full transition-opacity pointer-events-none" />

              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-zinc-950 rounded-md border border-zinc-800 flex items-center justify-center">
                    {renderPresetIcon(preset.icon)}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-200">
                      {lang === "es" ? preset.nameEs : preset.nameEn}
                    </h4>
                    <span className="text-[9px] font-mono text-zinc-400 uppercase mt-0.5 block">
                      {preset.state.aspectRatio} • {preset.state.focalLength}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-zinc-400 mt-2 leading-relaxed line-clamp-2">
                {lang === "es" ? preset.descriptionEs : preset.descriptionEn}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Custom User Presets Section */}
      {userPresets.length > 0 && (
        <div>
          <span className="text-[10px] font-mono font-medium text-zinc-500 tracking-wider uppercase mb-2 block">
            {lang === "es" ? "Tus Presets Guardados" : "Your Saved Presets"}
          </span>
          <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
            {userPresets.map((preset) => (
              <div
                key={preset.id}
                onClick={() => onSelectPreset(preset.state)}
                className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 p-2.5 rounded-lg flex items-center justify-between cursor-pointer group transition-colors"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <Bookmark className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="text-xs font-semibold text-zinc-300 truncate font-mono">
                    {preset.nameEs}
                  </span>
                  <span className="text-[9px] font-mono text-zinc-500 hidden sm:inline uppercase">
                    ({preset.state.camera.replace(/_/g, " ").substring(0, 10)}...)
                  </span>
                </div>
                <button
                  onClick={(e) => handleDeletePreset(preset.id, e)}
                  className="text-zinc-500 hover:text-red-400 p-1 rounded transition-colors"
                  title={lang === "es" ? "Eliminar preset" : "Delete preset"}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
