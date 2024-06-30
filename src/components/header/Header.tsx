import { FaMoon } from "react-icons/fa";
import styled from "styled-components";

const Header = () => {
  return (
    <HeaderStyle>
      <div className="leftSection">
        <button>로고</button>
      </div>
      <div className="rigthSection">
        <button>마이페이지</button>
        <button>로그아웃</button>
        <button>
          <FaMoon />
        </button>
      </div>
    </HeaderStyle>
  );
};

const HeaderStyle = styled.div`
  width: 100vw;
  height: 60px;
  padding: 10px 20px;
  position: absolute;
  z-index: 1000;
  background-color: ${({ theme }) => theme.color.pink6};
  display: flex;
  justify-content: space-between;
  align-items: center;
  .leftSection {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .rigthSection {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  button {
    padding: 5px 10px;
    height: 40px;
    border: 1px solid ${({ theme }) => theme.color.pink6};
    border-radius: ${({ theme }) => theme.borderRadius.default};;
    font-size: ${({ theme }) => theme.fontSize.medium};
    color: ${({ theme }) => theme.color.pink6};
    cursor: pointer;
    font-weight: bold;
    transition: all 0.2s;

    svg {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &:hover {
      opacity: 0.8;
    }
  }
`;

export default Header;
