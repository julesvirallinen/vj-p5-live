import { TSrcScript } from "../../../models/script";
import { TInnerHTMLScript } from "../../P5Canvas/useScriptLoader";
import * as R from "ramda";

// investigate https://addyosmani.com/basket.js/ for localstorage caching

export const loadScriptTags = (
  doc: Document | undefined,
  scripts: TSrcScript[],
  setScriptLoaded: (scriptId: string) => void
) => {
  if (R.isNil(doc)) return null;
  for (const scriptProperties of scripts) {
    const existingScript = doc.getElementById(scriptProperties.id);

    if (!existingScript) {
      const script = doc.createElement("script");
      script.id = scriptProperties.id;
      script.type = "application/javascript";
      script.async = true;
      script.src = scriptProperties.path;
      doc.body.appendChild(script);

      script.onload = () => {
        setScriptLoaded(scriptProperties.id);
      };
    } else {
      setScriptLoaded(scriptProperties.id);
    }
  }
};
export const loadScript =
  (doc: Document) =>
  ({ id, path }: TSrcScript) => {
    return new Promise((resolve, reject) => {
      const existingScript = doc.getElementById(id);

      if (existingScript) {
        return resolve(path);
      }

      const script = doc.createElement("script");
      script.src = path;
      script.id = id;
      script.async = false;
      script.onload = function () {
        resolve(path);
      };
      script.onerror = function () {
        reject(path);
      };
      doc.body.appendChild(script);
    });
  };

export const loadProcessingScripts = (
  doc: Document | undefined,
  scriptProps: TInnerHTMLScript,
  callback: () => void
) => {
  if (R.isNil(doc)) return null;
  const existingScript = doc.getElementById(scriptProps.id);
  existingScript?.remove();
  const script = doc.createElement("script");
  script.async = false;

  script.id = scriptProps.id;

  script.innerHTML =
    `${scriptProps.content}\n${existingScript ? "" : " new p5()"}` ?? "";

  doc.body.appendChild(script);

  callback();
};
