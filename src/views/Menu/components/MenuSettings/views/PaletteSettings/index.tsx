import React, { useState } from "react";
import { FaCopy, FaSkullCrossbones } from "react-icons/fa";
import styled, { css } from "styled-components";
import { Button } from "../../../../../../components/ui/Button";
import { LabelText } from "../../../../../../components/ui/Label";
import { TColorPalette } from "../../../../../../models/colors";
import { AddPalette } from "./AddPalette";
import { PaletteDots } from "./PaletteDots";
import { usePaletteMenu } from "./usePaletteMenu";

export interface IPaletteSettingsProps {}

const StyledPaletteSettings = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StyledPalettes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  ${(props) =>
    props.$selected &&
    css`
      * {
        color: ${(props) => props.theme.colors.secondary} !important;
      }
    `}
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
      <StyledPalettes>
        {colorPalettes.map((palette) => (
          <PaletteItem
            key={palette.name}
            $selected={currentSketchPalette === palette.name}
          >
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

            <PaletteDots
              colors={palette.colors}
              onClick={() => setPaletteForCurrentSketch(palette.name)}
            />
          </PaletteItem>
        ))}
      </StyledPalettes>
      <AddPalette />
    </StyledPaletteSettings>
  );
};
