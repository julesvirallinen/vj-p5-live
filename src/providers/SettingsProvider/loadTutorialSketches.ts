import { ISettingsSketch } from '~/models/sketch';
import { ISettings, TUserSavedSettings } from '~/providers/SettingsProvider';

const getUserSketchIds = (sketches: ISettings['sketches']) =>
  sketches.map((s) => s.id);

export const loadTutorialSketches = (
  userSettings: TUserSavedSettings,
  tutorials: ISettingsSketch[]
): TUserSavedSettings => {
  const sketches = userSettings.sketches ?? [];

  const missingTutorialSketches = tutorials.filter(
    (tutorial) => !getUserSketchIds(sketches).includes(tutorial.id)
  );

  return {
    ...userSettings,
    sketches: [...sketches, ...missingTutorialSketches],
  };
};
