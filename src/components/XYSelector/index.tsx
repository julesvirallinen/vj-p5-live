import React, { FC, MouseEventHandler, useEffect, useRef } from "react";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";

interface IXYSelectorProps {
  xValue: number;
  yValue: number;
  onChange: (x: number, y: number) => void;
}

const StyledSelector = styled.div`
  position: relative;
  width: 4rem;
  height: 4rem;

  border: 1px solid ${(props) => props.theme.colors.secondary};
`;

const StyledPointer = styled.div`
  position: absolute;
  background-color: white;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  top: 50%;
  left: 50%;
`;

const AnimatedPointer = animated(StyledPointer);

export const XYSelector: FC<IXYSelectorProps> = ({
  xValue,
  yValue,
  onChange,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const height = ref?.current?.offsetHeight;
    console.log("Input height", height);
  }, [ref]);

  const imageClick: MouseEventHandler<HTMLImageElement> = (e) => {
    const offset = ref?.current?.getBoundingClientRect();
    if (!offset) {
      return;
    }
    console.log(e.pageX, e.pageX);
    const x =
      Math.floor(((e.pageX - offset.left) / offset.width) * 10000) / 100;
    const y =
      Math.floor(((e.pageY - offset.top) / offset.height) * 10000) / 100;
    onChange(x, y);
  };

  const styles = useSpring({
    top: `${yValue}%`,
    left: `${xValue}%`,
  });

  console.log(xValue, yValue);

  return (
    <StyledSelector onClick={imageClick} ref={ref}>
      <AnimatedPointer style={styles} />
    </StyledSelector>
  );
};
