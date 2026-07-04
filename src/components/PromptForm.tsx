import React, { useState } from "react";
import { CinematicState } from "../types";
import {
  CAMERAS,
  FOCAL_LENGTHS,
  LENS_TYPES,
  APERTURES,
  DEPTH_OF_FIELDS,
  ANGLES,
  MOTIONS,
  LIGHTING_TYPES,
  COLOR_GRADINGS,
  FILM_STOCKS,
  ASPECT_RATIOS
} from "../constants";
import { translateTextClientSide } from "../utils";
import {
  User,
  MapPin,
  Camera,
  Layers,
  Compass,
  Sun,
  Eye,
  Minimize2,
  Tv,
  Smartphone,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Globe
} from "lucide-react";

interface PromptFormProps {
  state: CinematicState;
  onChange: (newState: CinematicState) => void;
  onGenerate: () => void;
  lang: "es" | "en";
}

type TabType = "scene" | "camera" | "optics" | "composition" | "atmosphere";

export default function PromptForm({ state, onChange, onGenerate, lang }: PromptFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("scene");

  const updateField = (field: keyof CinematicState, value: string) => {
    onChange({ ...state, [field]: value });
  };

  const handleTranslateField = (field: "subject" | "location") => {
    const originalText = state[field];
    if (!originalText.trim()) return;
    const translated = translateTextClientSide(originalText);
    updateField(field, translated);
  };

  const tabs: { id: TabType; labelEs: string; labelEn: string; icon: any }[] = [
    { id: "scene", labelEs: "1. Escena", labelEn: "1. Scene", icon: User },
    { id: "camera", labelEs: "2. Cámara", labelEn: "2. Camera", icon: Camera },
    { id: "optics", labelEs: "3. Óptica", labelEn: "3. Focus", icon: Layers },
    { id: "composition", labelEs: "4. Ángulo", labelEn: "4. Frame", icon: Compass },
    { id: "atmosphere", labelEs: "5. Estilo", labelEn: "5. Vibe", icon: Sun }
  ];

  const handleNextTab = () => {
    const tabOrder: TabType[] = ["scene", "camera", "optics", "composition", "atmosphere"];
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1]);
    } else {
      onGenerate();
    }
  };

  const handlePrevTab = () => {
    const tabOrder: TabType[] = ["scene", "camera", "optics", "composition", "atmosphere"];
    const currentIndex = tabOrder.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabOrder[currentIndex - 1]);
    }
  };

  return (
    <div className="bg-zinc-950 rounded-xl border border-zinc-800 overflow-hidden shadow-xl" id="prompt-form-root">
      {/* Category Tabs Header */}
      <div className="flex border-b border-zinc-900 bg-zinc-900/40 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const TabIcon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[95px] py-3.5 px-3 flex flex-col sm:flex-row items-center justify-center gap-1.5 border-b-2 text-center transition-all ${
                isActive
                  ? "border-amber-500 bg-zinc-900/60 text-amber-500"
                  : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/20"
              }`}
            >
              <TabIcon className={`w-4 h-4 ${isActive ? "text-amber-500" : "text-zinc-500"}`} />
              <span className="text-[11px] font-semibold uppercase tracking-wider font-mono">
                {lang === "es" ? tab.labelEs : tab.labelEn}
              </span>
            </button>
          );
        })}
      </div>

      {/* Form Content Sandbox */}
      <div className="p-5 sm:p-6 min-h-[380px] max-h-[580px] overflow-y-auto">
        
        {/* TAB 1: SCENE (Subject, Location, Aspect Ratio) */}
        {activeTab === "scene" && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <label className="text-xs font-mono font-bold tracking-wider text-zinc-300 uppercase block mb-1.5">
                {lang === "es" ? "Sujeto / Personaje / Acción" : "Subject / Character / Action"}
              </label>
              <div className="relative">
                <textarea
                  rows={2}
                  value={state.subject}
                  onChange={(e) => updateField("subject", e.target.value)}
                  placeholder={
                    lang === "es"
                      ? "ej. Un detective solitario con gabardina fumando bajo la lluvia..."
                      : "e.g. A solitary detective in a trenchcoat smoking a cigarette in the rain..."
                  }
                  className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-amber-500 font-mono resize-none leading-relaxed"
                />
                <button
                  type="button"
                  onClick={() => handleTranslateField("subject")}
                  className="absolute right-2 bottom-3 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-[10px] font-mono font-medium px-2 py-1 rounded flex items-center gap-1 transition-all"
                  title={lang === "es" ? "Traducir texto a inglés" : "Translate keywords to English"}
                >
                  <Globe className="w-3 h-3 text-amber-400" />
                  <span>{lang === "es" ? "Traducir" : "Translate"}</span>
                </button>
              </div>
              <span className="text-[10px] font-mono text-zinc-500 mt-1 block leading-relaxed">
                {lang === "es" 
                  ? "Describe quién o qué está en el centro de tu toma. Las IAs de imagen funcionan óptimamente en inglés." 
                  : "Describe who or what is at the center of your shot. Image generators respond best to clear descriptions."}
              </span>
            </div>

            <div>
              <label className="text-xs font-mono font-bold tracking-wider text-zinc-300 uppercase block mb-1.5">
                {lang === "es" ? "Locación / Fondo / Entorno" : "Location / Background / Environment"}
              </label>
              <div className="relative">
                <textarea
                  rows={2}
                  value={state.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  placeholder={
                    lang === "es"
                      ? "ej. En un callejón oscuro de Tokio con letreros de neón brillantes..."
                      : "e.g. In a dark narrow Tokyo alleyway with glowing neon signs..."
                  }
                  className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-amber-500 font-mono resize-none leading-relaxed"
                />
                <button
                  type="button"
                  onClick={() => handleTranslateField("location")}
                  className="absolute right-2 bottom-3 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-[10px] font-mono font-medium px-2 py-1 rounded flex items-center gap-1 transition-all"
                  title={lang === "es" ? "Traducir texto a inglés" : "Translate keywords to English"}
                >
                  <Globe className="w-3 h-3 text-amber-400" />
                  <span>{lang === "es" ? "Traducir" : "Translate"}</span>
                </button>
              </div>
              <span className="text-[10px] font-mono text-zinc-500 mt-1 block leading-relaxed">
                {lang === "es" 
                  ? "Detalla el fondo, el clima o los elementos del set para ubicar geográficamente tu toma." 
                  : "Detail the backdrop, weather, or set elements to geographically ground your shot."}
              </span>
            </div>

            <div>
              <label className="text-xs font-mono font-bold tracking-wider text-zinc-300 uppercase block mb-2">
                {lang === "es" ? "Relación de Aspecto (Matte/Frame)" : "Aspect Ratio (Framing)"}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {ASPECT_RATIOS.map((ratio) => {
                  const isSelected = state.aspectRatio === ratio.id;
                  return (
                    <button
                      key={ratio.id}
                      type="button"
                      onClick={() => updateField("aspectRatio", ratio.id)}
                      className={`p-3 rounded-lg border text-center transition-all cursor-pointer flex flex-col justify-center items-center ${
                        isSelected
                          ? "bg-amber-950/20 border-amber-500 text-amber-400"
                          : "bg-zinc-900/40 border-zinc-900 hover:border-zinc-800 text-zinc-400 hover:text-zinc-300"
                      }`}
                    >
                      <span className="text-xs font-mono font-extrabold">{ratio.id}</span>
                      <span className="text-[9px] font-medium tracking-tight mt-0.5 opacity-80 block truncate w-full">
                        {ratio.label.split(" ")[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CAMERA (Camera Model, Focal Length, Lens Type) */}
        {activeTab === "camera" && (
          <div className="space-y-5 animate-fade-in">
            {/* Camera Model Grid */}
            <div>
              <label className="text-xs font-mono font-bold tracking-wider text-zinc-300 uppercase block mb-2.5">
                {lang === "es" ? "Modelo de Cámara" : "Camera Body Model"}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CAMERAS.map((cam) => {
                  const isSelected = state.camera === cam.id;
                  return (
                    <button
                      key={cam.id}
                      type="button"
                      onClick={() => updateField("camera", cam.id)}
                      className={`p-3 rounded-lg border text-left transition-all flex items-start gap-2.5 cursor-pointer ${
                        isSelected
                          ? "bg-amber-950/20 border-amber-500 text-amber-400"
                          : "bg-zinc-900/40 border-zinc-900 hover:border-zinc-800 text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded bg-zinc-950 flex items-center justify-center border ${isSelected ? "border-amber-500" : "border-zinc-800"}`}>
                        <Camera className="w-4 h-4 text-zinc-300" />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <span className="text-xs font-semibold block">{lang === "es" ? cam.labelEs : cam.labelEn}</span>
                        <p className="text-[10px] text-zinc-500 mt-1 leading-normal line-clamp-1">
                          {lang === "es" ? cam.descriptionEs : cam.descriptionEn}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Focal Length and Lens Type split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1.5">
              <div>
                <label className="text-xs font-mono font-bold tracking-wider text-zinc-300 uppercase block mb-2">
                  {lang === "es" ? "Distancia Focal" : "Focal Length"}
                </label>
                <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                  {FOCAL_LENGTHS.map((foc) => {
                    const isSelected = state.focalLength === foc.id;
                    return (
                      <button
                        key={foc.id}
                        type="button"
                        onClick={() => updateField("focalLength", foc.id)}
                        className={`w-full p-2.5 rounded-lg border text-left transition-all cursor-pointer flex justify-between items-center ${
                          isSelected
                            ? "bg-amber-950/20 border-amber-500 text-amber-400 font-semibold"
                            : "bg-zinc-900/40 border-zinc-900 hover:border-zinc-800 text-zinc-400 hover:text-zinc-300"
                        }`}
                      >
                        <span className="text-xs font-mono">{lang === "es" ? foc.labelEs : foc.labelEn}</span>
                        <span className="text-[9px] font-mono text-zinc-500 hidden xl:inline max-w-[120px] truncate text-right">
                          {lang === "es" ? foc.descriptionEs : foc.descriptionEn}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono font-bold tracking-wider text-zinc-300 uppercase block mb-2">
                  {lang === "es" ? "Tipo de Lente" : "Lens Type"}
                </label>
                <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                  {LENS_TYPES.map((lens) => {
                    const isSelected = state.lensType === lens.id;
                    return (
                      <button
                        key={lens.id}
                        type="button"
                        onClick={() => updateField("lensType", lens.id)}
                        className={`w-full p-2.5 rounded-lg border text-left transition-all cursor-pointer flex justify-between items-center ${
                          isSelected
                            ? "bg-amber-950/20 border-amber-500 text-amber-400 font-semibold"
                            : "bg-zinc-900/40 border-zinc-900 hover:border-zinc-800 text-zinc-400 hover:text-zinc-300"
                        }`}
                      >
                        <span className="text-xs font-mono">{lang === "es" ? lens.labelEs : lens.labelEn}</span>
                        <span className="text-[9px] font-mono text-zinc-500 hidden xl:inline max-w-[120px] truncate text-right">
                          {lang === "es" ? lens.descriptionEs : lens.descriptionEn}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: OPTICS (Aperture, Depth Of Field) */}
        {activeTab === "optics" && (
          <div className="space-y-5 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-mono font-bold tracking-wider text-zinc-300 uppercase block mb-2.5">
                  {lang === "es" ? "Apertura de Diafragma (F-Stop)" : "Lens Aperture (F-Stop)"}
                </label>
                <div className="space-y-2">
                  {APERTURES.map((ap) => {
                    const isSelected = state.aperture === ap.id;
                    return (
                      <button
                        key={ap.id}
                        type="button"
                        onClick={() => updateField("aperture", ap.id)}
                        className={`w-full p-3.5 rounded-lg border text-left transition-all cursor-pointer flex gap-3 ${
                          isSelected
                            ? "bg-amber-950/20 border-amber-500 text-amber-400"
                            : "bg-zinc-900/40 border-zinc-900 hover:border-zinc-800 text-zinc-400"
                        }`}
                      >
                        <span className="text-xs font-extrabold font-mono text-zinc-200 border-r border-zinc-800 pr-3 min-w-[50px]">
                          {ap.id}
                        </span>
                        <div className="flex-1">
                          <span className="text-xs font-semibold block">{lang === "es" ? ap.labelEs : ap.labelEn}</span>
                          <span className="text-[10px] text-zinc-500 mt-1 block">
                            {lang === "es" ? ap.descriptionEs : ap.descriptionEn}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono font-bold tracking-wider text-zinc-300 uppercase block mb-2.5">
                  {lang === "es" ? "Profundidad de Campo" : "Depth of Field (DoF)"}
                </label>
                <div className="space-y-2">
                  {DEPTH_OF_FIELDS.map((dof) => {
                    const isSelected = state.depthOfField === dof.id;
                    return (
                      <button
                        key={dof.id}
                        type="button"
                        onClick={() => updateField("depthOfField", dof.id)}
                        className={`w-full p-3.5 rounded-lg border text-left transition-all cursor-pointer flex gap-3 ${
                          isSelected
                            ? "bg-amber-950/20 border-amber-500 text-amber-400"
                            : "bg-zinc-900/40 border-zinc-900 hover:border-zinc-800 text-zinc-400"
                        }`}
                      >
                        <span className="text-xs font-semibold block">{lang === "es" ? dof.labelEs : dof.labelEn}</span>
                        <span className="text-[10px] text-zinc-500 mt-1 block">
                          {lang === "es" ? dof.descriptionEs : dof.descriptionEn}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="bg-zinc-900/30 border border-zinc-900 rounded-lg p-3.5 mt-4 text-[10px] font-mono text-zinc-500 leading-relaxed">
                  <span className="text-zinc-400 font-bold block mb-1">💡 REGRESO AL SET DE RODAJE:</span>
                  {lang === "es"
                    ? "Una apertura mayor (f/1.4 o f/2.8) aislará al sujeto y generará un desenfoque de fondo pronunciado (shallow), mientras que aperturas cerradas (f/11) mantendrán todo nítido (deep)."
                    : "A larger aperture (f/1.4 or f/2.8) isolates your subject with buttery background blur (shallow), while small apertures (f/11) preserve absolute context detail (deep)."}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: COMPOSITION (Camera Angle, Camera Movement) */}
        {activeTab === "composition" && (
          <div className="space-y-5 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Angles Select */}
              <div>
                <label className="text-xs font-mono font-bold tracking-wider text-zinc-300 uppercase block mb-2">
                  {lang === "es" ? "Ángulo de la Cámara" : "Camera Perspective Angle"}
                </label>
                <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
                  {ANGLES.map((ang) => {
                    const isSelected = state.angle === ang.id;
                    return (
                      <button
                        key={ang.id}
                        type="button"
                        onClick={() => updateField("angle", ang.id)}
                        className={`w-full p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-amber-950/20 border-amber-500 text-amber-400"
                            : "bg-zinc-900/40 border-zinc-900 hover:border-zinc-800 text-zinc-400 hover:text-zinc-300"
                        }`}
                      >
                        <span className="text-xs font-semibold block">{lang === "es" ? ang.labelEs : ang.labelEn}</span>
                        <span className="text-[9px] text-zinc-500 block mt-0.5 leading-normal">
                          {lang === "es" ? ang.descriptionEs : ang.descriptionEn}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Motions Select */}
              <div>
                <label className="text-xs font-mono font-bold tracking-wider text-zinc-300 uppercase block mb-2">
                  {lang === "es" ? "Movimiento de la Cámara" : "Camera Motion"}
                </label>
                <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
                  {MOTIONS.map((mot) => {
                    const isSelected = state.motion === mot.id;
                    return (
                      <button
                        key={mot.id}
                        type="button"
                        onClick={() => updateField("motion", mot.id)}
                        className={`w-full p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-amber-950/20 border-amber-500 text-amber-400"
                            : "bg-zinc-900/40 border-zinc-900 hover:border-zinc-800 text-zinc-400 hover:text-zinc-300"
                        }`}
                      >
                        <span className="text-xs font-semibold block">{lang === "es" ? mot.labelEs : mot.labelEn}</span>
                        <span className="text-[9px] text-zinc-500 block mt-0.5 leading-normal">
                          {lang === "es" ? mot.descriptionEs : mot.descriptionEn}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: ATMOSPHERE (Lighting, Grading, Film Stock) */}
        {activeTab === "atmosphere" && (
          <div className="space-y-4 animate-fade-in">
            {/* Split row for lighting types & directions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono font-bold tracking-wider text-zinc-300 uppercase block mb-2">
                  {lang === "es" ? "Tipo de Iluminación" : "Lighting Type"}
                </label>
                <div className="space-y-1.5 max-h-[200px] overflow-y-auto pr-1">
                  {LIGHTING_TYPES.filter(l => !l.id.startsWith("sidelight")).map((lgt) => {
                    const isSelected = state.lightingType === lgt.id;
                    return (
                      <button
                        key={lgt.id}
                        type="button"
                        onClick={() => updateField("lightingType", lgt.id)}
                        className={`w-full p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-amber-950/20 border-amber-500 text-amber-400 font-semibold"
                            : "bg-zinc-900/40 border-zinc-900 hover:border-zinc-800 text-zinc-400"
                        }`}
                      >
                        <span className="text-xs block">{lang === "es" ? lgt.labelEs : lgt.labelEn}</span>
                        <span className="text-[9px] text-zinc-500 block mt-0.5 truncate max-w-full">
                          {lang === "es" ? lgt.descriptionEs : lgt.descriptionEn}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono font-bold tracking-wider text-zinc-300 uppercase block mb-2">
                  {lang === "es" ? "Dirección de la Iluminación" : "Lighting Angle/Direction"}
                </label>
                <div className="space-y-1.5 max-h-[200px] overflow-y-auto pr-1">
                  {LIGHTING_TYPES.filter(l => l.id.startsWith("sidelight") || l.id === "window_light" || l.id === "rim_light").map((lgt) => {
                    const isSelected = state.lightingDirection === lgt.id;
                    return (
                      <button
                        key={lgt.id + "_dir"}
                        type="button"
                        onClick={() => updateField("lightingDirection", lgt.id)}
                        className={`w-full p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-amber-950/20 border-amber-500 text-amber-400 font-semibold"
                            : "bg-zinc-900/40 border-zinc-900 hover:border-zinc-800 text-zinc-400"
                        }`}
                      >
                        <span className="text-xs block">{lang === "es" ? lgt.labelEs : lgt.labelEn}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Split row for color grading & film texture */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="text-xs font-mono font-bold tracking-wider text-zinc-300 uppercase block mb-2">
                  {lang === "es" ? "Color Grading" : "Color Grading LUT"}
                </label>
                <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
                  {COLOR_GRADINGS.map((cg) => {
                    const isSelected = state.colorGrading === cg.id;
                    return (
                      <button
                        key={cg.id}
                        type="button"
                        onClick={() => updateField("colorGrading", cg.id)}
                        className={`w-full p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-amber-950/20 border-amber-500 text-amber-400 font-semibold"
                            : "bg-zinc-900/40 border-zinc-900 hover:border-zinc-800 text-zinc-400"
                        }`}
                      >
                        <span className="text-xs block">{lang === "es" ? cg.labelEs : cg.labelEn}</span>
                        <span className="text-[9px] text-zinc-500 block mt-0.5 truncate max-w-full">
                          {lang === "es" ? cg.descriptionEs : cg.descriptionEn}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono font-bold tracking-wider text-zinc-300 uppercase block mb-2">
                  {lang === "es" ? "Película y Textura (Grano)" : "Film Stock & Texture"}
                </label>
                <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
                  {FILM_STOCKS.map((fs) => {
                    const isSelected = state.filmStock === fs.id;
                    return (
                      <button
                        key={fs.id}
                        type="button"
                        onClick={() => updateField("filmStock", fs.id)}
                        className={`w-full p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-amber-950/20 border-amber-500 text-amber-400 font-semibold"
                            : "bg-zinc-900/40 border-zinc-900 hover:border-zinc-800 text-zinc-400"
                        }`}
                      >
                        <span className="text-xs block">{lang === "es" ? fs.labelEs : fs.labelEn}</span>
                        <span className="text-[9px] text-zinc-500 block mt-0.5 truncate max-w-full">
                          {lang === "es" ? fs.descriptionEs : fs.descriptionEn}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Control Navigation Footer Bar */}
      <div className="flex justify-between items-center bg-zinc-900 border-t border-zinc-900 p-4">
        <div>
          {activeTab !== "scene" ? (
            <button
              onClick={handlePrevTab}
              className="text-xs bg-zinc-950 hover:bg-zinc-800 border border-zinc-850 hover:border-zinc-700 text-zinc-300 font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{lang === "es" ? "Anterior" : "Back"}</span>
            </button>
          ) : (
            <div />
          )}
        </div>

        <button
          onClick={handleNextTab}
          className="text-xs bg-amber-500 hover:bg-amber-600 text-zinc-950 font-extrabold px-5 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-md cursor-pointer"
        >
          <span>
            {activeTab === "atmosphere"
              ? lang === "es"
                ? "Compilar Prompt"
                : "Compile Prompt"
              : lang === "es"
              ? "Siguiente Paso"
              : "Next Step"}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
