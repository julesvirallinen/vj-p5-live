import React from "react";
import styled from "styled-components";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/keybinding-vscode";

import { useCurrentSketch } from "../../hooks/useCurrentSketch";

const StyledEditorWrapper = styled.div`
  span {
    background-color: ${(props) => `${props.theme.editor.textBackground}`};
    color: ${(props) => `${props.theme.editor.textColor}`};
  }
`;

const StyledP5Editor = styled(AceEditor)`
  background-color: transparent;
  height: 100rem;
  .ace-active-line {
    background-color: transparent;
  }

  .ace_gutter-layer {
    background-color: black;
  }

  .ace_fold-widget {
    background-color: black;
  }

  .ace_gutter-active-line {
    background-color: #2c2c2c;
  }
`;

export const P5Editor: React.FC = ({ ...restProps }) => {
  const { updateSketch, code } = useCurrentSketch();

  return (
    <StyledEditorWrapper>
      <StyledP5Editor
        {...restProps}
        height={"100vh"}
        width={"100vw"}
        highlightActiveLine={false}
        keyboardHandler={"vscode"}
        mode="javascript"
        theme="monokai"
        fontSize={15}
        onChange={updateSketch}
        showPrintMargin={false}
        value={code}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
      />
    </StyledEditorWrapper>
  );
};
