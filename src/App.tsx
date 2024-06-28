import { ThemeProvider } from "styled-components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { light } from "./style/theme";
import GlobalStyle from "./style/global";
import UserSignup from "./pages/UserSignup";
import UserLogin from "./pages/UserLogin";
import "@/style/font.css";

const routeList = [
  { path: "/signup", element: <UserSignup /> },
  { path: "/login", element: <UserLogin /> }
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
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
