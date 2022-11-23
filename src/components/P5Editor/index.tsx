import React from "react";
import styled from "styled-components";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

import { useCurrentSketch } from "../../hooks/useCurrentSketch";
import { useSettingsDispatchContext } from "../../Providers/SettingsProvider";

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

  .ace_gutter-layer {
    background-color: black;
  }

  .ace_gutter-active-line {
    background-color: #2c2c2c;
  }
`;

export const P5Editor: React.FC = ({ ...restProps }) => {
  const { updateSketch, code } = useCurrentSketch();
  const dispatch = useSettingsDispatchContext();

  return (
    <StyledP5Editor
      {...restProps}
      height={"100vh"}
      width={"100vw"}
      highlightActiveLine={false}
      commands={[
        {
          // commands is array of key bindings.
          name: "commandName", //name for the key binding.
          bindKey: { win: "Ctrl-Enter", mac: "ctrl+enter" }, //key combination used for the command.
          exec: () => dispatch({ type: "resetCanvasKey" }),
        },
      ]}
      mode="java"
      theme="monokai"
      fontSize={15}
      onChange={updateSketch}
      showPrintMargin={false}
      value={code}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
    />
  );
};
