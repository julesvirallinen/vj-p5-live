import * as R from "ramda";
import { useCallback, useEffect, useState } from "react";
import { useCurrentSketch } from "../../hooks/useCurrentSketch";
import {
  useSettingsDispatchContext,
  useSettingsStateContext,
} from "../../Providers/SettingsProvider";
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

const resetSketch = (doc: Document | undefined, callback: () => void) => {
  if (R.isNil(doc)) return null;
  const main = doc.getElementsByTagName("main")[0];
  doc.getElementsByTagName("main")[0]?.remove();
  for (const tag of doc.getElementsByTagName("script")) {
    tag.remove();
  }

  const script = doc.createElement("script");
  script.innerHTML = `setup()`;
  script.id = "setupCaller";

  doc.body.appendChild(script);
  doc.body.append(main);
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
  const script = doc.createElement("script");

  if (scriptProps?.shouldOverwrite && existingScript) {
    existingScript.innerHTML = scriptProps?.content ?? "";
    console.log("replaced user code");
    existingScript.onload = () => {
      if (hasCallback) callback();
    };
  }
  script.innerHTML = scriptProps.content ?? "";

  doc.body.appendChild(script);
  script.onload = () => {
    if (hasCallback) callback();
  };

  if (existingScript && hasCallback) callback();
};

export const useScriptLoader = (iframeDocument: Document | undefined) => {
  const [p5loaded, setP5loaded] = useState(false);
  const [useCodeLoaded, setUserCodeLoaded] = useState(false);
  const { id } = useCurrentSketch();

  const {
    internal: { lastHardCompiledAt },
  } = useSettingsStateContext();

  const sketchCode = useSketchCodeManager();

  const resetSketchCallback = useCallback(() => {
    if (!useCodeLoaded) return;
    console.log("restr");
    resetSketch(iframeDocument, () => {
      console.log("reset sketch");
    });
  }, [useCodeLoaded, iframeDocument]);

  const loadUserCode = useCallback(() => {
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

  const loadP5js = useCallback(() => {
    loadScriptTags(
      iframeDocument,
      { id: "p5js", path: "/public/js/p5.min.js", type: "path" },
      () => {
        console.log("loaded p5js");
        setP5loaded(true);
      }
    );
  }, [iframeDocument]);

  useEffect(() => {
    console.log(iframeDocument?.body);
    !p5loaded && loadP5js();
    loadUserCode();
  }, [sketchCode, id, p5loaded, loadP5js, loadUserCode, iframeDocument]);

  useEffect(() => {
    resetSketchCallback();
  }, [resetSketchCallback, lastHardCompiledAt, id]);
};
