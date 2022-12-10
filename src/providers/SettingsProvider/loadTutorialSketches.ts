import { firstSketchMenuItem } from "~/data/demos/firstSketch";
import { ISettings, TUserSavedSettings } from "~/providers/SettingsProvider";

const tutorialSketches = [firstSketchMenuItem];

const getUserSketchIds = (sketches: ISettings["sketches"]) =>
  sketches.map((s) => s.id);

export const loadTutorialSketches = (
  userSettings: TUserSavedSettings
): TUserSavedSettings => {
  const sketches = userSettings.sketches ?? [];

  const missingTutorialSketches = tutorialSketches.filter(
    (tutorial) => !getUserSketchIds(sketches).includes(tutorial.id)
  );

  return {
    ...userSettings,
    sketches: [...sketches, ...missingTutorialSketches],
  };
};
