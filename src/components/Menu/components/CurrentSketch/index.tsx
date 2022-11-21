import React from "react";
import styled from "styled-components";
import { useCurrentSketchContext } from "../../../../Providers/currentSketchProvider";

export interface ICurrentSketchSettingsProps {}

const StyledCurrentSketchSettings = styled.div``;

export const CurrentSketchSettings: React.FC<ICurrentSketchSettingsProps> = ({
  ...restProps
}) => {
  const { code } = useCurrentSketchContext();

  return (
    <StyledCurrentSketchSettings {...restProps}>
      Current sketch
      <div>Current sketch code length: {code.length}</div>
    </StyledCurrentSketchSettings>
  );
};
