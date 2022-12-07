import { TColorPalette } from "../../models/colors";

export const createPaletteSnippet = (
  userPalettes: TColorPalette[],
  selectedName: string
) => {
  return `var presets = {
    ${userPalettes.map((p) => `${p.name}: ${JSON.stringify(p.colors)}`)}
  };
  
  var globalTransparency = 1;
  
  var defPreset = presets.${selectedName};
  var colors = defPreset;
  
  var selected;
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
    const c = getI(colors, i);
    c && c.setAlpha(transparency);
    return c;
  };
  
  var setSelected = (paletteArr) => {
    selected = paletteArr;
    colors = selected.map((col) => getColor(col, globalTransparency));
    return P;
  };
  
  var setPalette = (name) => {
    if (Object.hasOwnProperty.call(presets, name)) {
      return setSelected(presets[name]);
    }
    return setSelected(defPreset);
  };
  
  var P = {
    get: () => colors,
    getI: (i, opacity = globalTransparency) => getColAtI(i, opacity),
    setPreset: (name) => setPalette(name),
    set: (palette) => setSelected(palette),
    shift: () => setSelected(shiftArray(selected)),
    setTrans: (trans) => {
      globalTransparency = trans;
      return P;
    },
    getBG: () => getColor(BG_COLOR),
    getRandom: () => getColAtI(randomInt(20)),
  };
  

  `;
};
