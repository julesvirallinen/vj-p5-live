export const SKETCH_TEMPLATE_ID = "user_templates";
export const SKETCH_TEMPLATE_NAME = "new sketch template";

export interface ICurrentSketch {
  code: string;
  id: string;
}

export interface ISettingsSketch {
  id: string;
  name: string;
  updatedAt?: number;
}
