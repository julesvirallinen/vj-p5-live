import * as R from "ramda";
import { useCallback, useEffect, useState } from "react";
import { useCurrentSketch } from "../../hooks/useCurrentSketch";
import { useGlobalCommands } from "../../hooks/useGlobalCommands";
import { useSettings } from "../../hooks/useSettings";
import { TSrcScript } from "../../models/script";
import { useSketchCodeManager } from "./useSketchCodeManager";

export type TInnerHTMLScript = {
  id: string;
  content: string;
  shouldOverwrite?: boolean;
};

type TSketchWindowProps = {
  setup: () => void;
  frameCount: number;
  noLoop: () => void;
};

const loadScriptTags = (
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

const loadProcessingScripts = (
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

const scriptsToLoad = [
  { id: "p5js", path: "/public/js/p5.min.js" },
  {
    id: "ramda",
    path: "/public/js/ramda.min.js",
  },
  {
    id: "p5jssound",
    path: "/public/js/p5.sound.min.js",
  },
  {
    id: "webmidi",
    path: "/public/js/webmidi.min.js",
  },
];

export const useScriptLoader = (iframeRef: HTMLIFrameElement | null) => {
  const iframeContentWindow = iframeRef?.contentWindow as Window &
    TSketchWindowProps;
  const iframeDocument = iframeContentWindow?.document;
  const { setHardRecompileSketch, setRecompileSketch } = useGlobalCommands();
  const [scriptsLoaded, setScriptsLoaded] = useState<string[]>([]);
  const [userCodeLoaded, setUserCodeLoaded] = useState(false);
  const { userLoadedScripts } = useSettings();
  const { id } = useCurrentSketch();

  const sketchCode = useSketchCodeManager();

  const loadUserCode = useCallback(() => {
    console.log(scriptsLoaded);
    if (
      scriptsLoaded.length !== [...scriptsToLoad, ...userLoadedScripts].length
    )
      return;
    setUserCodeLoaded(false);
    loadProcessingScripts(
      iframeDocument,
      {
        id: "userCode",
        content: sketchCode,
        shouldOverwrite: true,
      },
      () => {
        console.log("loaded user code");
        setUserCodeLoaded(true);
      }
    );
  }, [sketchCode, iframeDocument, scriptsLoaded, userLoadedScripts]);

  const resetSketch = useCallback(() => {
    for (const item of iframeDocument?.body.getElementsByTagName("script") ??
      []) {
      item.remove;
    }
    setScriptsLoaded([]);
    setUserCodeLoaded(false);
    loadUserCode();
  }, [iframeDocument, loadUserCode]);

  const recompileSketch = useCallback(() => {
    try {
      if (iframeContentWindow && userCodeLoaded) {
        iframeContentWindow.frameCount = 0;
        iframeContentWindow.setup();
        iframeContentWindow;
      }
    } catch (error) {
      console.error((error as Error).message);
    }
  }, [iframeContentWindow, userCodeLoaded]);

  const loadScripts = useCallback(() => {
    const scriptToLoad = [...scriptsToLoad, ...userLoadedScripts].find(
      (s) => !scriptsLoaded.includes(s.id)
    );

    if (!scriptToLoad) return;

    loadScriptTags(iframeDocument, [scriptToLoad], (scriptName) =>
      setScriptsLoaded([...scriptsLoaded, scriptName])
    );
  }, [iframeDocument, scriptsLoaded, userLoadedScripts]);

  useEffect(() => {
    loadScripts();
  }, [loadScripts]);

  useEffect(() => {
    loadUserCode();
  }, [sketchCode, loadUserCode, iframeDocument, id]);

  useEffect(() => {
    setHardRecompileSketch(resetSketch);
    setRecompileSketch(recompileSketch);
  }, [
    recompileSketch,
    resetSketch,
    setHardRecompileSketch,
    setRecompileSketch,
  ]);

  return { userCodeLoaded };
};
