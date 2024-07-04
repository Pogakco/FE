import styled from "styled-components";

const NotFound = () => {
  return (
    <NotFoundStyle>
      <div className="errorNumber">404</div>
      <p>Not Found</p>
      존재하지 않는 페이지입니다.
    </NotFoundStyle>
  );
};

export const NotFoundStyle = styled.div`
  padding-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .errorNumber {
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.color.white};
    font-size: 40px;
    border-radius: 8px;
    font-weight: bold;
    margin-bottom: 20px;
    color: ${({ theme }) => theme.color.pink6};
  }
`;

export default NotFound;
