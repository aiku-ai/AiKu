export interface PredictionResponse {
  completed_at:      null;
  created_at:        string;
  error:             null;
  hardware:          string;
  id:                string;
  input:             Input;
  logs:              null;
  metrics:           Metrics;
  output:            null;
  started_at:        null;
  status:            string;
  urls:              Urls;
  version:           string;
  webhook_completed: null;
}

export interface Input {
  width:           number;
  height:          number;
  prompt:          string;
  num_outputs:     number;
  guidance_scale:  number;
  prompt_strength: number;
}

export interface Metrics {
}

export interface Urls {
  get:    string;
  cancel: string;
}


export const DiffusionPresets = new Map<string, string>([
  ["Neon Mecha", "neon ambiance, gear mecha, intricate complexity, rendered in unreal engine, photorealistic"],
  ["Ominous Escape", "professional ominous concept art, elegant, highly detailed digital painting, concept art, smooth, sharp focus, illustration"],
  ["Lush Illumination", "unreal engine, greg rutowski, loish, rhads, beeple, makoto shinkai and lois van baarle, ilya kuvshinov, rossdraws, tom bagshaw, alphonse mucha, global illumination, detailed and intricate environment"],
])
