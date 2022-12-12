import { IAppState } from '../providers/SettingsProvider';

import { firstSketchMenuItem } from './demos/firstSketch';

import { tutorial2Menuitem } from '~/data/demos/audioTutorial';
import { HIROSHIGE, KLIMT } from '~/data/palette/defaultPalettes';

export const defaultSettings: IAppState['settings'] = {
  hideEditor: false,
  themeOverrides: {},
  sketches: [firstSketchMenuItem, tutorial2Menuitem],
  showMenu: true,
  openMenu: 'sketches',
  showConsoleFeed: true,
  showActionBar: true,
  compileAfterMs: 2500,
  userLoadedScripts: [],
  colorPalettes: [KLIMT, HIROSHIGE],
  canvas: {
    percentDimmed: 1,
  },
  maptasticEnabled: false,
};
