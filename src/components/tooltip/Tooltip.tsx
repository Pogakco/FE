import { motion } from "framer-motion";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

const Tooltip = ({ children }: Props) => {
  return (
    <Wrapper
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", delay: 0.3 }}
    >
      {children}
    </Wrapper>
  );
};

const Wrapper = styled(motion.div)`
  position: absolute;
  bottom: -40px;
  left: -75%;
  border-radius: 8px;
  padding: 0.25rem 0.5rem;
  white-space: nowrap;
  font-size: 14px;
  color: #fff;
  box-shadow: 0px 8px 16px -2px rgba(27, 33, 44, 0.12);
  background-color: ${({ theme }) => theme.color.pink4};

  &::after {
    content: "";
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 0px;
    height: 0px;
    border-top: 8px solid none;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid ${({ theme }) => theme.color.pink4};
  }
`;

export default Tooltip;
