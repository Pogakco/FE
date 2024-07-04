import { Link } from "react-router-dom";
import styled from "styled-components";
import { BsGithub } from "react-icons/bs";

const Footer = () => {
  return (
    <FooterStyle>
      <div className="footer-inner-content">
        <div className="info">
          <div className="logo">Pogakco</div>
          <div className="corp">@ Pogakco Team.</div>
        </div>
        <div className="links">
          <Link to="">팀 소개</Link>
          <Link to="">뽀각코 팀에게 피드백 전달하기</Link>
          <Link to="https://github.com/Pogakco" className="i-github">
            <BsGithub />
          </Link>
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

    .links {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      a {
        color: inherit;
      }
      .i-github {
        margin: 10px;

        svg {
          width: 24px;
          height: 24px;
        }
      }
    }
  }
`;
export default Footer;
