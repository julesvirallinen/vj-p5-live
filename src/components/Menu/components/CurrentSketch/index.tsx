import React from "react";
import styled from "styled-components";
import { useSettingsStateContext } from "../../../../Providers/SettingsProvider";
import { useCurrentSketchStateContext } from "../../../../Providers/SketchProvider";

export interface ICurrentSketchSettingsProps {}

const StyledCurrentSketchSettings = styled.div``;

export const CurrentSketchSettings: React.FC<ICurrentSketchSettingsProps> = ({
  ...restProps
}) => {
  const { name } = useCurrentSketchStateContext();

  if (!name) {
    return null;
  }

  return (
    <StyledCurrentSketchSettings {...restProps}>
      Current sketch
      <div>name: {name}</div>
    </StyledCurrentSketchSettings>
  );
};
