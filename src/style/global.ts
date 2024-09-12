import { createGlobalStyle } from "styled-components";
import { TThemeName } from "./theme";

interface Props {
  themeName: TThemeName;
}
const GlobalStyle = createGlobalStyle<Props>`
  *, *::before, *::after {
        box-sizing: border-box;
  }

  body, button {
      font-family: "Pretendard Variable", Pretendard, Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
      font-weight: 400;
      font-size: 16px;
      line-height: 1.6;

      margin: 0;
      padding: 0;
      color: ${({ themeName }) =>
        themeName === "light" ? "#333333" : "#F8F9FA"};
      background-color: ${({ themeName }) =>
        themeName === "light" ? "#F8F9FA" : "#333333"};
  }

  button {
    border: none;
    cursor: pointer;
 
  }

  h1 {
      margin: 0;
  }
  

  fieldset {
    border: 0;
    padding: 0;
    margin: 0;
  }


`;

export default GlobalStyle;
