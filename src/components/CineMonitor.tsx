import React, { useState, useEffect } from "react";
import { CinematicState } from "../types";
import {
  Camera,
  Layers,
  Sparkles,
  Zap,
  Volume2,
  RefreshCw,
  Sliders
} from "lucide-react";

interface CineMonitorProps {
  state: CinematicState;
  compiledPrompt: string;
}

export default function CineMonitor({ state, compiledPrompt }: CineMonitorProps) {
  const [recFlashing, setRecFlashing] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(98);
  const [audioLevel1, setAudioLevel1] = useState(45);
  const [audioLevel2, setAudioLevel2] = useState(42);

  // Simulation loops for camera HUD realism
  useEffect(() => {
    const flashInterval = setInterval(() => {
      setRecFlashing((prev) => !prev);
    }, 1000);

    const audioInterval = setInterval(() => {
      setAudioLevel1(Math.floor(Math.random() * 35) + 35);
      setAudioLevel2(Math.floor(Math.random() * 40) + 30);
    }, 150);

    const batteryInterval = setInterval(() => {
      setBatteryLevel((prev) => (prev > 15 ? prev - 1 : 99));
    }, 60000);

    return () => {
      clearInterval(flashInterval);
      clearInterval(audioInterval);
      clearInterval(batteryInterval);
    };
  }, []);

  // Determine aspect ratio class / size
  const getAspectStyle = () => {
    switch (state.aspectRatio) {
      case "2.39:1":
        return "aspect-[2.39/1]";
      case "16:9":
        return "aspect-[16/9]";
      case "4:3":
        return "aspect-[4/3]";
      case "1:1":
        return "aspect-[1/1]";
      case "9:16":
        return "aspect-[9/16] max-h-[360px] mx-auto";
      default:
        return "aspect-[16/9]";
    }
  };

  // Get color grading visual style / gradients to simulate scene
  const getColorGradingClass = () => {
    switch (state.colorGrading) {
      case "teal_and_orange":
        return "from-[#083344] via-[#0f172a] to-[#7c2d12] saturate-[1.3] contrast-[1.1]";
      case "cyberpunk_neon":
        return "from-[#4c1d95] via-[#0f172a] to-[#083344] saturate-[1.8] contrast-[1.2]";
      case "desaturated_moody":
        return "from-[#1f2937] via-[#111827] to-[#374151] saturate-[0.4] contrast-[0.95]";
      case "kodak_2383":
        return "from-[#1c1917] via-[#0c0a09] to-[#44403c] saturate-[1.1] contrast-[1.15] sepia-[0.1]";
      case "bw_high_contrast":
        return "from-[#000000] via-[#18181b] to-[#454545] grayscale saturate-[0] contrast-[1.6]";
      case "pastel":
        return "from-[#fbcfe8] via-[#e2e8f0] to-[#fef08a] saturate-[0.8] contrast-[0.9] brightness-[1.05]";
      case "technicolor":
        return "from-[#991b1b] via-[#1e3a8a] to-[#166534] saturate-[2.2] contrast-[1.25]";
      case "bleach_bypass":
        return "from-[#27272a] via-[#09090b] to-[#3f3f46] saturate-[0.35] contrast-[1.35] brightness-[0.9]";
      default:
        return "from-[#18181b] via-[#09090b] to-[#27272a]";
    }
  };

  // Get grain effect overlay style
  const getGrainIntensity = () => {
    switch (state.filmStock) {
      case "16mm_grain":
        return "opacity-15 pointer-events-none mix-blend-overlay bg-repeat bg-[url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.85\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')]";
      case "kodak_vision3_500t":
        return "opacity-8 pointer-events-none mix-blend-overlay bg-repeat bg-[url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.75\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')]";
      case "kodak_portra_400":
      case "fujifilm_superia":
        return "opacity-5 pointer-events-none mix-blend-overlay bg-repeat bg-[url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')]";
      case "clean_digital":
      default:
        return "opacity-0 pointer-events-none";
    }
  };

  // Simulating depth of field (DoF) blur filter on background elements
  const getDoFBlur = () => {
    return state.depthOfField === "shallow" ? "blur-[2.5px]" : "blur-0";
  };

  // Dutch angle rotation class
  const getAngleRotation = () => {
    return state.angle === "dutch_angle" ? "rotate-[-7deg] scale-105" : "rotate-0";
  };

  // Generate a mock descriptive layout background text or stylized graphics
  const renderMockSubjectGraphic = () => {
    // If it's B&W we make a stark light silhouette, if neon, glowing outline
    const isNeon = state.colorGrading === "cyberpunk_neon" || state.lightingType === "neon";
    const isBW = state.colorGrading === "bw_high_contrast";
    const isWarm = state.lightingType === "golden_hour" || state.colorGrading === "teal_and_orange";

    let subjectColor = "text-zinc-400";
    let glowColor = "";

    if (isNeon) {
      subjectColor = "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]";
      glowColor = "shadow-[0_0_15px_rgba(219,39,119,0.5)]";
    } else if (isBW) {
      subjectColor = "text-white";
    } else if (isWarm) {
      subjectColor = "text-amber-200 drop-shadow-[0_0_4px_rgba(245,158,11,0.6)]";
    }

    // Determine position based on camera angle
    let angleClass = "translate-y-4";
    if (state.angle === "low_angle" || state.angle === "worms_eye_view") {
      angleClass = "translate-y-12 scale-110 origin-bottom";
    } else if (state.angle === "high_angle" || state.angle === "birds_eye_view") {
      angleClass = "-translate-y-2 scale-90 origin-top";
    } else if (state.angle === "over_the_shoulder") {
      angleClass = "translate-y-4 translate-x-8 scale-105";
    }

    return (
      <div className={`relative flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${angleClass}`}>
        {/* Over-the-shoulder mock blocker */}
        {state.angle === "over_the_shoulder" && (
          <div className="absolute -left-16 bottom-0 w-28 h-48 bg-zinc-950/80 rounded-t-full border-r border-zinc-700 blur-[1px] transform -translate-x-4 scale-x-120 z-10" />
        )}

        {/* Central visual placeholder symbolizing subject */}
        <div className="relative">
          {/* Sidelight or Backlight glow simulations */}
          {state.lightingType === "backlight" && (
            <div className="absolute -inset-4 bg-white/30 rounded-full blur-2xl animate-pulse" />
          )}
          {state.lightingType === "rim_light" && (
            <div className="absolute -inset-1 bg-amber-400/50 rounded-full blur-md" />
          )}
          {state.lightingType === "golden_hour" && (
            <div className="absolute -right-12 -top-12 w-24 h-24 bg-amber-500/20 rounded-full blur-xl" />
          )}
          {state.lightingType === "window_light" && (
            <div className={`absolute -left-16 top-1/2 -translate-y-1/2 w-16 h-32 bg-white/10 rounded-lg blur-lg transform skew-x-12 transition-all duration-700`} />
          )}

          {/* Core silhouette graphic representing subject */}
          <div className={`w-16 h-16 rounded-full bg-gradient-to-b from-zinc-800 to-zinc-950 border border-zinc-700/50 flex items-center justify-center ${glowColor} transition-all duration-700`}>
            {state.angle === "pov" ? (
              <Sliders className={`w-8 h-8 ${subjectColor}`} />
            ) : state.camera.includes("iphone") ? (
              <Layers className={`w-8 h-8 ${subjectColor}`} />
            ) : (
              <Camera className={`w-8 h-8 ${subjectColor}`} />
            )}
          </div>
          {/* Torso */}
          <div className="w-24 h-16 mt-1 bg-gradient-to-b from-zinc-800 to-zinc-950 rounded-t-3xl border-t border-x border-zinc-700/40" />
        </div>

        {/* Subtitle overlay showing the Scene info */}
        <div className="absolute -bottom-8 bg-zinc-950/85 px-3 py-1 rounded text-[10px] font-mono tracking-wide border border-zinc-800 max-w-[200px] truncate text-zinc-300 text-center">
          {state.subject || "No scene subject configured"}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-zinc-950 rounded-xl border border-zinc-800 p-4 overflow-hidden shadow-2xl relative group flex flex-col justify-between" id="cine-monitor-root">
      {/* Top Bar / Status */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
          <span className="text-xs font-mono font-medium text-zinc-400 tracking-wider">MONITOR DE CAMARA</span>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-500">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>LUT: {state.colorGrading.toUpperCase().replace(/_/g, " ")}</span>
          </div>
          <div className="hidden sm:block">
            <span>RES: 8K RAW</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-zinc-400">{batteryLevel}%</span>
            <div className="w-5 h-2.5 border border-zinc-600 rounded-sm p-0.5 flex items-center">
              <div className="bg-emerald-500 h-full rounded-2xs" style={{ width: `${batteryLevel}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Viewfinder Main Sandbox Container */}
      <div className="bg-black rounded-lg overflow-hidden border border-zinc-900 relative flex items-center justify-center p-8 min-h-[220px] transition-all duration-500">
        
        {/* Dynamic Aspect Ratio Masking Box */}
        <div className={`w-full max-w-full relative bg-zinc-950 overflow-hidden shadow-inner border border-zinc-800/40 transition-all duration-500 ease-in-out ${getAspectStyle()} flex items-center justify-center`}>
          
          {/* Background simulated cinematography environment */}
          <div className={`absolute inset-0 bg-gradient-to-br ${getColorGradingClass()} transition-all duration-1000`} />

          {/* Focal / depth-of-field simulated blur overlay on back-most layers */}
          <div className={`absolute inset-0 bg-black/20 ${getDoFBlur()} transition-all duration-700`} />

          {/* Film Grain simulator overlay */}
          <div className={`absolute inset-0 ${getGrainIntensity()} transition-all duration-700`} />

          {/* Camera Grid Lines & Overlays (Cinematic Viewfinder Guidelines) */}
          <div className="absolute inset-0 pointer-events-none border border-white/5 flex items-center justify-center">
            {/* Thirds guidelines */}
            <div className="absolute top-0 bottom-0 left-1/3 w-[1px] bg-white/5" />
            <div className="absolute top-0 bottom-0 left-2/3 w-[1px] bg-white/5" />
            <div className="absolute left-0 right-0 top-1/3 h-[1px] bg-white/5" />
            <div className="absolute left-0 right-0 top-2/3 h-[1px] bg-white/5" />
            
            {/* Center target crosshair */}
            <div className="absolute w-4 h-4 border border-cyan-400/30 rounded-full" />
            <div className="absolute w-2 h-[1px] bg-cyan-400/40" />
            <div className="absolute h-2 w-[1px] bg-cyan-400/40" />

            {/* Viewfinder Safe area framing corners */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/20" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/20" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/20" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/20" />
          </div>

          {/* Interactive silhouette subject rendered with modifiers */}
          <div className={`transition-transform duration-700 ease-in-out ${getAngleRotation()}`}>
            {renderMockSubjectGraphic()}
          </div>

          {/* Live HUD Overlay details (Top details) */}
          <div className="absolute top-3 left-3 flex items-center gap-1 text-[8px] font-mono font-semibold tracking-widest text-white/70 bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-2xs uppercase">
            <span className={`w-1.5 h-1.5 rounded-full bg-red-600 ${recFlashing ? "opacity-100" : "opacity-20"}`} />
            <span>REC</span>
            <span className="text-zinc-400">|</span>
            <span>{state.camera.toUpperCase().replace(/_/g, " ")}</span>
          </div>

          <div className="absolute top-3 right-3 text-[8px] font-mono font-semibold tracking-widest text-white/70 bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-2xs uppercase">
            <span>ISO 400</span>
            <span className="mx-1 text-zinc-500">•</span>
            <span>24FPS</span>
            <span className="mx-1 text-zinc-500">•</span>
            <span>180°</span>
          </div>

          {/* Live HUD Overlay details (Bottom details) */}
          <div className="absolute bottom-3 left-3 text-[8px] font-mono text-white/70 bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-2xs flex flex-col gap-0.5 uppercase">
            <div className="flex items-center gap-1 font-semibold">
              <span className="text-amber-400">FOC:</span>
              <span>{state.focalLength}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-zinc-400">LEN:</span>
              <span>{state.lensType}</span>
            </div>
          </div>

          <div className="absolute bottom-3 right-3 text-[8px] font-mono text-white/70 bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-2xs flex flex-col gap-0.5 items-end uppercase">
            <div className="flex items-center gap-1 font-semibold">
              <span className="text-cyan-400">AP:</span>
              <span>{state.aperture}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-zinc-400">DOF:</span>
              <span>{state.depthOfField}</span>
            </div>
          </div>

          {/* Motion Overlay Indicator */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col gap-1 items-center bg-black/30 p-1 rounded text-white/60">
            <span className="text-[7px] uppercase font-mono tracking-wider writing-mode-vertical">MOV</span>
            <div className="w-1 h-8 bg-white/10 rounded overflow-hidden relative">
              <div className="absolute top-2 bottom-2 left-0 right-0 bg-cyan-400 animate-pulse" />
            </div>
            <span className="text-[7px] font-mono uppercase">{state.motion.substring(0, 4)}</span>
          </div>
        </div>
      </div>

      {/* Bottom Audio / Visual Status Indicators */}
      <div className="grid grid-cols-2 gap-4 mt-3 bg-zinc-900/50 p-2.5 rounded-lg border border-zinc-800">
        
        {/* Audio Metering Simulation */}
        <div className="flex flex-col justify-center">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[9px] font-mono text-zinc-500 flex items-center gap-1 uppercase">
              <Volume2 className="w-3 h-3 text-zinc-400" /> CH1 / CH2
            </span>
            <span className="text-[8px] font-mono text-zinc-500">-12dB</span>
          </div>
          <div className="flex flex-col gap-1 w-full">
            {/* Channel 1 */}
            <div className="h-1.5 bg-zinc-950 rounded-full overflow-hidden flex">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-100"
                style={{ width: `${audioLevel1}%` }}
              />
              {audioLevel1 > 65 && (
                <div className="bg-amber-500 h-full rounded-r-full" style={{ width: `${(audioLevel1 - 65) * 2}%` }} />
              )}
            </div>
            {/* Channel 2 */}
            <div className="h-1.5 bg-zinc-950 rounded-full overflow-hidden flex">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-100"
                style={{ width: `${audioLevel2}%` }}
              />
              {audioLevel2 > 65 && (
                <div className="bg-amber-500 h-full rounded-r-full" style={{ width: `${(audioLevel2 - 65) * 2}%` }} />
              )}
            </div>
          </div>
        </div>

        {/* Selected Optics / Cam Summary Tag */}
        <div className="flex flex-col justify-center text-right font-mono border-l border-zinc-800 pl-3">
          <span className="text-[9px] text-zinc-500 uppercase">Configuración de Aspecto</span>
          <div className="text-xs font-semibold text-zinc-200 mt-0.5">
            {state.aspectRatio} Cinemascope
          </div>
          <div className="text-[9px] text-zinc-400 truncate mt-0.5">
            {state.focalLength} • {state.lensType} • {state.aperture}
          </div>
        </div>
      </div>
    </div>
  );
}
