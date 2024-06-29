import React from "react";
import styled from "styled-components";

interface CircleButtonProps {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const CircleButton = ({ children, onClick }: CircleButtonProps) => {
  return (
    <CircleButtonStyle onClick={onClick}>
      <div className="Icon">{children}</div>
    </CircleButtonStyle>
  );
};
const CircleButtonStyle = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.color.pink6};
  transition: all 0.2s;
  cursor: pointer;

  .Icon {
    width: 40px;
    height: 40px;
    font-size: 40px;
    svg {
      color: ${({ theme }) => theme.color.pink6};
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.2s;
    }
  }
  &:hover {
    background-color: ${({ theme }) => theme.color.pink6};

    .Icon svg {
      color: ${({ theme }) => theme.color.white};
    }
  }
`;

export default CircleButton;
