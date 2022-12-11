import * as R from 'ramda';

import { TInnerHTMLScript, TSrcScript } from '../../../models/script';

// investigate https://addyosmani.com/basket.js/ for localstorage caching

export const loadScript =
  (doc: Document) =>
  ({ id, path }: TSrcScript) => {
    return new Promise((resolve, reject) => {
      const existingScript = doc.getElementById(id);

      if (existingScript) {
        return resolve(path);
      }

      const script = doc.createElement('script');
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
  const script = doc.createElement('script');
  script.async = false;

  script.id = scriptProps.id;

  script.innerHTML =
    `${scriptProps.content}\n${existingScript ? '' : ' new p5()'}` ?? '';

  doc.body.appendChild(script);

  callback();
};
