import { CineOption, Preset, CinematicState } from "./types";

export const CAMERAS: CineOption[] = [
  {
    id: "arri_alexa_65",
    labelEs: "ARRI Alexa 65",
    labelEn: "ARRI Alexa 65",
    descriptionEs: "La cámara de formato grande preferida para superproducciones de Hollywood con un rango dinámico legendario.",
    descriptionEn: "The premier large-format camera for Hollywood blockbusters with legendary dynamic range.",
    icon: "Camera"
  },
  {
    id: "red_komodo",
    labelEs: "RED Komodo 6K",
    labelEn: "RED Komodo 6K",
    descriptionEs: "Cámara de cine compacta con obturador global, ideal para acción rápida y rigs móviles.",
    descriptionEn: "Ultra-compact cine camera with global shutter, perfect for fast-paced action and light rigs.",
    icon: "Video"
  },
  {
    id: "sony_venice",
    labelEs: "Sony Venice 2",
    labelEn: "Sony Venice 2",
    descriptionEs: "Increíble renderizado de tonos de piel y color de alta gama con sensor full-frame de 8K.",
    descriptionEn: "Incredible skin tones rendering and top-tier color science with an 8K full-frame sensor.",
    icon: "Tv"
  },
  {
    id: "canon_c70",
    labelEs: "Canon EOS C70",
    labelEn: "Canon EOS C70",
    descriptionEs: "La todoterreno de los documentalistas independientes con sensor DGO y autoenfoque rápido.",
    descriptionEn: "The indie documentarian's workhorse featuring a DGO sensor and lightning-fast autofocus.",
    icon: "Sparkles"
  },
  {
    id: "blackmagic_pocket_6k",
    labelEs: "Blackmagic Pocket 6K",
    labelEn: "Blackmagic Pocket 6K",
    descriptionEs: "Calidad de cine al alcance de todos con grabación interna RAW y gran ciencia de color.",
    descriptionEn: "Pro-level cinematic quality within reach, featuring internal RAW recording and great color science.",
    icon: "Film"
  },
  {
    id: "iphone_15_pro",
    labelEs: "iPhone 15 Pro Max (Apple Log)",
    labelEn: "iPhone 15 Pro Max (Apple Log)",
    descriptionEs: "Cinematografía móvil avanzada grabando en ProRes Log para una flexibilidad sorprendente.",
    descriptionEn: "Advanced mobile cinematography recording in ProRes Log for surprising grading flexibility.",
    icon: "Smartphone"
  },
  {
    id: "panavision_dxl2",
    labelEs: "Panavision Millennium DXL2",
    labelEn: "Panavision Millennium DXL2",
    descriptionEs: "El estándar dorado de la cinematografía épica, combinando óptica Panavision y color RED.",
    descriptionEn: "The gold standard of epic cinema, combining Panavision optics with RED color science.",
    icon: "Crown"
  },
  {
    id: "gopro_hero_12",
    labelEs: "GoPro Hero 12 Black (GP-Log)",
    labelEn: "GoPro Hero 12 Black (GP-Log)",
    descriptionEs: "Ángulo ultra ancho extremo y estabilización brutal para tomas POV inmersivas.",
    descriptionEn: "Extreme ultra-wide angle and brutal stabilization for immersive first-person POV shots.",
    icon: "Activity"
  }
];

