export type TSrcScript = {
  path: string;
  id: string;
};

export type TInnerHTMLScript = {
  id: string;
  content: string;
  shouldOverwrite?: boolean;
};
