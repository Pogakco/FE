import { ThemeProvider } from "styled-components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { light } from "./style/theme";
import GlobalStyle from "./style/global";
import UserSignup from "./pages/UserSignup";
import UserLogin from "./pages/UserLogin";
import RoomDetail from "./pages/RoomDetail";
import "@/style/reset.css";
import "@/style/font.css";
import Header from "./components/header/Header";
import Main from "./pages/Main";
import { UserCheckPassword } from "./pages/UserCheckPassword.1";
import UserProfile from "./pages/UserProfile";

const routeList = [
  { path: "/signup", element: <UserSignup /> },
  { path: "/login", element: <UserLogin /> },
  { path: "/roomDetail", element: <RoomDetail /> },
  { path: "/main", element: <Main /> },
  { path: "/check-password", element: <UserCheckPassword /> },
  { path: "/profile", element: <UserProfile /> }
];

const router = createBrowserRouter(
  routeList.map((route) => {
    return {
      ...route,
      errorElement: <main>error 페이지</main>
    };
  })
);

function App() {
  return (
    <ThemeProvider theme={light}>
      <GlobalStyle themeName="light" />
      <Header />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