export const FOCAL_LENGTHS: CineOption[] = [
  {
    id: "18mm",
    labelEs: "18mm (Ultra angular)",
    labelEn: "18mm (Ultra-wide)",
    descriptionEs: "Captura paisajes inmensos, exagera la perspectiva y añade drama espacial.",
    descriptionEn: "Capture vast landscapes, exaggerate perspective, and add dramatic spatial depth."
  },
  {
    id: "24mm",
    labelEs: "24mm (Gran angular)",
    labelEn: "24mm (Wide-angle)",
    descriptionEs: "Ideal para establecer escenas, tomas de ambiente y tomas callejeras inmersivas.",
    descriptionEn: "Great for establishing scenes, environmental shots, and immersive street views."
  },
  {
    id: "35mm",
    labelEs: "35mm (Estándar angular)",
    labelEn: "35mm (Wide standard)",
    descriptionEs: "El lente clásico del fotoperiodismo; muestra al sujeto integrado en su entorno.",
    descriptionEn: "The classic photojournalism lens; shows the subject integrated beautifully in their environment."
  },
  {
    id: "50mm",
    labelEs: "50mm (Estándar / Nifty Fifty)",
    labelEn: "50mm (Standard)",
    descriptionEs: "Representa el campo visual y la compresión natural del ojo humano de forma realista.",
    descriptionEn: "Renders human visual perspective and natural compression realistically."
  },
  {
    id: "85mm",
    labelEs: "85mm (Teleobjetivo corto)",
    labelEn: "85mm (Short telephoto)",
    descriptionEs: "La distancia focal reina de los retratos; aísla el sujeto con una compresión favorecedora.",
    descriptionEn: "The king of portrait focal lengths; isolates the subject with flattering compression."
  },
  {
    id: "135mm",
    labelEs: "135mm (Teleobjetivo)",
    labelEn: "135mm (Medium telephoto)",
    descriptionEs: "Fuerte compresión de planos, desenfoque de fondo masivo y sensación de distancia.",
    descriptionEn: "Strong plane compression, massive background blur, and a cinematic feeling of distance."
  }
];

export const LENS_TYPES: CineOption[] = [
  {
    id: "anamorphic",
    labelEs: "Anamórfico",
    labelEn: "Anamorphic",
    descriptionEs: "Destellos horizontales azules característicos, bokeh ovalado y un look cinematográfico panorámico.",
    descriptionEn: "Signature horizontal blue flares, oval bokeh, and a wide panoramic Hollywood look."
  },
  {
    id: "prime",
    labelEs: "Lente Fijo (Prime)",
    labelEn: "Prime",
    descriptionEs: "Óptica ultra nítida, alta luminosidad y excelente calidad de contraste.",
    descriptionEn: "Ultra-sharp optics, high light transmission, and superior contrast quality."
  },
  {
    id: "zoom",
    labelEs: "Zoom",
    labelEn: "Zoom",
    descriptionEs: "Flexibilidad focal sobre la marcha, ideal para documentales y tomas de ritmo rápido.",
    descriptionEn: "Focal flexibility on the fly, ideal for documentaries and fast-paced shooting."
  },
  {
    id: "macro",
    labelEs: "Macro",
    labelEn: "Macro",
    descriptionEs: "Capacidad de enfoque extremadamente cercana para revelar detalles minuciosos del sujeto.",
    descriptionEn: "Extremely close focus capability to reveal intricate, microscopic details of the subject."
  },
  {
    id: "tilt_shift",
    labelEs: "Tilt-Shift (Descentrable)",
    labelEn: "Tilt-Shift",
    descriptionEs: "Manipula el plano de enfoque para dar un efecto de maqueta o corregir líneas de fuga.",
    descriptionEn: "Manipulates the plane of focus for miniature visual effect or architectural line correction."
  }
];

export const APERTURES: CineOption[] = [
  {
    id: "f/1.4",
    labelEs: "f/1.4 (Súper luminoso)",
    labelEn: "f/1.4 (Ultra-fast)",
    descriptionEs: "Captura máxima luz. Produce un fondo cremoso e ideal para condiciones oscuras.",
    descriptionEn: "Maximum light capture. Produces a creamy backdrop, perfect for low-light conditions."
  },
  {
    id: "f/2.8",
    labelEs: "f/2.8 (Estándar cine)",
    labelEn: "f/2.8 (Cine standard)",
    descriptionEs: "Equilibrio perfecto entre nitidez crítica y hermoso aislamiento del sujeto.",
    descriptionEn: "Perfect balance between critical sharpness and beautiful subject separation."
  },
  {
    id: "f/5.6",
    labelEs: "f/5.6 (Nitidez media)",
    labelEn: "f/5.6 (Medium crisp)",
    descriptionEs: "Mantiene tanto el sujeto como gran parte del fondo nítidos y reconocibles.",
    descriptionEn: "Keeps both the subject and much of the background sharp and recognizable."
  },
  {
    id: "f/11",
    labelEs: "f/11 (Paisaje/Profundo)",
    labelEn: "f/11 (Deep focus)",
    descriptionEs: "Máxima profundidad de campo. Todo, desde el primer plano al infinito, está enfocado.",
    descriptionEn: "Maximum depth of field. Everything from foreground to infinity is in focus."
  }
];

