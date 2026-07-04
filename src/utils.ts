import { CinematicState } from "./types";
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
  FILM_STOCKS
} from "./constants";

export function getOptionLabel(id: string, list: any[], lang: "es" | "en"): string {
  const item = list.find((o) => o.id === id);
  if (!item) return id;
  // If the item itself matches a standard text label (like a raw focal length e.g., "50mm"), return it directly or clean it up
  const label = lang === "es" ? item.labelEs : item.labelEn;
  // Strip out descriptions inside parentheses for the actual compiled prompt
  return label.replace(/\s*\(.*?\)/g, "").trim();
}

/**
 * Compiles a professional cinematic prompt from the given state.
 * For English, it produces prompts perfect for Midjourney, DALL-E 3, Flux, or Stable Diffusion.
 * For Spanish, it produces an descriptive, understandable equivalent.
 */
export function compilePrompt(state: CinematicState, lang: "es" | "en"): string {
  const camera = getOptionLabel(state.camera, CAMERAS, lang);
  const focal = getOptionLabel(state.focalLength, FOCAL_LENGTHS, lang);
  const lens = getOptionLabel(state.lensType, LENS_TYPES, lang).toLowerCase();
  const aperture = getOptionLabel(state.aperture, APERTURES, lang);
  const dof = getOptionLabel(state.depthOfField, DEPTH_OF_FIELDS, lang).toLowerCase();
  const angle = getOptionLabel(state.angle, ANGLES, lang);
  const motion = getOptionLabel(state.motion, MOTIONS, lang).toLowerCase();
  const lighting = getOptionLabel(state.lightingType, LIGHTING_TYPES, lang).toLowerCase();
  const direction = getOptionLabel(state.lightingDirection, LIGHTING_TYPES, lang).toLowerCase();
  const grading = getOptionLabel(state.colorGrading, COLOR_GRADINGS, lang);
  const film = getOptionLabel(state.filmStock, FILM_STOCKS, lang);

  const subjectText = state.subject.trim() || (lang === "es" ? "Un sujeto misterioso" : "A mysterious subject");
  const locationText = state.location.trim() ? (lang === "es" ? ` en ${state.location.trim()}` : ` in ${state.location.trim()}`) : "";

  if (lang === "en") {
    // English cinematic prompt compilation (Optimized for AI models like Midjourney/Flux)
    return `Cinematic shot of ${subjectText}${locationText}. Shot on ${camera} with ${focal} ${lens} lens, aperture ${aperture} for a ${dof} depth of field. ${angle} shot, ${motion} camera movement. Lighting: ${lighting}, accented by ${direction}. Color graded in ${grading} style, with a ${film} film stock texture. High-fidelity cinematic realism, photorealistic, 8k resolution, aspect ratio --ar ${state.aspectRatio === "2.39:1" ? "21:9" : state.aspectRatio}`;
  } else {
    // Spanish translation/equivalent prompt compilation
    return `Plano cinematográfico de ${subjectText}${locationText}. Filmado con ${camera} y lente ${lens} de ${focal}, apertura de diafragma ${aperture} que crea una profundidad de campo ${dof}. Ángulo de toma ${angle.toLowerCase()} con movimiento de cámara ${motion}. Iluminación tipo ${lighting} reforzada con ${direction}. Corrección de color estilo ${grading} y textura de película ${film}. Estética de cine profesional, hiperrealista, resolución 8k, relación de aspecto ${state.aspectRatio}.`;
  }
}

/**
 * Fast translation dictionary for common words in subject/location to assist users
 * with automatic Spanish -> English translation.
 */
const TRANSLATION_DICTIONARY: Record<string, string> = {
  // Nouns
  "hombre": "man",
  "mujer": "woman",
  "niño": "boy",
  "niña": "girl",
  "anciano": "elderly man",
  "anciana": "elderly woman",
  "persona": "person",
  "gente": "people",
  "calle": "street",
  "callejón": "alleyway",
  "bosque": "forest",
  "selva": "jungle",
  "playa": "beach",
  "montaña": "mountain",
  "desierto": "desert",
  "ciudad": "city",
  "edificio": "building",
  "oficina": "office",
  "cafetería": "cafeteria",
  "bar": "bar",
  "habitación": "room",
  "cuarto": "room",
  "casa": "house",
  "parque": "park",
  "estación": "station",
  "tren": "train",
  "coche": "car",
  "auto": "car",
  "carro": "car",
  "lluvia": "rain",
  "neblina": "fog",
  "niebla": "mist",
  "nieve": "snow",
  "humo": "smoke",
  "luz": "light",
  "noche": "night",
  "tarde": "afternoon",
  "mañana": "morning",
  "atardecer": "sunset",
  "amanecer": "sunrise",
  "vestido": "dress",
  "chaqueta": "jacket",
  "traje": "suit",
  "sombrero": "hat",
  "rostro": "face",
  "mirada": "look",
  "ojos": "eyes",
  "manos": "hands",
  "luces": "lights",

  // Adjectives
  "misterioso": "mysterious",
  "misteriosa": "mysterious",
  "viejo": "old",
  "vieja": "old",
  "joven": "young",
  "hermoso": "beautiful",
  "hermosa": "beautiful",
  "oscuro": "dark",
  "oscura": "dark",
  "brillante": "bright",
  "mojado": "wet",
  "mojada": "wet",
  "lluvioso": "rainy",
  "antiguo": "ancient",
  "antigua": "ancient",
  "futurista": "futuristic",
  "moderno": "modern",
  "retro": "retro",
  "vintage": "vintage",
  "solitario": "lone",
  "solitaria": "lone",
  "triste": "sad",
  "feliz": "happy",
  "cansado": "tired",
  "cansada": "tired",
  "elegante": "elegant",
  "sucio": "dirty",
  "limpio": "clean",
  "nublado": "cloudy",
  "cálido": "warm",
  "cálida": "warm",
  "frío": "cold",
  "fría": "cold",

  // Prepositions & Connectors
  "en": "in",
  "con": "with",
  "bajo": "under",
  "sobre": "on",
  "un": "a",
  "una": "a",
  "el": "the",
  "la": "the",
  "los": "the",
  "las": "the",
  "y": "and",
  "de": "of",
  "desde": "from",
  "al": "at the",
  "del": "of the"
};

/**
 * A client-side heuristic translator that replaces common Spanish cinematic terms with English
 * words to facilitate prompt generation when users don't speak English.
 */
export function translateTextClientSide(text: string): string {
  if (!text) return "";
  
  // Replace punctuation boundaries carefully to keep formatting
  let translated = text.toLowerCase();
  
  // We tokenize by words and punctuation
  const wordsAndPunct = translated.split(/(\b|\s+|,|\.|\?|!|;)/);
  
  const mapped = wordsAndPunct.map(token => {
    const trimmed = token.trim().toLowerCase();
    if (TRANSLATION_DICTIONARY[trimmed]) {
      // Preserve original capitalization roughly (capitalize first letter if the original token was capitalized)
      const replacement = TRANSLATION_DICTIONARY[trimmed];
      return token.match(/^[A-Z]/) 
        ? replacement.charAt(0).toUpperCase() + replacement.slice(1)
        : replacement;
    }
    return token;
  });
  
  // Clean up double spaces or weird formatting from reconstruction
  return mapped.join("")
    .replace(/\s+/g, " ")
    .replace(/\s+,\s+/g, ", ")
    .replace(/\s+\.\s+/g, ". ")
    .trim();
}
