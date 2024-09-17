import { ERROR_MESSAGE } from "@/constants/errorMessage";
import { NotFoundStyle } from "@/pages/NotFound";
import { useAuthStore } from "@/store/authStore";
import {
  isAuthorityError,
  isNetworkError,
  isNotFoundError,
  isServerError,
  isTimeoutError,
  isTokenError
} from "@/utils/error";
import { useEffect, useState } from "react";
import { FallbackProps } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import SquareButton from "../buttons/SquareButton";

interface IButtonProps {
  status: number;
  message: string;
  onButtonClick: () => void;
  button: string;
}

const INITIAL_STATE: IButtonProps = {
  status: 200,
  message: "",
  onButtonClick: () => {},
  button: ""
};

const FallbackUI = ({ error, resetErrorBoundary }: FallbackProps) => {
  const [button, setButton] = useState<IButtonProps>(INITIAL_STATE);
  const navigate = useNavigate();

  const { storeLogout } = useAuthStore();

  useEffect(() => {
    if (isNetworkError(error)) {
      setButton({
        status: 998,
        message: ERROR_MESSAGE[998],
        onButtonClick: () => resetErrorBoundary(),
        button: "다시 시도하기"
      });
    } else if (isTimeoutError(error)) {
      setButton({
        status: 408,
        message: ERROR_MESSAGE[408],
        onButtonClick: () => resetErrorBoundary(),
        button: "다시 시도하기"
      });
    } else if (isServerError(error)) {
      setButton({
        status: 500,
        message: ERROR_MESSAGE[500],
        onButtonClick: () => resetErrorBoundary(),
        button: "다시 시도하기"
      });
    } else if (isTokenError(error)) {
      setButton({
        status: 401,
        message: ERROR_MESSAGE[401],
        onButtonClick: () => {
          resetErrorBoundary();
          storeLogout();
          navigate("/login");
        },
        button: "로그인 이동"
      });
    } else if (isAuthorityError(error)) {
      setButton({
        status: 403,
        message: ERROR_MESSAGE[403],
        onButtonClick: () => {
          resetErrorBoundary();
          navigate(-1);
        },
        button: "뒤로가기"
      });
    } else if (isNotFoundError(error)) {
      setButton({
        status: 404,
        message: ERROR_MESSAGE[404],
        onButtonClick: () => resetErrorBoundary(),
        button: "뒤로가기"
      });
    } else {
      setButton({
        status: 1000,
        message: ERROR_MESSAGE[1000],
        onButtonClick: () => resetErrorBoundary(),
        button: "뒤로가기"
      });
    }
  }, [error, resetErrorBoundary, navigate, storeLogout]);

  return (
    <FallbackUIStyle>
      <div className="errorNumber">{button.status}</div>
      <p>{button.message}</p>
      <SquareButton
        buttonColor="active"
        buttonSize="small"
        onClick={button.onButtonClick}
      >
        {button.button}
      </SquareButton>
    </FallbackUIStyle>
  );
};

const FallbackUIStyle = styled(NotFoundStyle)`
  button {
    margin: 20px 0 0;
  }
`;

export default FallbackUI;
