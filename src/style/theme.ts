export type TThemeName = "light" | "dark";
export type TColor =
  | "pink1"
  | "pink2"
  | "pink3"
  | "pink4"
  | "pink5"
  | "pink6"
  | "grey1"
  | "grey2"
  | "grey3"
  | "grey4"
  | "white" // #fff 대신
  | "black"; // #000 대신
export type TLayoutWidth = "screen" | "auth" | "modal";
export type TFontSize = "title" | "large" | "medium" | "small";

interface ITheme {
  name: TThemeName;
  color: {
    [key in TColor]: string;
  };
  layoutWidth: {
    [key in TLayoutWidth]: string;
  };
  fontSize: {
    [key in TFontSize]: string;
  };
}

export const light: ITheme = {
  name: "light",
  color: {
    pink1: "#FFF2F2",
    pink2: "#FFE6E6",
    pink3: "#FFCCCC",
    pink4: "#FFB3B3",
    pink5: "#FF9999",
    pink6: "#FF8080",

    grey1: "#E1E1E1",
    grey2: "#D9D9D9",
    grey3: "#808080",
    grey4: "#4F4F4F",

    white: "#F8F9FA",
    black: "#333333"
  },
  layoutWidth: {
    screen: "1045px",
    auth: "334px",
    modal: "375px"
  },
  fontSize: {
    title: "24px",
    large: "20px",
    medium: "16px",
    small: "13px"
  }
};
