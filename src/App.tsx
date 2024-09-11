import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import "@/style/font.css";
import "@/style/reset.css";
import { useEffect } from "react";
import Layout from "./components/layout/Layout";
import CustomToaster from "./components/toaster/CustomToaster";
import { useAuth } from "./hooks/mutations/useAuth";
import GoogleCallback from "./pages/GoogleCallback";
import KaKaoCallback from "./pages/KaKaoCallback";
import Main from "./pages/Main/Main";
import NotFound from "./pages/NotFound";
import RoomDetail from "./pages/RoomDetail";
import SocialSignup from "./pages/SocialSignup";
import UserLogin from "./pages/UserLogin";
import UserProfile from "./pages/UserProfile";
import UserSignup from "./pages/UserSignup";
import GlobalStyle from "./style/global";
import { light } from "./style/theme";

function App() {
  const { mutate } = useAuth();

  useEffect(() => {
    mutate();
  }, [mutate]);

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
          path: "/oauth/kakao",
          element: <KaKaoCallback />
        },
        {
          path: "/oauth/google",
          element: <GoogleCallback />
        },
        {
          path: "/social-signup",
          element: <SocialSignup />
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

  return (
    <ThemeProvider theme={light}>
      <GlobalStyle themeName="light" />
      <RouterProvider router={router} />
      <CustomToaster />
    </ThemeProvider>
  );
}

export default App;
