import styled from "styled-components";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { ErrorBoundary } from "react-error-boundary";
import FallbackUI from "../errorBoundary/FallbackUI";

interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <ErrorBoundary FallbackComponent={FallbackUI}>
      <LayoutStyle>
        <Header />
        <main className="main">{children}</main>
        <Footer />
      </LayoutStyle>
    </ErrorBoundary>
  );
};

const LayoutStyle = styled.div`
  display: flex;
  flex-direction: column;
  .main {
    width: 100%;
    padding: 60px 0 0 0;
    min-height: calc(100vh - 114px);
  }
`;
export default Layout;
