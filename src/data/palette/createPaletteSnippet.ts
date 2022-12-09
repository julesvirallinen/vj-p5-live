import { TColorPalette } from "~/models/colors";

export const createPaletteSnippet = (
  userPalettes: TColorPalette[],
  selectedName: string
) => {
  return `var PALETTE_PRESETS = {
    ${userPalettes.map((p) => `${p.name}: ${JSON.stringify(p.colors)}`)}
  };
  
  var GLOBAL_TRANSPARENCY = 1;
  
  var DEFAULT_PALETTE = PALETTE_PRESETS.${selectedName};
  var CURRENT_COLORS = DEFAULT_PALETTE;
  
  var SELECTED_PALETTE_PRESET;
  var BG_COLOR = [10];
  
  var getColor = (col, T = 1) => {
    if (Array.isArray(col)) {
      const [H, S, B] = col;
      if (!B) return color(H, S);
      if (!S) return color(H);
      return color(H, S, B);
    }
  
    if (typeof col === "string" || col instanceof String) {
      return color(col);
    }
  };
  
  var getColAtI = (i, transparency) => {
    const c = color(CURRENT_COLORS[Math.abs(i) % CURRENT_COLORS.length]);
    c && c.setAlpha(transparency);
    return c;
  };
  
  var setSelected = (paletteArr) => {
    SELECTED_PALETTE_PRESET = paletteArr;
    CURRENT_COLORS = SELECTED_PALETTE_PRESET.map((col) => getColor(col, GLOBAL_TRANSPARENCY));
    return P;
  };
  
  var setPalette = (name) => {
    if (Object.hasOwnProperty.call(PALETTE_PRESETS, name)) {
      return setSelected(PALETTE_PRESETS[name]);
    }
    return setSelected(DEFAULT_PALETTE);
  };
  
  var P = {
    get: () => CURRENT_COLORS,
    getI: (i, opacity = GLOBAL_TRANSPARENCY) => getColAtI(i, opacity),
    setPalette: (name) => setPalette(name),
    set: (colorArray) => setSelected(colorArray),
    setTrans: (trans) => {
      GLOBAL_TRANSPARENCY = trans;
      return P;
    },
    getBG: () => getColor(BG_COLOR),
    getRandom: () => getColAtI(randomInt(20)),
  };
  

  `;
};
