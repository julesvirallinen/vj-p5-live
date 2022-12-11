import { IAppState } from '../providers/SettingsProvider';

import { firstSketchMenuItem } from './demos/firstSketch';

import { HIROSHIGE, KLIMT } from '~/data/palette/defaultPalettes';

export const defaultSettings: IAppState['settings'] = {
  hideEditor: false,
  themeOverrides: {},
  sketches: [firstSketchMenuItem],
  showMenu: true,
  openMenu: 'sketches',
  showConsoleFeed: true,
  showActionBar: true,
  compileAfterMs: 1000,
  userLoadedScripts: [],
  colorPalettes: [KLIMT, HIROSHIGE],
  canvas: {
    percentDimmed: 1,
  },
  maptasticEnabled: false,
};
