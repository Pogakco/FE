import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { ErrorBoundary } from "react-error-boundary";
import FallbackUI from "../errorBoundary/FallbackUI";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const location = useLocation();
  const noFooterPaths = ["/rooms/:id"];

  const shouldShowFooter = !noFooterPaths.some((path) =>
    location.pathname.startsWith(path.replace(":id", ""))
  );

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
    min-height: calc(100vh - 114px);
  }
`;

export default Layout;
