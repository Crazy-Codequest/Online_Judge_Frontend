import { createTheme } from "@mui/material/styles";

const lightPalette = {
  primary: {
    main: "rgb(169, 161, 162)",
  },
  secondary: {
    main: "#E6EEF2",
    dark: "#CFDDE5",
  },
  text: {
    primary: "rgb(30, 28, 28)",
    secondary: "#A0A0A0",
  },
  border: {
    primary: "rgb(169, 161, 162)",
  },
  background: {
    main: "#fff",
  },
};

const darkPalette = {
  primary: {
    main: "rgb(120, 120, 120)",
  },
  secondary: {
    main: "#1E1E1E",
    dark: "#121212",
  },
  text: {
    primary: "rgb(230, 230, 230)",
    secondary: "#B0B0B0",
  },
  border: {
    primary: "rgb(43, 41, 41)",
  },
  background: {
    main: "rgb(22, 27, 34)",
  },
};

export function setUpTheme(mode) {
 const palette = 
    mode === "dark" ? {
      mode,
      ...darkPalette
    }: {
      mode,
      ...lightPalette
    }  
    return createTheme({
      palette,
      typography: {
        padding: 0,
        margin: 0,
        htmlFontSize: 10,
        h2: {
          fontSize: "5rem",
        },
        body1: {
          fontSize: "1.4rem",
        },
        body2: {
          fontSize: "1.2rem",
        },
        body3: {
          fontSize: "1.25rem",
        },
        body4: {
          fontSize: "1.6rem",
        },
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: ({ typography, palette }) => `
          .main-nav-link {
            display: flex;
            padding: 1rem;
            text-decoration: none;
            color: ${palette.text.primary};
          }
            .violet-gradient {
              background: #804dee;
              background: linear-gradient(-90deg, #804dee 0%, rgba(60, 51, 80, 0) 100%);
              background: -webkit-linear-gradient(
                -90deg,
                #804dee 0%,
                rgba(60, 51, 80, 0) 100%
              );
            }
          .bg-hero-pattern {
            background-image: url('../../assets/herobg.png');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
          }
           html, body {
            padding: 0;
            margin: 0;
            font-size: 62.5%;
            background-color: ${palette.background.primary};
            overflow-x: hidden;
          }
          .custom-toast {
            font-size: 1.2rem;
          }
        `,
        },
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 5,
              textTransform: "none",
              "&.MuiButton-sizeMedium": {
                fontSize: "1.6rem",
              },
            },
          },
          defaultProps: {
            variant: "outlined",
            disableElevation: true,
            size: "small",
          },
        },
        MuiTextField: {
          defaultProps: {
            variant: "outlined",
            size: "small",
          },
        },
        MuiStack: {
          defaultProps: {
            gap: 2,
          },
        },
        MuiChip: {
          styleOverrides: {
            root: {
              borderRadius: 5,
              paddingInline: "3px",
            },
          },
          defaultProps: {
            size: "small",
            color: "default",
          },
        },
      },
    });
}
