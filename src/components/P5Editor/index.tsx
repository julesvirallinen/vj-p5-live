import React, { useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/keybinding-vscode";
import Beautify from "ace-builds/src-noconflict/ext-beautify";

import { useCurrentSketch } from "../../hooks/useCurrentSketch";
import { useSettings } from "../../hooks/useSettings";
import { Button } from "../ui/Button";
import { FaRegEye } from "react-icons/fa";

const StyledEditorWrapper = styled.div<{ $hidden: boolean }>`
  ${(props) =>
    props.$hidden &&
    css`
      display: none;
    `}

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

const StyledShowEditorButton = styled(Button)`
  position: fixed;
  top: 1rem;
  left: 1rem;
`;

export const P5Editor: React.FC = ({ ...restProps }) => {
  const { updateSketch, code } = useCurrentSketch();
  const { hideEditor, toggleHideEditor } = useSettings();
  const editorRef = useRef<AceEditor>(null);

  useEffect(() => {
    Beautify.beautify(editorRef?.current?.editor.session);
  }, []);

  return (
    <>
      {hideEditor && (
        <StyledShowEditorButton onClick={toggleHideEditor}>
          <FaRegEye />
        </StyledShowEditorButton>
      )}
      <StyledEditorWrapper $hidden={hideEditor}>
        <StyledP5Editor
          {...restProps}
          height={"100vh"}
          width={"100vw"}
          setOptions={{ useWorker: false }}
          highlightActiveLine={false}
          keyboardHandler={"vscode"}
          commands={Beautify.commands}
          mode="javascript"
          ref={editorRef}
          theme="monokai"
          fontSize={15}
          onChange={updateSketch}
          showPrintMargin={false}
          value={code}
          name="p5_editor"
          editorProps={{ $blockScrolling: true }}
        />
      </StyledEditorWrapper>
    </>
  );
};
