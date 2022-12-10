import { firstSketchMenuItem } from "~/data/demos/firstSketch";
import { ISettings, TSavedUserSketches } from "~/providers/SettingsProvider";

const tutorialSketches = [firstSketchMenuItem];

const getUserSketchIds = (sketches: ISettings["sketches"]) =>
  sketches.map((s) => s.id);

export const loadTutorialSketches = (
  userSettings: TSavedUserSketches
): TSavedUserSketches => {
  const sketches = userSettings.sketches ?? [];

  const missingTutorialSketches = tutorialSketches.filter(
    (tutorial) => !getUserSketchIds(sketches).includes(tutorial.id)
  );

  return {
    ...userSettings,
    sketches: [...sketches, ...missingTutorialSketches],
  };
};
