/* eslint-disable simple-import-sort/imports */

import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

import { config } from 'ace-builds';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-error_marker';
import 'ace-builds/src-noconflict/ext-searchbox';
import 'ace-builds/src-noconflict/keybinding-vscode';
import Beautify from 'ace-builds/src-noconflict/ext-beautify';

config.set(
  'basePath',
  'https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/'
);
config.setModuleUrl(
  'ace/mode/javascript_worker',
  'https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/worker-javascript.js'
);

import { FaRegEye } from 'react-icons/fa';

import { useCurrentSketch } from '../../hooks/useCurrentSketch';
import { useGlobalCommands } from '../../hooks/useGlobalCommands';
import { useSettings } from '../../hooks/useSettings';
import { Button } from '../ui/Button';

const StyledEditorWrapper = styled.div<{ $hidden: boolean }>`
  width: 100rem;
  height: 100%;

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

  .ace_gutter-layer {
    background-color: black;
  }

  .ace_fold-widget {
    background-color: black;
  }

  .ace_gutter-active-line {
    background-color: #2c2c2c;
  }

  .error_marker {
    position: absolute.;
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
  const { setCodeHasSyntaxErrors, errors } = useGlobalCommands();
  const editorRef = useRef<AceEditor>(null);

  useEffect(() => {
    Beautify.beautify(editorRef?.current?.editor.session);
  }, []);

  useEffect(() => {
    editorRef?.current?.editor.getSession().setAnnotations(
      errors.map((error) => ({
        row: error.lineNumber,
        column: 0,
        text: error.message,
        type: 'error',
      }))
    );
  }, [errors]);

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
          height={'100vh'}
          width={'100vw'}
          setOptions={{
            useWorker: true,
            highlightSelectedWord: true,
            enableBasicAutocompletion: true,
            enableSnippets: true,
          }}
          highlightActiveLine={false}
          keyboardHandler={'vscode'}
          commands={Beautify.commands}
          mode="javascript"
          ref={editorRef}
          theme="twilight"
          onLoad={(editor) => {
            // asi = disable semicolon linting in editor
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore bug in ace
            editor.session.$worker.send('changeOptions', [{ asi: true }]);
          }}
          onValidate={(annotations) => {
            const hasErrors =
              annotations.findIndex(
                (annotation) => annotation.type === 'error'
              ) >= 0;

            if (hasErrors) {
              return setCodeHasSyntaxErrors(true);
            }
            // humble attempt to stop code from running the second error is fixed, something with the debouncing is off
            // this is prone to cause insane bugs and needs to be addressed
            setTimeout(() => setCodeHasSyntaxErrors(false), 500);
          }}
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
