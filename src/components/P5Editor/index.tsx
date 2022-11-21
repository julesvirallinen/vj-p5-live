import React from "react";
import styled from "styled-components";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-iplastic";
import "ace-builds/src-noconflict/ext-language_tools";

export interface IP5EditorProps {
  code: string;
  setCode: (code: string) => void;
}

const StyledP5Editor = styled(AceEditor)`
  background-color: transparent;
  height: 100rem;
  .ace-active-line {
    background-color: transparent;
  }

  span {
    background-color: #3a3a3a;
    color: #c2c1c1;
  }
`;

export const P5Editor: React.FC<IP5EditorProps> = ({
  code,
  setCode,
  ...restProps
}) => {
  function onChange(newValue: string) {
    console.log("change", newValue);
  }
  return (
    <StyledP5Editor
      {...restProps}
      height={"100vh"}
      width={"100vw"}
      highlightActiveLine={false}
      mode="java"
      theme="iplastic"
      onChange={setCode}
      showPrintMargin={false}
      value={code}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
    ></StyledP5Editor>
  );
};
