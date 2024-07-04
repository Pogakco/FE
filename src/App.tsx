import { ThemeProvider } from "styled-components";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import { light } from "./style/theme";
import GlobalStyle from "./style/global";
import UserSignup from "./pages/UserSignup";
import UserLogin from "./pages/UserLogin";
import RoomDetail from "./pages/RoomDetail";
import "@/style/reset.css";
import "@/style/font.css";
import Main from "./pages/Main";
import NotFound from "./pages/NotFound";
import { UserCheckPassword } from "./pages/UserCheckPassword.1";
import UserProfile from "./pages/UserProfile";
import Layout from "./components/layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: "/signup",
        element: <UserSignup />
      },
      {
        path: "/login",
        element: <UserLogin />
      },
      {
        path: "/check-password",
        element: <UserCheckPassword />
      },
      {
        path: "/profile",
        element: <UserProfile />
      },
      {
        path: "/",
        element: <Main />
      },
      {
        path: "/rooms/:id",
        element: <RoomDetail />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
]);

function App() {
  return (
    <ThemeProvider theme={light}>
      <GlobalStyle themeName="light" />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
