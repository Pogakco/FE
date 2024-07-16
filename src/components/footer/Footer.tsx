import { Link } from "react-router-dom";
import styled from "styled-components";
import { BsGithub } from "react-icons/bs";
import { RiNotionFill } from "react-icons/ri";
import FeedBack from "./FeedBack";

import logoImg from "../../assets/imgs/footerLogo.png";

const Footer = () => {
  return (
    <FooterStyle>
      <div className="footer-inner-content">
        <div className="info">
          <img className="logo" src={logoImg} />
          <div className="corp">
            뽀각코는 뽀모도로 타이머를 공유하여 같이 공부하는 서비스입니다.
          </div>
        </div>
        <div className="links">
          <FeedBack />
          <div className="icons">
            <Link to="https://github.com/Pogakco" className="i">
              <RiNotionFill />
            </Link>
            <Link to="https://github.com/Pogakco" className="i">
              <BsGithub />
            </Link>
          </div>
        </div>
      </div>
    </FooterStyle>
  );
};

const FooterStyle = styled.footer`
  width: 100%;
  height: 114px;
  padding: 0 40px;

  .footer-inner-content {
    display: flex;
    justify-content: space-between;
    padding: 10px 10px 0 10px;

    color: ${({ theme }) => theme.color.grey3};
    border-top: 1px solid ${({ theme }) => theme.color.grey1};

    .info {
      padding: 10px 32px 0;
      .logo {
        height: 40px;
      }
      .corp {
        padding: 0 0 0 12px;
        font-size: ${({ theme }) => theme.fontSize.small};
      }
    }

    .links {
      display: flex;
      flex-direction: column;
      justify-content: end;
      align-items: flex-end;

      a {
        color: inherit;
      }
      .i {
        display: inline-block;
        margin: 8px 0 0 10px;
        svg {
          width: 24px;
          height: 24px;
        }
      }
    }
  }
`;

export default Footer;
