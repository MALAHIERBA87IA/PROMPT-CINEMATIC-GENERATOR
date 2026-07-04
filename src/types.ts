export interface CineOption {
  id: string;
  labelEs: string;
  labelEn: string;
  descriptionEs: string;
  descriptionEn: string;
  icon?: string; // Icon name from lucide-react or helper key
}

export interface CinematicState {
  camera: string;
  focalLength: string;
  lensType: string;
  aperture: string;
  depthOfField: string;
  angle: string;
  motion: string;
  lightingType: string;
  lightingDirection: string;
  colorGrading: string;
  filmStock: string;
  subject: string;
  location: string;
  aspectRatio: string; // e.g. "16:9", "2.39:1", "4:3", "9:16"
}

export interface Preset {
  id: string;
  nameEs: string;
  nameEn: string;
  descriptionEs: string;
  descriptionEn: string;
  state: CinematicState;
  icon?: string;
}

export interface SavedPrompt {
  id: string;
  timestamp: number;
  title: string;
  promptEs: string;
  promptEn: string;
  state: CinematicState;
}