export const DEPTH_OF_FIELDS: CineOption[] = [
  {
    id: "shallow",
    labelEs: "Superficial (Shallow DoF)",
    labelEn: "Shallow",
    descriptionEs: "Bokeh suave y fondo borroso que guía inmediatamente los ojos al sujeto principal.",
    descriptionEn: "Smooth bokeh and soft blurry background that guides eyes immediately to the subject."
  },
  {
    id: "deep",
    labelEs: "Profunda (Deep DoF)",
    labelEn: "Deep",
    descriptionEs: "Todo en el encuadre está perfectamente enfocado, ideal para paisajes o tomas grupales complejas.",
    descriptionEn: "Everything in the frame is in sharp focus, ideal for landscapes or complex group compositions."
  }
];

export const ANGLES: CineOption[] = [
  {
    id: "eye_level",
    labelEs: "Altura de los ojos (Eye level)",
    labelEn: "Eye level",
    descriptionEs: "Ángulo neutral y realista que genera empatía directa e intimidad con el sujeto.",
    descriptionEn: "Neutral, realistic angle that breeds direct empathy and intimacy with the subject."
  },
  {
    id: "low_angle",
    labelEs: "Contrapicado (Low angle)",
    labelEn: "Low angle",
    descriptionEs: "La cámara apunta hacia arriba, haciendo que el sujeto parezca poderoso, imponente o heroico.",
    descriptionEn: "The camera shoots upwards, making the subject appear powerful, imposing, or heroic."
  },
  {
    id: "high_angle",
    labelEs: "Picado (High angle)",
    labelEn: "High angle",
    descriptionEs: "La cámara apunta hacia abajo, sugiriendo vulnerabilidad, pequeñez o impotencia del sujeto.",
    descriptionEn: "The camera shoots downwards, suggesting vulnerability, smallness, or powerlessness."
  },
  {
    id: "dutch_angle",
    labelEs: "Plano Holandés (Dutch angle)",
    labelEn: "Dutch angle",
    descriptionEs: "Cámara inclinada de lado. Expresa tensión psicológica, locura, desorientación o peligro.",
    descriptionEn: "Camera is tilted sideways. Conveys psychological tension, madness, disorientation, or danger."
  },
  {
    id: "birds_eye_view",
    labelEs: "Vista de pájaro (Bird's eye view)",
    labelEn: "Bird's eye view",
    descriptionEs: "Toma cenital perpendicular al suelo. Brinda una perspectiva geográfica divina u objetiva.",
    descriptionEn: "Overhead shot perpendicular to the ground. Gives an objective, map-like perspective."
  },
  {
    id: "worms_eye_view",
    labelEs: "Vista de gusano (Worm's eye view)",
    labelEn: "Worm's eye view",
    descriptionEs: "Ángulo extremadamente bajo desde el suelo apuntando arriba. Gran sensación de escala y asombro.",
    descriptionEn: "Extremely low angle from ground level pointing straight up. High sense of scale and awe."
  },
  {
    id: "over_the_shoulder",
    labelEs: "Sobre el hombro (Over the shoulder)",
    labelEn: "Over the shoulder",
    descriptionEs: "Encuadra al sujeto desde detrás del hombro de otro personaje, estableciendo conversación.",
    descriptionEn: "Frames the subject from behind another character's shoulder, setting up dialogue."
  },
  {
    id: "pov",
    labelEs: "Punto de vista (POV)",
    labelEn: "POV",
    descriptionEs: "Muestra exactamente lo que el personaje ve a través de sus propios ojos; inmersión total.",
    descriptionEn: "Shows exactly what the character sees through their own eyes; total first-person immersion."
  }
];

