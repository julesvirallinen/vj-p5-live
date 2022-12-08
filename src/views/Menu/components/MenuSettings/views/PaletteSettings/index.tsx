import React, { useState } from "react";
import { BsPencil } from "react-icons/bs";
import { FaCopy, FaSkullCrossbones } from "react-icons/fa";
import { TColorPalette } from "models/colors";
import styled, { css } from "styled-components";

import { AddPalette } from "./AddPalette";
import { PaletteDots } from "./PaletteDots";
import { usePaletteMenu } from "./usePaletteMenu";

import { Button } from "~/components/ui/Button";
import { LabelText } from "~/components/ui/Label";

export interface IPaletteSettingsProps {}

const StyledPaletteSettings = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StyledPalettes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const TitleRow = styled.div`
  display: flex;
  gap: 0.5rem;
  > svg {
    fill: ${(props) => props.theme.colors.secondary};
  }
`;

const PaletteItem = styled.div<{ $selected: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  width: fit-content;

  padding: 0.2rem;
  ${(props) =>
    props.$selected &&
    css`
      border-color: ${(props) => props.theme.colors.secondary};
      border-width: 2px;
      border-style: solid;
      border-radius: 5px;
    `}
`;

const StyledHeader = styled(LabelText)`
  font-size: 0.8rem;
  > :first-child {
    margin-right: 1rem;
  }
`;

const PaletteLabelSmall = styled(LabelText)`
  font-size: 0.5rem;
  padding: 0rem;
  margin-bottom: -0.2rem; //👀
`;

export const PaletteSettings: React.FC<IPaletteSettingsProps> = ({
  ...restProps
}) => {
  const {
    colorPalettes,
    removePalette,
    currentSketchPalette,
    setPaletteForCurrentSketch,
  } = usePaletteMenu();

  const [confirmRemove, setConfirmRemove] = useState<TColorPalette | null>(
    null
  );
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <StyledPaletteSettings {...restProps}>
      {confirmRemove && (
        <>
          <Button
            onClick={() => {
              removePalette(confirmRemove.name);
              setConfirmRemove(null);
            }}
          >
            Remove {confirmRemove.name}?
          </Button>
          <Button onClick={() => setConfirmRemove(null)}>Cancel</Button>
        </>
      )}
      <StyledHeader>
        <span>{"palettes"}</span>
        <BsPencil onClick={() => setIsEditMode(!isEditMode)} />
      </StyledHeader>
      <StyledPalettes>
        {colorPalettes.map((palette) => (
          <PaletteItem
            key={palette.name}
            $selected={currentSketchPalette === palette.name}
          >
            {isEditMode ? (
              <TitleRow>
                <LabelText>{palette.name}</LabelText>
                <FaCopy
                  size={14}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      JSON.stringify(palette.colors.join(","))
                    );
                  }}
                />
                <FaSkullCrossbones
                  size={14}
                  onClick={() => setConfirmRemove(palette)}
                />
              </TitleRow>
            ) : (
              <PaletteLabelSmall>{palette.name}</PaletteLabelSmall>
            )}

            <PaletteDots
              colors={palette.colors}
              onClick={() => setPaletteForCurrentSketch(palette.name)}
            />
          </PaletteItem>
        ))}
      </StyledPalettes>
      {isEditMode && <AddPalette />}
    </StyledPaletteSettings>
  );
};
