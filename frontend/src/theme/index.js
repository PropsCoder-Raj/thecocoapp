// src/theme/index.js
import {
  createTheme as createMuiTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import _ from "lodash";

// Define your typography styles with unitless line heights
const typography = {
  h1: {
    fontWeight: 700,
    fontSize: "32px !important",
    fontFamily: "'Nunito Sans', sans-serif",
    lineHeight: 1.5,
    "@media(max-width:767px)": {
      fontSize: "25px !important",
      lineHeight: 1.6,
      fontWeight: 600,
    },
  },
  h2: {
    fontWeight: 700,
    fontSize: "24px !important",
    fontFamily: "'Nunito Sans', sans-serif",
    lineHeight: 1.2,
    "@media(max-width:767px)": {
      fontSize: "20px !important",
      lineHeight: 1.3,
      fontWeight: 600,
    },
  },
  h3: {
    fontWeight: 500,
    fontSize: "22px !important",
    fontFamily: "'Nunito Sans', sans-serif",
    lineHeight: 1.2,
    "@media(max-width:767px)": {
      fontSize: "20px !important",
      lineHeight: 1.3,
    },
  },
  h4: {
    fontWeight: 500,
    fontSize: "20px !important",
    fontFamily: "'Nunito Sans', sans-serif",
    lineHeight: 1.2,
    "@media(max-width:767px)": {
      fontSize: "18px !important",
      lineHeight: 1.3,
    },
  },
  h5: {
    fontWeight: 500,
    fontSize: "18px !important",
    fontFamily: "'Nunito Sans', sans-serif",
    lineHeight: 1.67,
    "@media(max-width:767px)": {
      fontSize: "16px !important",
      lineHeight: 1.3,
    },
  },
  h6: {
    fontWeight: 300,
    fontSize: "16px !important",
    fontFamily: "'Nunito Sans', sans-serif",
    lineHeight: 1.75,
    "@media(max-width:767px)": {
      fontSize: "14px !important",
      lineHeight: 1.3,
    },
  },
  overline: {
    fontWeight: 500,
    fontFamily: "'Nunito Sans', sans-serif",
  },
  button: {
    textTransform: "capitalize",
    borderRadius: 27,
    fontFamily: "'Nunito Sans', sans-serif",
  },
  body1: {
    fontSize: "20px !important",
    fontWeight: 300,
    fontFamily: "'Nunito Sans', sans-serif",
    lineHeight: 1.79,
    "@media(max-width:767px)": {
      fontSize: "18px !important",
      lineHeight: 1.67,
    },
  },
  body2: {
    fontSize: "16px !important",
    fontWeight: 400,
    fontFamily: "'Nunito Sans', sans-serif",
    lineHeight: "20px",
    "@media(max-width:767px)": {
      fontSize: "14px !important",
    },
  },
  subtitle1: {
    fontSize: "11px",
    fontFamily: "'Nunito Sans', sans-serif",
    fontWeight: 300,
    lineHeight: 1.2,
  },
};

const baseOptions = {
  direction: "ltr",
  typography,
  components: {
    // Define your component overrides here
  },
};

const themesOptions = [
  {
    name: "LIGHT",
    palette: {
      mode: "light",
      primary: {
        main: "#0B1426",
      },
      secondary: {
        main: "#0B1426",
      },
      background: {
        default: "#fff",
        paper: "#FFFFFF",
      },
      text: {
        primary: "#000000",
        secondary: "#000000",
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: "#fff",
            boxShadow: "none",
            border: "1px solid #E5E5E5",
            borderRadius: "0",
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: "#000",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          fullWidth: {
            borderRadius: "8px",
          },
          "& .MuiOutlinedInput-inputMarginDense": {
            padding: "8px 13px",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: { borderColor: "rgba(229, 229, 229, 1)" },
          root: {
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(229, 229, 229, 1)",
            },
            input: {
              padding: "11px 13px",
            },
            adornedStart: {
              paddingLeft: "0px",
            },
            adornedEnd: {
              paddingRight: "0px",
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          select: {
            padding: "11px 13px",
            textAlign: "start",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(255, 255, 255, 1)",
            borderRadius: "14px",
            boxShadow:
              "0px 2px 1px -1px rgba(0,0,0,0.06),0px 1px 1px 0px rgba(0,0,0,0.064),0px 1px 3px 0px rgba(0,0,0,0.06)",
          },
          elevation2: {
            backgroundColor: "rgba(255, 255, 255, 1)",
            borderRadius: "14px",
            boxShadow:
              "0px 2px 1px -1px rgba(0,0,0,0.06),0px 1px 1px 0px rgba(0,0,0,0.064),0px 1px 3px 0px rgba(0,0,0,0.06)",
          },
        },
      },
      MuiTable: {
        styleOverrides: {
          root: {
            borderRadius: "10px",
            border: "1px solid #E8E7E7",
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            background: "transparent",
            borderTop: "1px solid #636262",
            "&:hover": {
              backgroundColor: "none",
            },
          },
        },
      },
      MuiTableBody: {
        styleOverrides: {
          root: {
            background: "#fff",
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            borderBottom: "1px solid #E8E7E7",
            "&:hover": {
              backgroundColor: "#ffffff14",
            },
            "&:last-child": {
              borderBottom: "none",
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            padding: "16px 16px",
            fontWeight: "500",
            backgroundColor: "#0B1426",
            color: "#fff",
            whiteSpace: "pre",
            fontSize: "14px",
            textAlign: "center ",
          },
          body: {
            color: "#0B1426",
            whiteSpace: "pre",
            fontSize: "14px",
            fontWeight: "500",
            textAlign: "center",
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          list: {
            outline: "0",
            background: "#ffffff",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          containedPrimary: {
            color: "#fff",
            padding: "10px 35px",
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: "22px",
            borderRadius: "8px",
            backgroundColor: "#FE8A36",
            boxShadow: "none",
            transition: "background-color 0.4s ease, color 0.4s ease", // Smooth transition for background color and text color
            "&:hover": {
              color: "#FFFFFF", // White text color on hover
              backgroundColor: "#FE8A36", // "#00baf2", // Darker Blue background color on hover
              boxShadow: "none",
              borderBottom: "solid 5px #a25a26",
            },
            "@media(max-width:767px)": {
              padding: "10px 15px",
            },
          },
          containedSecondary: {
            backgroundColor: "#FE8A36",
            padding: "8px 27px",
            filter: "drop-shadow(0px 13px 27px rgba(0, 0, 0, 0.25))",
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: "22px",
            color: "#fff",
            borderRadius: "50px",
            border: "2px solid ",
            borderColor: "#FE8A36",
            "&:hover": {
              color: "#fff",
              background: "rgba(231, 126, 49, 1)",
              borderColor: "rgba(231, 126, 49, 1)",
              boxShadow:
                "0 1px 0 0 #fe5aeb, 0 -1px 0 0 #f4a91b, 1px 0 0 0 #fe5aeb, -1px 0 0 0 rgb(254 90 235), 1px -1px 0 0 #f4a91b, -1px 1px 0 0 rgb(254 90 235), 1px 1px 0 0 rgb(254 90 235), -1px -1px 0 0 rgb(244 168 26)",
              backgroundColor: "rgba(231, 126, 49, 1)",
            },
            "@media(max-width:767px)": {
              padding: "10px 15px",
            },
          },
          contained: {
            background: "#FE8A36",
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: "22px",
            "&.Mui-disabled": {
              backgroundColor: "rgba(0, 0, 0, 0.03) ",
            },
            "@media(max-width:767px)": {
              padding: "10px 15px",
            },
          },
          outlinedPrimary: {
            color: "#fff",
            backgroundColor: "#FE8A36",
            fontWeight: "800",
            fontSize: "16px",
            lineHeight: "22px",
            border: "2px solid #FE8A36 !important",
            "&:hover": {
              color: "#fff",
              boxShadow: "none !important",
              backgroundColor: "rgba(231, 126, 49, 1)",
            },
            "@media(max-width:767px)": {
              padding: "10px 15px",
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: "#000000",
            "& svg": {
              color: "#000000",
            },
          },
          MuiSvgIcon: {
            styleOverrides: {
              root: {
                color: "#000",
              },
            },
          },
        },
      },
    },
  },
  {
    name: "DARK",
    palette: {
      mode: "light",
      primary: {
        main: "#0B1426",
      },
      secondary: {
        main: "#0B1426",
      },
      background: {
        default: "#fff",
        paper: "#FFFFFF",
      },
      text: {
        primary: "#000000",
        secondary: "#000000",
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: "#fff",
            boxShadow: "none",
            border: "1px solid #E5E5E5",
            borderRadius: "0",
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: "#000",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          fullWidth: {
            borderRadius: "8px",
          },
          "& .MuiOutlinedInput-inputMarginDense": {
            padding: "8px 13px",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: { borderColor: "rgba(229, 229, 229, 1)" },
          root: {
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(229, 229, 229, 1)",
            },
            input: {
              padding: "11px 13px",
            },
            adornedStart: {
              paddingLeft: "0px",
            },
            adornedEnd: {
              paddingRight: "0px",
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          select: {
            padding: "11px 13px",
            textAlign: "start",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(255, 255, 255, 1)",
            borderRadius: "14px",
            boxShadow:
              "0px 2px 1px -1px rgba(0,0,0,0.06),0px 1px 1px 0px rgba(0,0,0,0.064),0px 1px 3px 0px rgba(0,0,0,0.06)",
          },
          elevation2: {
            backgroundColor: "rgba(255, 255, 255, 1)",
            borderRadius: "14px",
            boxShadow:
              "0px 2px 1px -1px rgba(0,0,0,0.06),0px 1px 1px 0px rgba(0,0,0,0.064),0px 1px 3px 0px rgba(0,0,0,0.06)",
          },
        },
      },
      MuiTable: {
        styleOverrides: {
          root: {
            borderRadius: "10px",
            border: "1px solid #E8E7E7",
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            background: "transparent",
            borderTop: "1px solid #636262",
            "&:hover": {
              backgroundColor: "none",
            },
          },
        },
      },
      MuiTableBody: {
        styleOverrides: {
          root: {
            background: "#fff",
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            borderBottom: "1px solid #E8E7E7",
            "&:hover": {
              backgroundColor: "#ffffff14",
            },
            "&:last-child": {
              borderBottom: "none",
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            padding: "16px 16px",
            fontWeight: "500",
            backgroundColor: "#0B1426",
            color: "#fff",
            whiteSpace: "pre",
            fontSize: "14px",
            textAlign: "center ",
          },
          body: {
            color: "#0B1426",
            whiteSpace: "pre",
            fontSize: "14px",
            fontWeight: "500",
            textAlign: "center",
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          list: {
            outline: "0",
            background: "#ffffff",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          containedPrimary: {
            color: "#fff",
            padding: "10px 35px",
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: "22px",
            borderRadius: "8px",
            backgroundColor: "#FE8A36",
            "&:hover": {
              color: "#fff",
              backgroundColor: "rgba(231, 126, 49, 1)",
            },
            "@media(max-width:767px)": {
              padding: "10px 15px",
            },
          },
          containedSecondary: {
            backgroundColor: "#FE8A36",
            padding: "8px 27px",
            filter: "drop-shadow(0px 13px 27px rgba(0, 0, 0, 0.25))",
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: "22px",
            color: "#fff",
            borderRadius: "50px",
            border: "2px solid ",
            borderColor: "#FE8A36",
            "&:hover": {
              color: "#fff",
              background: "rgba(231, 126, 49, 1)",
              borderColor: "rgba(231, 126, 49, 1)",
              boxShadow:
                "0 1px 0 0 #fe5aeb, 0 -1px 0 0 #f4a91b, 1px 0 0 0 #fe5aeb, -1px 0 0 0 rgb(254 90 235), 1px -1px 0 0 #f4a91b, -1px 1px 0 0 rgb(254 90 235), 1px 1px 0 0 rgb(254 90 235), -1px -1px 0 0 rgb(244 168 26)",
              backgroundColor: "rgba(231, 126, 49, 1)",
            },
            "@media(max-width:767px)": {
              padding: "10px 15px",
            },
          },
          contained: {
            background: "#FE8A36",
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: "22px",
            "&.Mui-disabled": {
              backgroundColor: "rgba(0, 0, 0, 0.03) ",
            },
            "@media(max-width:767px)": {
              padding: "10px 15px",
            },
          },
          outlinedPrimary: {
            color: "#fff",
            backgroundColor: "#FE8A36",
            fontWeight: "800",
            fontSize: "16px",
            lineHeight: "22px",
            border: "2px solid #FE8A36 !important",
            "&:hover": {
              color: "#fff",
              boxShadow: "none !important",
              backgroundColor: "rgba(231, 126, 49, 1)",
            },
            "@media(max-width:767px)": {
              padding: "10px 15px",
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: "#000000",
            "& svg": {
              color: "#000000",
            },
          },
          MuiSvgIcon: {
            styleOverrides: {
              root: {
                color: "#000",
              },
            },
          },
        },
      },
    },
  },
];

export const createTheme = (config = {}) => {
  let themeOptions = themesOptions.find((theme) => theme.name === config.theme);

  if (!themeOptions) {
    console.warn(new Error(`The theme ${config.theme} is not valid`));
    [themeOptions] = themesOptions;
  }

  let theme = createMuiTheme(
    _.merge({}, baseOptions, themeOptions, { direction: config.direction })
  );

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
};
