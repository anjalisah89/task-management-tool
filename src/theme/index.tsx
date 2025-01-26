import { createTheme } from "@mui/material";
import MuiChip from "./components/MuiChip";
import MuiListItemIcon from "./components/MuiListItemIcon";
import MuiTextField from "./components/MuiTextField";
import typography from "./typography";

let theme = createTheme({
  // For default theme customization
  palette: {
    primary: {
      main: "#7B1984",
      contrastText: "#fff",
    },
    background: {
      default: "#ffffff",
      paper: "#FFF9F9",
    },
    text: {
      primary: "#292929",
      secondary: "#656565",
      placeholder: "#8A8A8A",
      white: "#ffffff",
      link: "#407BFF",
    },
    chip: {
      background: "#E9E9E9",
      text: "#676767",
    },
    border: {
      box: "#ABABAB", // BoxBorder
      container: "#E1E1E1", // BoxBorderLight
      disabled: "#CDCDCD", // DisabledBoxBorder
    },
  },
  components: {
    MuiChip,
    MuiTextField,
    MuiListItemIcon,
  },
  typography,
});

theme = createTheme(theme, {
  // Custom colors with augmented theme
  palette: {
    pink: theme.palette.augmentColor({
      color: {
        main: "#FAC3FF",
        contrastText: "#000000",
      },
      name: "pink",
    }),
    green: theme.palette.augmentColor({
      color: {
        main: "#A2D6A0",
        contrastText: "#000000",
      },
      name: "green",
    }),
    blue: theme.palette.augmentColor({
      color: {
        main: "#85D9F1",
        contrastText: "#000000",
      },
      name: "blue",
    }),
    gray: theme.palette.augmentColor({
      color: {
        main: "#F1F1F1",
        contrastText: "#000000",
      },
      name: "gray",
    }),
    white: theme.palette.augmentColor({
      color: {
        main: "#ffffff",
        contrastText: "#0D0D0D",
      },
      name: "white",
    }),
    black: theme.palette.augmentColor({
      color: {
        main: "#292929",
        contrastText: "#ffffff",
      },
      name: "black",
    }),
  },
});

export default theme;
