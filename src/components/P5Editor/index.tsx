import React from "react";
import styled from "styled-components";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

import { useCurrentSketch } from "../../hooks/useCurrentSketch";
import { useSettingsDispatchContext } from "../../Providers/SettingsProvider";
import { useGlobalCommands } from "../../hooks/useGlobalCommands";

const StyledP5Editor = styled(AceEditor)`
  background-color: transparent;
  height: 100rem;
  .ace-active-line {
    background-color: transparent;
  }

  span {
    background-color: #00000085;
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
  const { recompileSketch } = useGlobalCommands();

  return (
    <StyledP5Editor
      {...restProps}
      height={"100vh"}
      width={"100vw"}
      highlightActiveLine={false}
      commands={[
        /**
         * It seems these might be initialized on load and aren't updated, need investigation
         */
        {
          // commands is array of key bindings.
          name: "recompile canvas", //name for the key binding.
          bindKey: { win: "Ctrl-Enter", mac: "ctrl+enter" }, //key combination used for the command.
          exec: () => recompileSketch,
        },
        {
          name: "show action bar", //name for the key binding.
          bindKey: { win: "Ctrl-p", mac: "ctrl+p" }, //key combination used for the command.
          exec: () => dispatch({ type: "toggleActionBar" }),
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