export const MOTIONS: CineOption[] = [
  {
    id: "static",
    labelEs: "Estático (Static)",
    labelEn: "Static",
    descriptionEs: "Cámara fija en trípode. Transmite orden, formalidad, observación fría o calma.",
    descriptionEn: "Camera locked on a tripod. Conveys structure, cold observation, or absolute calm."
  },
  {
    id: "handheld",
    labelEs: "Cámara en mano (Handheld)",
    labelEn: "Handheld",
    descriptionEs: "Movimiento orgánico y tembloroso que inyecta urgencia, realismo, caos o intimidad de documental.",
    descriptionEn: "Organic, shaky movement that injects urgency, realism, chaos, or documentary intimacy."
  },
  {
    id: "dolly",
    labelEs: "Riel / Dolly",
    labelEn: "Dolly",
    descriptionEs: "Movimiento ultrasuave lateral o frontal sobre rieles. Transmite elegancia y precisión.",
    descriptionEn: "Ultra-smooth sliding movement on tracks. Conveys elegance, focus, and technical precision."
  },
  {
    id: "crane",
    labelEs: "Grúa / Jib Crane",
    labelEn: "Crane",
    descriptionEs: "La cámara barre verticalmente flotando en el aire, revelando detalles a gran escala.",
    descriptionEn: "The camera sweeps vertically, floating high in the air to reveal large-scale context."
  },
  {
    id: "steadicam",
    labelEs: "Estabilizador (Steadicam)",
    labelEn: "Steadicam",
    descriptionEs: "Movimiento fluido pero dinámico que sigue al personaje a través de pasillos u obstáculos.",
    descriptionEn: "Fluid, stabilized movement that gracefully follows characters through tight spaces."
  },
  {
    id: "drone",
    labelEs: "Dron (Aerial Drone)",
    labelEn: "Drone",
    descriptionEs: "Toma aérea majestuosa en constante movimiento para mostrar geografía y escala.",
    descriptionEn: "Majestic flying shot with constant smooth movement showing massive scale and topography."
  },
  {
    id: "whip_pan",
    labelEs: "Paneo rápido (Whip pan)",
    labelEn: "Whip pan",
    descriptionEs: "Giro lateral ultra rápido y borroso para transicionar entre dos focos de atención de golpe.",
    descriptionEn: "An ultra-fast, blurry side-to-side rotation to snap-transition between two points."
  }
];

