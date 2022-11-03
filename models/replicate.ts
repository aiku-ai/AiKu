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

export enum DiffusionPresets {
  NeonMecha = "neon ambiance, abstract black oil, gear mecha, detailed acrylic grunge, intricate complexity, rendered in unreal engine, photorealistic"
}
