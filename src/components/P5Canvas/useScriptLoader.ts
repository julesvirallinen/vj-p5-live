import { useCallback, useEffect, useMemo, useState } from "react";
import { useGlobalCommands } from "../../hooks/useGlobalCommands";
import { useSettings } from "../../hooks/useSettings";
import { loadProcessingScripts, loadScriptTags } from "./lib/loadScripts";
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
  loop: () => void;
  clear: () => void;
};

const scriptsToLoad = [
  { id: "p5js", path: "/public/js/p5.min.js" },
  {
    id: "mapper",
    path: "/public/js/p5.mapper.min.js",
  },
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
  const iframeContentWindow = useMemo(
    () => iframeRef?.contentWindow as Window & TSketchWindowProps,
    [iframeRef?.contentWindow]
  );
  const iframeDocument = iframeContentWindow?.document;
  const { setHardRecompileSketch, setRecompileSketch } = useGlobalCommands();
  const [scriptsLoaded, setScriptsLoaded] = useState<string[]>([]);
  const [scriptsLoading, setScriptsLoading] = useState(true);
  const { userLoadedScripts } = useSettings();
  const { setCanvasMediaStream, canvasMediaStream, canvasPopupOpen } =
    useGlobalCommands();

  const sketchCode = useSketchCodeManager();

  const createCanvasStream = useCallback(() => {
    // console.log(iframeDocument, canvasPopupOpen);
    if (!canvasPopupOpen) return;

    const stream = iframeDocument?.querySelector("canvas")?.captureStream();
    // there has to be a better way
    if (!stream) {
      const retry = setInterval(function () {
        let tries = 0;
        if (iframeDocument) {
          createCanvasStream();
          clearInterval(retry);
        }
        if (tries++ > 5) {
          clearInterval(retry);
        }
      }, 500);
    }

    stream && setCanvasMediaStream(stream);
  }, [iframeDocument, setCanvasMediaStream, canvasPopupOpen]);

  const loadUserCode = useCallback(() => {
    if (
      scriptsLoaded.length !==
        [...scriptsToLoad, ...userLoadedScripts].length ||
      scriptsLoading
    )
      return;
    loadProcessingScripts(
      iframeDocument,
      {
        id: "userCode",
        content: sketchCode,
        shouldOverwrite: true,
      },
      () => {
        setScriptsLoading(false);
        createCanvasStream();
      }
    );
  }, [
    sketchCode,
    iframeDocument,
    scriptsLoaded,
    userLoadedScripts,
    scriptsLoading,
    createCanvasStream,
  ]);

  const loadScripts = useCallback(() => {
    const scriptToLoad = [...scriptsToLoad, ...userLoadedScripts].find(
      (s) => !scriptsLoaded.includes(s.id)
    );

    if (!scriptToLoad) {
      return setScriptsLoading(false);
    }

    loadScriptTags(iframeDocument, [scriptToLoad], (scriptName) =>
      setScriptsLoaded([...scriptsLoaded, scriptName])
    );
  }, [iframeDocument, scriptsLoaded, userLoadedScripts]);

  const hardCompileSketch = useCallback(() => {
    [...(iframeDocument?.body.getElementsByTagName("script") ?? [])].map((n) =>
      n.remove()
    );

    setScriptsLoaded([]);
    setScriptsLoading(true);
    // loadscripts dep needed for now, running it triggers a race condition
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iframeDocument, loadScripts]);

  const recompileSketch = useCallback(() => {
    try {
      if (iframeContentWindow) {
        iframeContentWindow.frameCount = 0;
        iframeContentWindow.setup();
        createCanvasStream();
      }
    } catch (error) {
      console.error((error as Error).message);
    }
  }, [iframeContentWindow, createCanvasStream]);

  useEffect(() => {
    loadScripts();
  }, [loadScripts]);

  useEffect(() => {
    if (!scriptsLoading) {
      loadUserCode();
      createCanvasStream();
    }
  }, [
    sketchCode,
    scriptsLoading,
    loadUserCode,
    loadScripts,
    createCanvasStream,
  ]);

  useEffect(() => {
    setHardRecompileSketch(hardCompileSketch);
    setRecompileSketch(recompileSketch);
  }, [
    recompileSketch,
    hardCompileSketch,
    setHardRecompileSketch,
    setRecompileSketch,
  ]);

  return { loading: scriptsLoading };
};
