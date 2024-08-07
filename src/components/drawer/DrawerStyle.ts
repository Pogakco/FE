import { motion } from "framer-motion";
import styled, { css } from "styled-components";

interface DrawerContainerProps {
  open: boolean;
}

export const DrawerStyle = styled(motion.div)<DrawerContainerProps>`
  height: 100vh;
  width: 425px;
  background-color: ${({ theme }) => theme.color.pink5};
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({ open }) =>
    open &&
    css`
      left: 0;
    `}
`;

export const DrawerController = styled.div`
  width: 60px;
  height: 100%;
  background-color: ${({ theme }) => theme.color.pink3};
  ul {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  li {
    width: 50px;
    height: 54px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    color: white;
    margin: 20px;
    border-radius: ${({ theme }) => theme.borderRadius.default};
    cursor: pointer;
    transition: all 0.2s;
  }
  li.active {
    background-color: ${({ theme }) => theme.color.pink6};
  }
  li:hover {
    background-color: ${({ theme }) => theme.color.pink6};
  }
`;

export const DrawerContents = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  color: white;
  padding: 30px;
`;

export const Overlay = styled(motion.div)<DrawerContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.overlay.default};
  display: ${({ open }) => (open ? "block" : "none")};
`;
