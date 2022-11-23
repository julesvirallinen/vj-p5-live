import * as R from "ramda";
import { useCallback, useEffect, useState } from "react";
import { useCurrentSketch } from "../../hooks/useCurrentSketch";
import { useSettingsStateContext } from "../../Providers/SettingsProvider";
import { useSketchCodeManager } from "./useSketchCodeManager";

export type TInnerHTMLScript = {
  id: string;
  content: string;
  shouldOverwrite?: boolean;
};

export type TSrcScript = {
  path: string;
  id: string;
  shouldOverwrite?: boolean;
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
  if (existingScript) {
    existingScript.innerHTML = scriptProps.content;

    return;
  }
  const script = doc.createElement("script");

  script.id = scriptProps.id;

  script.innerHTML = `${scriptProps.content}\n new p5()` ?? "";

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
    id: "beatdetection",
    path: "/src/data/js/beatDetection.js",
  },
  {
    id: "djbox",
    path: "/src/data/js/djbox.js",
  },
  {
    id: "webmidi",
    path: "/public/js/webmidi.min.js",
  },
  {
    id: "config",
    path: "/src/data/js/config_helper.js",
  },
  {
    id: "universal",
    path: "/src/data/js/universal_update.js",
  },
  {
    id: "setupMidi",
    path: "/src/data/js/setupMidi.js",
  },
  {
    id: "palette",
    path: "/src/data/js/palette.js",
  },
  {
    id: "helpers",
    path: "/src/data/js/helpers.js",
  },
  {
    id: "setupaudio",
    path: "/src/data/js/setupaudio.js",
  },
];

export const useScriptLoader = (iframeRef: HTMLIFrameElement | null) => {
  const iframeContentWindow = iframeRef?.contentWindow;
  const iframeDocument = iframeContentWindow?.document;
  const [scriptsLoaded, setScriptsLoaded] = useState<string[]>([]);
  const [userCodeLoaded, setUserCodeLoaded] = useState(false);
  const { id } = useCurrentSketch();

  const {
    internal: { lastHardCompiledAt },
  } = useSettingsStateContext();

  const sketchCode = useSketchCodeManager();

  const loadUserCode = useCallback(() => {
    console.log(iframeDocument);
    if (scriptsLoaded.length !== scriptsToLoad.length) return;
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
  }, [sketchCode, iframeDocument, scriptsLoaded]);

  const loadScripts = useCallback(() => {
    // load in order
    loadScriptTags(
      iframeDocument,
      [scriptsToLoad.find((s) => !scriptsLoaded.includes(s.id))].filter(
        Boolean
      ),
      (scriptName) => setScriptsLoaded([...scriptsLoaded, scriptName])
    );
  }, [iframeDocument, scriptsLoaded]);

  useEffect(() => {
    loadScripts();
  }, [loadScripts]);

  useEffect(() => {
    loadUserCode();
  }, [sketchCode, loadUserCode, iframeDocument, lastHardCompiledAt, id]);

  // implicitly run on lastHardCompiledAt or id change, not great :)
  useEffect(() => {
    try {
      if (iframeContentWindow && userCodeLoaded) {
        // @ts-ignore
        iframeContentWindow.frameCount = 0;
        // @ts-ignore
        iframeContentWindow.setup();
      }
    } catch (error) {
      console.error(error.message);
    }
  }, [lastHardCompiledAt, iframeContentWindow, id, userCodeLoaded]);

  return { userCodeLoaded };
};
