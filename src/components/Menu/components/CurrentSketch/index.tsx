import React from "react";
import styled from "styled-components";
import { useCurrentSketch } from "../../../../hooks/useCurrentSketch";

export interface ICurrentSketchSettingsProps {}

const StyledSketchName = styled.div`
  text-decoration: underline;
`;

const StyledCurrentSketchSettings = styled.div``;

export const CurrentSketchSettings: React.FC<ICurrentSketchSettingsProps> = ({
  ...restProps
}) => {
  const { name } = useCurrentSketch();

  return (
    <StyledCurrentSketchSettings {...restProps}>
      <StyledSketchName>{name}</StyledSketchName>
    </StyledCurrentSketchSettings>
  );
};
