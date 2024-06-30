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
export type TBoxShadow = "default";
export type TInputFieldSchema = "auth" | "room";
export type TBorderRadius = "default";
export type TButtonColor =
  | "default"
  | "defaultHover"
  | "active"
  | "activeHover"
  | "delete";
export type TSquareButtonSize = "large" | "medium" | "small";

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
  boxShadow: {
    [key in TBoxShadow]: string;
  };
  inputFieldSchema: {
    [key in TInputFieldSchema]: {
      height: string;
    };
  };
  borderRadius: {
    [key in TBorderRadius]: string;
  };
  buttonColor: {
    [key in TButtonColor]: {
      color: string;
      background: string;
      stroke: string;
    };
  };
  squareButtonSize: {
    [key in TSquareButtonSize]: {
      width: string;
      height: string;
      borderRadius: string;
      fontSize: string;
      fontWeight: string;
    };
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
  },
  boxShadow: {
    default: "0 0 8px 2px rgba(0, 0, 0, 0.12)"
  },
  inputFieldSchema: {
    auth: {
      height: "56px"
    },
    room: {
      height: "40px"
    }
  },
  borderRadius: {
    default: "8px"
  },
  buttonColor: {
    default: {
      color: "#808080",
      background: "#fff",
      stroke: "#808080"
    },
    defaultHover: {
      color: "#fff",
      background: "#808080",
      stroke: "#808080"
    },
    active: {
      color: "#FF8080",
      background: "#fff",
      stroke: "#FF8080"
    },
    activeHover: {
      color: "#fff",
      background: "#FF8080",
      stroke: "#FF8080"
    },
    delete: {
      color: "#fff",
      background: "#CD1818",
      stroke: "#CD1818"
    }
  },
  squareButtonSize: {
    large: {
      width: "100%",
      height: "56px",
      borderRadius: "8px",
      fontSize: "20px",
      fontWeight: "600"
    },
    medium: {
      width: "100px",
      height: "40px",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "600"
    },
    small: {
      width: "100px",
      height: "33px",
      borderRadius: "20px",
      fontSize: "16px",
      fontWeight: "400"
    }
  }
};