export const LIGHTING_TYPES: CineOption[] = [
  {
    id: "window_light",
    labelEs: "Luz de ventana (Window light)",
    labelEn: "Window light",
    descriptionEs: "Iluminación naturalista y suave que proviene de una ventana lateral para un look pictórico.",
    descriptionEn: "Soft, natural light pouring through a window, creating a classic painterly portrait look."
  },
  {
    id: "rim_light",
    labelEs: "Luz de contorno (Rim light)",
    labelEn: "Rim light",
    descriptionEs: "Una fuente de luz detrás del sujeto que resalta sus bordes y silueta separándolo del fondo.",
    descriptionEn: "A light source placed behind the subject to trace their edges and separate them from dark backgrounds."
  },
  {
    id: "backlight",
    labelEs: "Retroluminación / Contraluz",
    labelEn: "Backlight",
    descriptionEs: "Luz fuerte orientada de frente a la cámara que genera destellos poéticos o siluetas.",
    descriptionEn: "Strong light shining directly towards the camera, generating poetic lens flares or dramatic silhouettes."
  },
  {
    id: "practical",
    labelEs: "Luces prácticas (Practical light)",
    labelEn: "Practical",
    descriptionEs: "Fuentes de luz visibles dentro de la escena (lámparas de mesa, televisores, velas).",
    descriptionEn: "Visible light sources that exist naturally inside the scene (table lamps, neon signs, candles)."
  },
  {
    id: "golden_hour",
    labelEs: "Hora dorada (Golden hour)",
    labelEn: "Golden hour",
    descriptionEs: "La luz mágica y ultra cálida del atardecer o amanecer, con sombras largas y suaves.",
    descriptionEn: "The magical, ultra-warm, low-angle light of sunrise or sunset with long, soft shadows."
  },
  {
    id: "neon",
    labelEs: "Iluminación de Neón (Neon light)",
    labelEn: "Neon",
    descriptionEs: "Fuertes contrastes de colores fluorescentes (púrpura, cian, rosa) con look urbano nocturno.",
    descriptionEn: "Saturated fluorescent hues (cyan, magenta, pink) throwing rich ambient glow on wet surfaces."
  },
  {
    id: "soft_studio",
    labelEs: "Estudio suave (Soft studio light)",
    labelEn: "Soft studio",
    descriptionEs: "Iluminación difusa de caja de luz de estudio que reduce imperfecciones y es muy favorecedora.",
    descriptionEn: "Highly diffused studio softbox light that minimizes harsh shadows and flatters subjects."
  },
  {
    id: "chiaroscuro",
    labelEs: "Claroscuro (Chiaroscuro)",
    labelEn: "Chiaroscuro",
    descriptionEs: "Fuerte contraste entre luz y oscuridad. Drama absoluto, sombras densas estilo Caravaggio.",
    descriptionEn: "High-contrast modeling with deep shadows and select bright pools. Caravaggio-style drama."
  },
  {
    id: "sidelight_left",
    labelEs: "Luz lateral izquierda (Left sidelight)",
    labelEn: "Left sidelight",
    descriptionEs: "Luz que ilumina un solo lado del rostro desde la izquierda, revelando volumen y misterio.",
    descriptionEn: "Light source from the left illuminating half of the subject, highlighting texture and form."
  },
  {
    id: "sidelight_right",
    labelEs: "Luz lateral derecha (Right sidelight)",
    labelEn: "Right sidelight",
    descriptionEs: "Luz que ilumina un solo lado del rostro desde la derecha, acentuando la mirada.",
    descriptionEn: "Light source from the right illuminating half of the subject, emphasizing features and gaze."
  }
];

export const COLOR_GRADINGS: CineOption[] = [
  {
    id: "teal_and_orange",
    labelEs: "Cian y Naranja (Teal & Orange)",
    labelEn: "Teal & Orange",
    descriptionEs: "El look comercial clásico con sombras cianes y tonos de piel cálidos y contrastados.",
    descriptionEn: "The classic blockbuster color grading with teal shadows and warm, popping skin tones."
  },
  {
    id: "cyberpunk_neon",
    labelEs: "Neón Cyberpunk (Cyberpunk)",
    labelEn: "Cyberpunk neon",
    descriptionEs: "Espectro eléctrico dominado por morados, rosas y cianes sobre negros profundos.",
    descriptionEn: "An electric palette saturated with neon blues, hot pinks, and ultraviolet over deep blacks."
  },
  {
    id: "desaturated_moody",
    labelEs: "Desaturado Melancólico (Moody)",
    labelEn: "Desaturated moody",
    descriptionEs: "Tonos apagados y lavados que evocan soledad, realismo sucio, tristeza o misterio.",
    descriptionEn: "Muted, washed-out color spectrum evoking solitude, gritty realism, or tense mystery."
  },
  {
    id: "kodak_2383",
    labelEs: "Impresión de película Kodak 2383",
    labelEn: "Kodak 2383 print",
    descriptionEs: "Emulación de película cinematográfica con negros densos, rojos vibrantes y tonos orgánicos.",
    descriptionEn: "Rich cinematic print LUT emulation featuring thick dark tones, vibrant reds, and organic hues."
  },
  {
    id: "bw_high_contrast",
    labelEs: "Blanco y Negro de alto contraste",
    labelEn: "Black and White high-contrast",
    descriptionEs: "Estilo expresionista, sin color, con sombras gráficas profundas y luces brillantes.",
    descriptionEn: "Expressionist aesthetic stripped of color, featuring graphic deep blacks and stark bright whites."
  },
  {
    id: "pastel",
    labelEs: "Pastel (Estilo Wes Anderson)",
    labelEn: "Pastel",
    descriptionEs: "Colores suaves, poco saturados y simétricos que dan una vibra nostálgica e inocente.",
    descriptionEn: "Soft, whimsical low-saturation tones conveying nostalgia and storybook innocence."
  },
  {
    id: "technicolor",
    labelEs: "Technicolor de 3 tiras",
    labelEn: "3-strip Technicolor",
    descriptionEs: "Colores híper saturados y vibrantes del cine clásico de los años 40 y 50.",
    descriptionEn: "Dazzling, hyper-saturated vintage colors reminiscent of classic 1940s-1950s cinema."
  },
  {
    id: "bleach_bypass",
    labelEs: "Salto de Blanqueo (Bleach Bypass)",
    labelEn: "Bleach bypass",
    descriptionEs: "Alto contraste con baja saturación de color, dando un look militar, crudo e industrial.",
    descriptionEn: "High-contrast with heavily muted color saturation, delivering a gritty, industrial, military feel."
  }
];

