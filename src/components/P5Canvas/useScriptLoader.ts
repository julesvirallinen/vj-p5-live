import * as R from "ramda";
import { useCallback, useEffect, useState } from "react";
import { useCurrentSketch } from "../../hooks/useCurrentSketch";
import { useSettingsStateContext } from "../../Providers/SettingsProvider";
import { useSketchCodeManager } from "./useSketchCodeManager";

export type TInnerHTMLScript = {
  type: "innerHTML";
  id: string;
  content?: string;
  shouldOverwrite?: boolean;
};

export type TSrcScript = {
  type: "path";
  path: string;
  id: string;
  shouldOverwrite?: boolean;
};

const loadScriptTags = (
  doc: Document | undefined,
  scriptProps: TSrcScript,
  callback: () => void
) => {
  if (R.isNil(doc)) return null;
  const hasCallback = !R.isNil(callback);
  const existingScript = doc.getElementById(scriptProps.id);

  if (!existingScript) {
    const script = doc.createElement("script");
    script.id = scriptProps.id;
    script.src = scriptProps.path;
    doc.body.appendChild(script);
    script.onload = () => {
      if (hasCallback) callback();
    };
  }
  if (existingScript && hasCallback) callback();
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

  script.innerHTML = scriptProps.content ?? "";

  doc.body.appendChild(script);
  script.onload = () => {
    if (hasCallback) callback();
  };

  if (existingScript && hasCallback) callback();
};

export const useScriptLoader = (iframeRef: HTMLIFrameElement | null) => {
  const iframeContentWindow = iframeRef?.contentWindow;
  const iframeDocument = iframeContentWindow?.document;
  const [p5loaded, setP5loaded] = useState(false);
  const [userCodeLoaded, setUserCodeLoaded] = useState(false);
  const { id } = useCurrentSketch();

  const {
    internal: { lastHardCompiledAt },
  } = useSettingsStateContext();

  const sketchCode = useSketchCodeManager();

  const loadUserCode = useCallback(() => {
    setUserCodeLoaded(false);
    loadProcessingScripts(
      iframeDocument,
      {
        id: "userCode",
        type: "innerHTML",
        content: sketchCode,
        shouldOverwrite: true,
      },
      () => {
        console.log("loaded user code");
        setUserCodeLoaded(true);
      }
    );
  }, [sketchCode, iframeDocument]);

  const loadScripts = useCallback(() => {
    loadScriptTags(
      iframeDocument,
      {
        id: "p5jssound",
        path: "/public/js/p5sound.min.js",
        type: "path",
      },
      () => {
        loadUserCode();
      }
    );
  }, [iframeDocument, loadUserCode]);

  const loadP5js = useCallback(() => {
    loadScriptTags(
      iframeDocument,
      { id: "p5js", path: "/public/js/p5.min.js", type: "path" },
      () => {
        setP5loaded(true);
        loadScripts();
      }
    );
  }, [iframeDocument, loadScripts]);

  useEffect(() => {
    loadP5js();
  }, [loadP5js]);

  useEffect(() => {
    loadUserCode();
  }, [
    sketchCode,
    p5loaded,
    loadP5js,
    loadUserCode,
    iframeDocument,
    lastHardCompiledAt,
    id,
  ]);

  // implicitly run on lastHardCompiledAt or id change, not great :)
  useEffect(() => {
    if (iframeContentWindow && userCodeLoaded) {
      // @ts-ignore
      iframeContentWindow.frameCount = 0;
      // @ts-ignore
      iframeContentWindow.setup();
    }
  }, [lastHardCompiledAt, iframeContentWindow, id, userCodeLoaded]);

  return { userCodeLoaded };
};
