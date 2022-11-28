import { MutableRefObject, useEffect } from "react";

// adapted from https://codesandbox.io/s/outside-alerter-hooks-lmr2y?module=/src/OutsideAlerter.js&file=/src/OutsideAlerter.js:637-655

export const useClickedOutside = (
  ref: MutableRefObject<HTMLElement | null>,
  handler: () => void
) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = (event: { target: EventTarget | null }) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]);
};
