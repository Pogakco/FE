import styled from "styled-components";
import Header from "../header/Header";
import Footer from "../footer/Footer";

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <LayoutStyle>
      <Header />
      <main className="main">{children}</main>
      <Footer />
    </LayoutStyle>
  );
};

const LayoutStyle = styled.div`
  display: flex;
  flex-direction: column;
  .main {
    width: 100%;
    min-height: calc(100vh - 114px);
  }
`;
export default Layout;
