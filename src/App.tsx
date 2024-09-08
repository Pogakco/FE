import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import "@/style/font.css";
import "@/style/reset.css";
import { useEffect, useState } from "react";
import Layout from "./components/layout/Layout";
import PrivateLayout from "./components/layout/PrivateLayout";
import CustomToaster from "./components/toaster/CustomToaster";
import { useAuth } from "./hooks/mutations/useAuth";
import KaKaoCallback from "./pages/KaKaoCallback";
import Main from "./pages/Main/Main";
import NotFound from "./pages/NotFound";
import RoomDetail from "./pages/RoomDetail";
import SocialSignup from "./pages/SocialSignup";
import { UserCheckPassword } from "./pages/UserCheckPassword.1";
import UserLogin from "./pages/UserLogin";
import UserProfile from "./pages/UserProfile";
import UserSignup from "./pages/UserSignup";
import GlobalStyle from "./style/global";
import { light } from "./style/theme";

function App() {
  const { mutate } = useAuth();

  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);

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
          path: "/social-signup",
          element: <SocialSignup />
        },
        {
          path: "/check-password",
          element: (
            <UserCheckPassword
              onPasswordConfirmed={() => setIsPasswordConfirmed(true)}
            />
          )
        },
        {
          path: "/profile",
          element: (
            <PrivateLayout isAccess={isPasswordConfirmed}>
              <UserProfile />
            </PrivateLayout>
          )
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
