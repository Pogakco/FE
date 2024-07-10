import styled from "styled-components";

const Loading = () => {
  return (
    <LoadingWrapper>
      <LoadingStyle>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </LoadingStyle>
    </LoadingWrapper>
  );
};

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  animation: fadeIn 0.4s ease-in 0.6s forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

const LoadingStyle = styled.div`
  display: flex;
  gap: 5px;
  @keyframes dotFlashing {
    0% {
      background-color: ${({ theme }) => theme.color.pink6};
      scale: 1;
    }
    50% {
      background-color: ${({ theme }) => theme.color.pink3};
      scale: 0.8;
    }
    100% {
      background-color: ${({ theme }) => theme.color.pink6};
      scale: 1;
    }
  }

  .dot {
    width: 10px;
    height: 10px;
    display: inline-block;
    animation: dotFlashing 1s infinite linear;
    border-radius: 10px;
  }

  .dot:nth-child(1) {
    animation-delay: 0s;
  }

  .dot:nth-child(2) {
    animation-delay: 0.4s;
  }

  .dot:nth-child(3) {
    animation-delay: 0.6s;
  }
`;

export default Loading;
