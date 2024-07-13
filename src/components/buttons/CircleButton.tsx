import { TButtonColor } from "@/style/theme";
import React from "react";
import styled from "styled-components";

type TButtonSize = "large" | "small";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonColor: Extract<TButtonColor, "active" | "delete">;
  children: React.ReactNode;
  buttonSize: TButtonSize;
}
const CircleButton = ({ children, buttonSize, buttonColor, ...props }: Props) => {
  return (
    <CircleButtonStyle $buttonSize={buttonSize} 
    $buttonColor={buttonColor}
    {...props}>
      {children}
    </CircleButtonStyle>
  );
};

interface CircleButtonStyleProps {
  $buttonSize: TButtonSize;
  $buttonColor : TButtonColor;
}
const CircleButtonStyle = styled.button<CircleButtonStyleProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  width: ${({ $buttonSize }) => ($buttonSize === "large" ? "70px" : "46px")};
  height: ${({ $buttonSize }) => ($buttonSize === "large" ? "70px" : "46px")};
  color: ${({ theme, $buttonColor }) => theme.buttonColor[$buttonColor].color};
  background-color: ${({ theme, $buttonColor }) =>
    theme.buttonColor[$buttonColor].background};
  border: 1px solid
    ${({ theme, $buttonColor }) => theme.buttonColor[$buttonColor].stroke};
  border-radius: 50%;
  transition: all 0.2s;
  svg {
    width: 40px;
    height: 40px;
  }

  cursor: pointer;
  &:hover {
    color: ${({ theme, $buttonColor }) => theme.buttonColor[`${$buttonColor}Hover`]?.color};
    background-color: ${({ theme, $buttonColor }) => theme.buttonColor[`${$buttonColor}Hover`]?.background};
  }
`;

export default CircleButton;

