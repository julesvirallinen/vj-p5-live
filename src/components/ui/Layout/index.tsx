import styled, { css } from "styled-components";

export const Row = styled.div<{ $gap?: number }>`
  display: flex;
  flex-direction: row;

  ${(props) =>
    props.$gap &&
    css`
      gap: ${props.$gap}rem;
    `}
`;

export const Column = styled.div<{ $gap?: number }>`
  display: flex;
  flex-direction: column;

  ${(props) =>
    props.$gap &&
    css`
      gap: ${props.$gap}rem;
    `}
`;
