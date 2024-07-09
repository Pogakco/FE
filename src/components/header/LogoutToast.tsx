import styled from "styled-components";
import toast, { Toast } from "react-hot-toast";

interface Props {
  t: Toast;
  callback: () => void;
}
const LogoutToast = ({ t, callback }: Props) => {
  return (
    <LogoutToastStyle>
      <div className="toast-content">
        <p>로그아웃하시겠습니까?</p>
        <div className="buttons">
          <button
            className="yes"
            onClick={() => {
              callback();
              toast.dismiss(t.id);
            }}
          >
            예
          </button>
          <button
            className="no"
            onClick={() => {
              toast.dismiss(t.id);
            }}
          >
            아니요
          </button>
        </div>
      </div>
    </LogoutToastStyle>
  );
};

const LogoutToastStyle = styled.div`
  .toast-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      margin: 0 0 10px 0;
    }

    .buttons {
      button {
        margin: 5px;
        color: white;
        border: none;
        border-radius: ${({ theme }) => theme.borderRadius.default};
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
        width: 60px;
        height: 30px;
      }
    }
    .yes {
      background-color: ${({ theme }) => theme.color.pink6};
    }
    .no {
      background-color: ${({ theme }) => theme.color.grey2};
    }
  }
`;

export default LogoutToast;
