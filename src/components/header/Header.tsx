import { FaMoon } from "react-icons/fa";
import styled from "styled-components";
import { useAuthStore } from "@/store/authStore";
import useAlert from "@/hooks/useAlert";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const Header = () => {
  const { isLoggedIn } = useAuthStore();
  const { showConfirm } = useAlert();
  const navigate = useNavigate();
  const { userLogout } = useAuth();

  const handleButtons = (type: "logo" | "profile" | "log") => {
    const todo = type === "log" ? (isLoggedIn ? "logout" : "login") : type;
    const buttonCase = {
      logo: () => {
        navigate("/");
      },
      profile: () => {
        navigate("/profile");
      },
      login: () => {
        navigate("/login");
      },
      logout: () => {
        showConfirm("로그아웃하시겠습니까?", () => userLogout());
      }
    };
    buttonCase[todo]();
  };

  return (
    <HeaderStyle>
      <div className="leftSection">
        <img
          onClick={() => handleButtons("logo")}
          className="logo"
          src="/src/assets/imgs/headerLogo2.png"
        />
      </div>
      <div className="rigthSection">
        {isLoggedIn && (
          <button onClick={() => handleButtons("profile")}>마이페이지</button>
        )}
        <button onClick={() => handleButtons("log")}>
          {isLoggedIn ? "로그아웃" : "로그인"}
        </button>
        <button>
          <FaMoon />
        </button>
      </div>
    </HeaderStyle>
  );
};

const HeaderStyle = styled.div`
  width: 100%;
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
    height: 100%;

    .logo {
      height: 100%;
      cursor: pointer;
    }
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
    border-radius: ${({ theme }) => theme.borderRadius.default};
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
