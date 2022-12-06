export type TCanvasWindowProps = {
  setup: () => void;
  frameCount: number;
  noLoop: () => void;
  loop: () => void;
  clear: () => void;
  getSession: () => any;
};
