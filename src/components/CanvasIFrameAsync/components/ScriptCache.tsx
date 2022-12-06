export class ScriptCache {
  scriptTag(src: string, cb: () => void) {
    return new Promise((resolve, reject) => {
      let resolved = false;
      let errored = false;
      const body = document.getElementsByTagName("body")[0];
      const tag = document.createElement("script");

      tag.type = "text/javascript";
      tag.async = false; // Load in order

      const handleCallback = (tag.onreadystatechange = function () {
        if (resolved) return handleLoad();
        if (errored) return handleReject();
        const state = tag.readyState;
        if (state === "complete") {
          handleLoad();
        } else if (state === "error") {
          handleReject();
        }
      });

      const handleLoad = (evt?) => {
        resolved = true;
        resolve(src);
      };
      const handleReject = (evt?) => {
        errored = true;
        reject(src);
      };

      tag.addEventListener("load", handleLoad);
      tag.addEventListener("error", handleReject);
      tag.src = src;
      body.appendChild(tag);
      return tag;
    });
  }
}
