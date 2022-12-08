import { useCurrentSketch } from "../../../../../../hooks/useCurrentSketch";
import { useSettings } from "../../../../../../hooks/useSettings";
import { useSketchManager } from "../../../../../../hooks/useSketchManager";
import { TColorCode, TColorPalette } from "../../../../../../models/colors";
import Logger from "js-logger";
import * as R from "ramda";

export const usePaletteMenu = () => {
  const { colorPalettes, patchSettings } = useSettings();
  const { setSketchPalette } = useSketchManager();
  const { id: sketchId, paletteName: currentSketchPalette } =
    useCurrentSketch();

  const addPalette = (name: string, colors: TColorCode[]) => {
    const paletteNameTaken = colorPalettes.findIndex(R.propEq("name", name));
    if (paletteNameTaken !== -1) {
      Logger.warn("Palette name taken");
      return;
    }
    const newPalette: TColorPalette = {
      name,
      colors,
      id: `${name}-${new Date().getTime()}`,
    };

    patchSettings(["colorPalettes"], [...colorPalettes, newPalette]);
  };

  const removePalette = (name: string) => {
    Logger.info("Deleted palette: ", name);
    patchSettings(
      ["colorPalettes"],
      colorPalettes.filter((p) => p.name !== name)
    );
  };

  const setPaletteForCurrentSketch = (name: string) => {
    Logger.info("Set palette: ", name, " for sketch " + sketchId);
    setSketchPalette(sketchId, name);
  };

  return {
    addPalette,
    removePalette,
    colorPalettes,
    setPaletteForCurrentSketch,
    currentSketchPalette,
  };
};
