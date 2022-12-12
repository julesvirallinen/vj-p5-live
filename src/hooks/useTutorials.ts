import {
  tutorial2LocalStorage,
  tutorial2Menuitem,
} from '~/data/demos/audioTutorial';
import {
  firstSketchLocalStorage,
  firstSketchMenuItem,
} from '~/data/demos/firstSketch';

export const useTutorials = () => {
  const tutorials = [firstSketchMenuItem, tutorial2Menuitem];

  const tutorialCode = [firstSketchLocalStorage, tutorial2LocalStorage];

  const tutorialIds = tutorials.map((t) => t.id);

  const isTutorial = (id: string) => tutorialIds.includes(id);

  return { tutorials, tutorialCode, tutorialIds, isTutorial };
};
