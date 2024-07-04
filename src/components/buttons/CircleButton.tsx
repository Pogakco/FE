import React from "react";
import styled from "styled-components";

type TButtonSize = "large" | "small";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  buttonSize: TButtonSize;
}
const CircleButton = ({ children, buttonSize, ...props }: Props) => {
  return (
    <CircleButtonStyle $buttonSize={buttonSize} {...props}>
      {children}
    </CircleButtonStyle>
  );
};

interface CircleButtonStyleProps {
  $buttonSize: TButtonSize;
}
const CircleButtonStyle = styled.button<CircleButtonStyleProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  width: ${({ $buttonSize }) => ($buttonSize === "large" ? "70px" : "46px")};
  height: ${({ $buttonSize }) => ($buttonSize === "large" ? "70px" : "46px")};
  color: ${({ theme }) => theme.color.pink6};
  background-color:${({ theme}) => theme.color.purewhite};
  border: 1px solid ${({ theme }) => theme.color.pink6};
  border-radius: 50%;
  transition: all 0.2s;
  svg {
    width: 40px;
    height: 40px;
  }

  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.pink6};
    border: none;
  }
`;

export default CircleButton;