export const FILM_STOCKS: CineOption[] = [
  {
    id: "kodak_vision3_500t",
    labelEs: "Kodak Vision3 500T (Color Cine)",
    labelEn: "Kodak Vision3 500T",
    descriptionEs: "Película de tungsteno cálida, ideal para noche, famosa por su grano fino y luces haladas.",
    descriptionEn: "Warm tungsten cinema film, incredible for low-light with organic grain and light halations."
  },
  {
    id: "kodak_portra_400",
    labelEs: "Kodak Portra 400 (Foto Orgánica)",
    labelEn: "Kodak Portra 400",
    descriptionEs: "Famosa por tonos de piel perfectos, grano suave y colores cálidos y acogedores.",
    descriptionEn: "Legendary film famous for perfect skin tones, pastel latitude, and warm inviting colors."
  },
  {
    id: "fujifilm_superia",
    labelEs: "Fujifilm Superia (Matices Verdes)",
    labelEn: "Fujifilm Superia",
    descriptionEs: "Película fotográfica clásica japonesa con tonos de verde ricos, look nostálgico y fresco.",
    descriptionEn: "Classic Japanese consumer film rendering rich green shades and cool nostalgic colors."
  },
  {
    id: "16mm_grain",
    labelEs: "Grano Pesado de 16mm (Vintage)",
    labelEn: "16mm heavy grain",
    descriptionEs: "Look analógico muy marcado con grano grueso y texturizado para un aire indie vintage.",
    descriptionEn: "Texture-heavy analog look with gritty, coarse grain for an authentic vintage indie feel."
  },
  {
    id: "clean_digital",
    labelEs: "Digital Limpio 8K (Arri Raw)",
    labelEn: "Clean digital 8K",
    descriptionEs: "Sin grano de película. Nitidez extrema perfecta para producciones de ciencia ficción pulidas.",
    descriptionEn: "No film grain. Ultra-clean high resolution and perfect clarity for polished sci-fi visuals."
  }
];

export const ASPECT_RATIOS = [
  { id: "2.39:1", label: "2.39:1 (Anamorphic Scope)", desc: "Estándar de cine panorámico ultra-ancho." },
  { id: "16:9", label: "16:9 (Widescreen)", desc: "Estándar de televisión digital moderna y video online." },
  { id: "4:3", label: "4:3 (Academy Ratio)", desc: "Estilo retro, documental vintage o cine clásico." },
  { id: "1:1", label: "1:1 (Square)", desc: "Formato cuadrado, simetría artística o redes sociales." },
  { id: "9:16", label: "9:16 (Vertical)", desc: "Cinematografía móvil moderna para pantallas verticales." }
];

export const DEFAULT_STATE: CinematicState = {
  camera: "arri_alexa_65",
  focalLength: "50mm",
  lensType: "prime",
  aperture: "f/2.8",
  depthOfField: "shallow",
  angle: "eye_level",
  motion: "static",
  lightingType: "window_light",
  lightingDirection: "sidelight_left",
  colorGrading: "teal_and_orange",
  filmStock: "kodak_vision3_500t",
  subject: "A mysterious lone filmmaker wearing a trenchcoat holding a vintage camera",
  location: "a misty, rain-slicked neon street corner at midnight",
  aspectRatio: "2.39:1"
};

