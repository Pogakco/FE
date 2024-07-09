import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}
const Title = ({ children }: Props) => {
  return (
    <TitleStyle>
      <h1>{children}</h1>
    </TitleStyle>
  );
};

const TitleStyle = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.color.grey1};

  h1 {
    font-size: ${({ theme }) => theme.fontSize.title};
    font-weight: 700;
    padding: 0 0 20px 0;
    text-align: center;
  }
`;
export default Title;
