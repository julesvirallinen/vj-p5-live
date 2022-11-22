import React from "react";
import styled from "styled-components";
import { useSettingsStateContext } from "../../../../hooks/useSettings";
import { useCurrentSketchContext } from "../../../../Providers/currentSketchProvider";

export interface ICurrentSketchSettingsProps {}

const StyledCurrentSketchSettings = styled.div``;

export const CurrentSketchSettings: React.FC<ICurrentSketchSettingsProps> = ({
  ...restProps
}) => {
  const { sketch } = useCurrentSketchContext();
  const { sketches } = useSettingsStateContext();

  if (!sketch) {
    return null;
  }

  return (
    <StyledCurrentSketchSettings {...restProps}>
      Current sketch
      <div>name: {sketch.name}</div>
      {sketches.join("\n")}
    </StyledCurrentSketchSettings>
  );
};
