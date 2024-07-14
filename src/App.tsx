import { ThemeProvider } from "styled-components";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import { light } from "./style/theme";
import GlobalStyle from "./style/global";
import UserSignup from "./pages/UserSignup";
import UserLogin from "./pages/UserLogin";
import RoomDetail from "./pages/RoomDetail";
import "@/style/reset.css";
import "@/style/font.css";
import Main from "./pages/Main/Main";
import NotFound from "./pages/NotFound";
import { UserCheckPassword } from "./pages/UserCheckPassword.1";
import UserProfile from "./pages/UserProfile";
import Layout from "./components/layout/Layout";
import useInitialize from "./hooks/useInitialize";
import { useEffect, useState } from "react";
import Test from "./pages/Test";
import CustomToaster from "./components/toaster/CustomToaster";
import PrivateLayout from "./components/layout/PrivateLayout";

function App() {
  const { userInitializeAuth } = useInitialize();
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);

  useEffect(() => {
    userInitializeAuth();
  }, [userInitializeAuth]);

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
          path: "/test",
          element: <Test />
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
