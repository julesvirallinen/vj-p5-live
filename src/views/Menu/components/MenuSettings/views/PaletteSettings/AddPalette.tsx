import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { usePaletteMenu } from "./usePaletteMenu";
import { TColorCode, TColorPalette } from "../../../../../../models/colors";
import { Input } from "../../../../../../components/ui/Input";
import { Button } from "../../../../../../components/ui/Button";
import * as R from "ramda";
import {
  BsFillCircleFill,
  BsFillExclamationCircleFill,
  BsSlashCircle,
} from "react-icons/bs";
import { PaletteDots } from "./PaletteDots";

export interface IAddPaletteProps {}

const sanitizeId = (id: string) => id.replace(/[^A-Za-z_-]+/g, "");

const isHexColor = (hex: string): hex is TColorCode => {
  if (typeof hex !== "string") return false;
  if (hex[0] !== "#") return false;
  const hexPart = R.drop(1, hex);

  return hexPart.length === 6 && !isNaN(Number("0x" + hexPart));
};

const StyledAddPalette = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const AddPalette: React.FC<IAddPaletteProps> = ({ ...restProps }) => {
  const { addPalette } = usePaletteMenu();
  const [nameInput, setNameInput] = useState("");
  const [hexCodeInput, setHexCodeInput] = useState("");
  const [parsedColors, setParsedColors] = useState<(TColorCode | null)[]>([]);

  useEffect(() => {
    if (hexCodeInput === "") return setParsedColors([]);
    const codes = R.pipe(
      R.split(","),
      R.map(R.trim),
      R.map(R.replace(/['"]+/g, "")),
      (codes: string[]) => codes.map((c) => (isHexColor(c) ? c : null))
    )(hexCodeInput);
    setParsedColors(codes);
  }, [hexCodeInput]);

  const handleFormSubmit = () => {
    addPalette(nameInput, parsedColors.filter(Boolean) as TColorCode[]);
    setNameInput("");
    setHexCodeInput("");
  };

  return (
    <StyledAddPalette {...restProps}>
      <Input
        label="name"
        onChange={(e) => setNameInput(sanitizeId(e))}
        value={nameInput}
      ></Input>
      <Input
        label="Hex codes, comma delimited"
        value={hexCodeInput}
        onChange={setHexCodeInput}
      ></Input>
      <PaletteDots colors={parsedColors} />
      {hexCodeInput.length > 0 && nameInput.length > 0 && (
        <Button onClick={handleFormSubmit}>Add</Button>
      )}
    </StyledAddPalette>
  );
};