export const PRESETS: Preset[] = [
  {
    id: "hollywood_blockbuster",
    nameEs: "Estilo Hollywood",
    nameEn: "Hollywood Blockbuster",
    descriptionEs: "Tomas de gran presupuesto, colores vivos y un look anamórfico espectacular.",
    descriptionEn: "High-budget, action-ready cinematic look with deep anamorphic scope and lush colors.",
    state: {
      camera: "arri_alexa_65",
      focalLength: "85mm",
      lensType: "anamorphic",
      aperture: "f/2.8",
      depthOfField: "shallow",
      angle: "low_angle",
      motion: "dolly",
      lightingType: "golden_hour",
      lightingDirection: "sidelight_right",
      colorGrading: "teal_and_orange",
      filmStock: "kodak_vision3_500t",
      subject: "A charismatic rugged explorer looking intently at a glowing artifact",
      location: "ancient stone ruins deep inside an overgrown misty jungle",
      aspectRatio: "2.39:1"
    },
    icon: "Crown"
  },
  {
    id: "intimate_documentary",
    nameEs: "Documental Íntimo",
    nameEn: "Intimate Documentary",
    descriptionEs: "Movimiento natural, iluminación suave de ventana y un aura de realismo puro.",
    descriptionEn: "Natural camera movement, soft window lighting, and a strong sense of pure realism.",
    state: {
      camera: "canon_c70",
      focalLength: "35mm",
      lensType: "prime",
      aperture: "f/1.4",
      depthOfField: "shallow",
      angle: "over_the_shoulder",
      motion: "handheld",
      lightingType: "window_light",
      lightingDirection: "sidelight_left",
      colorGrading: "desaturated_moody",
      filmStock: "kodak_portra_400",
      subject: "An elderly artisan with deeply lined hands carefully carving a wooden violin",
      location: "a dusty, sun-drenched rustic woodworking workshop",
      aspectRatio: "16:9"
    },
    icon: "Users"
  },
  {
    id: "sci_fi_neon",
    nameEs: "Ciencia Ficción",
    nameEn: "Sci-Fi Cyberpunk",
    descriptionEs: "Neones fluorescentes, cámara móvil fluida y un fondo cibernético ultra nítido.",
    descriptionEn: "Fluorescent neons, stabilized camera motion, and an ultra-sharp cybernetic backdrop.",
    state: {
      camera: "red_komodo",
      focalLength: "24mm",
      lensType: "anamorphic",
      aperture: "f/2.8",
      depthOfField: "shallow",
      angle: "low_angle",
      motion: "steadicam",
      lightingType: "neon",
      lightingDirection: "sidelight_left",
      colorGrading: "cyberpunk_neon",
      filmStock: "clean_digital",
      subject: "A cybernetic technician in reflective gear examining a holographic tablet interface",
      location: "a rain-slicked Tokyo street under towering neon skyscrapers and glowing ads",
      aspectRatio: "2.39:1"
    },
    icon: "Zap"
  },
  {
    id: "classic_noir",
    nameEs: "Cine Negro Clásico",
    nameEn: "Classic Film Noir",
    descriptionEs: "Blanco y negro con sombras duras y misterio absoluto inspirado en los años 40.",
    descriptionEn: "Stark black and white with dramatic hard shadows and thick atmosphere inspired by the 1940s.",
    state: {
      camera: "sony_venice",
      focalLength: "50mm",
      lensType: "prime",
      aperture: "f/5.6",
      depthOfField: "deep",
      angle: "dutch_angle",
      motion: "static",
      lightingType: "chiaroscuro",
      lightingDirection: "sidelight_right",
      colorGrading: "bw_high_contrast",
      filmStock: "16mm_grain",
      subject: "A mysterious detective in a fedora smoking a cigarette, with a thick plume of smoke",
      location: "a dark wet alleyway under a flickering streetlamp, with long cast shadows",
      aspectRatio: "4:3"
    },
    icon: "Eye"
  }
];
