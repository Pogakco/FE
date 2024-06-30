import { TButtonColor, TSquareButtonSize } from "@/style/theme";
import React from "react";
import styled from "styled-components";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonColor: Extract<TButtonColor, "default" | "active" | "delete">;
  buttonSize: TSquareButtonSize;
  children: React.ReactNode;
}
const SquareButton = ({
  buttonColor,
  buttonSize,
  children,
  ...props
}: Props) => {
  return (
    <SquareButtonStyle
      $buttonColor={buttonColor}
      $buttonSize={buttonSize}
      {...props}
    >
      <h1>{children}</h1>
    </SquareButtonStyle>
  );
};

interface SquareButtonStyleProps {
  $buttonColor: TButtonColor;
  $buttonSize: TSquareButtonSize;
}
export const SquareButtonStyle = styled.button<SquareButtonStyleProps>`
  color: ${({ theme, $buttonColor }) => theme.buttonColor[$buttonColor].color};
  background-color: ${({ theme, $buttonColor }) =>
    theme.buttonColor[$buttonColor].background};
  border: 1px solid
    ${({ theme, $buttonColor }) => theme.buttonColor[$buttonColor].stroke};

  width: ${({ theme, $buttonSize }) =>
    theme.squareButtonSize[$buttonSize].width};
  height: ${({ theme, $buttonSize }) =>
    theme.squareButtonSize[$buttonSize].height};
  border-radius: ${({ theme, $buttonSize }) =>
    theme.squareButtonSize[$buttonSize].borderRadius};

  h1 {
    font-weight: ${({ theme, $buttonSize }) =>
      theme.squareButtonSize[$buttonSize].fontWeight};
    font-size: ${({ theme, $buttonSize }) =>
      theme.squareButtonSize[$buttonSize].fontSize};
  }

  &:hover {
    color: ${({ theme, $buttonColor }) =>
      theme.buttonColor[`${$buttonColor}Hover`]?.color ||
      theme.buttonColor[$buttonColor].color};
    background-color: ${({ theme, $buttonColor }) =>
      theme.buttonColor[`${$buttonColor}Hover`]?.background ||
      theme.buttonColor[$buttonColor].background};
    border: 1px solid
      ${({ theme, $buttonColor }) =>
        theme.buttonColor[`${$buttonColor}Hover`]?.stroke ||
        theme.buttonColor[$buttonColor].stroke};
  }

  cursor: pointer;
`;
export default SquareButton;
