import { TSrcScript } from "../../../models/script";
import { TInnerHTMLScript } from "../useScriptLoader";
import * as R from "ramda";

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

export const loadProcessingScripts = (
  doc: Document | undefined,
  scriptProps: TInnerHTMLScript,
  callback: () => void
) => {
  if (R.isNil(doc)) return null;
  const hasCallback = !R.isNil(callback);
  const existingScript = doc.getElementById(scriptProps.id);
  existingScript?.remove();
  const script = doc.createElement("script");

  script.id = scriptProps.id;

  script.innerHTML =
    `${scriptProps.content}\n${existingScript ? "" : " new p5()"}` ?? "";

  doc.body.appendChild(script);
  script.onload = () => {
    if (hasCallback) callback();
  };

  if (existingScript && hasCallback) callback();
};
