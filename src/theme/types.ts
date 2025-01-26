import { Components, Theme } from "@mui/material";

// Utility type to extract the type of a specific component like MuiChip from the Components object
export type MuiThemeComponentType<T extends keyof Components<Theme>> =
  Components<Theme>[T];

declare module "@mui/material/styles" {
  // Extend the Palette interface for custom colors
  interface Palette {
    blue: Palette["primary"];
    white: Palette["primary"];
    black: Palette["primary"];
    pink: Palette["primary"];
    green: Palette["primary"];
    gray: Palette["primary"];
    border: {
      box: string;
      container: string;
      disabled: string;
    };
    chip: {
      background: string;
      text: string;
    };
  }

  // Extend the PaletteOptions interface for custom color options
  interface PaletteOptions {
    blue?: PaletteOptions["primary"];
    white?: PaletteOptions["primary"];
    black?: PaletteOptions["primary"];
    pink?: PaletteOptions["primary"];
    green?: PaletteOptions["primary"];
    gray?: PaletteOptions["primary"];
    border?: {
      box: string;
      container: string;
      disabled: string;
    };
    chip?: {
      background: string;
      text: string;
    };
  }

  // Extend the TypeText interface for custom text colors
  interface TypeText {
    placeholder: string;
    white: string;
    black: string;
    link: string;
  }

  // Extend the TypeTextOptions interface for custom text options
  interface TypeTextOptions {
    placeholder?: string;
    white?: string;
    black?: string;
    link?: string;
  }
}

// Extend the Typography interface for custom font weight
declare module "@mui/material/styles/createTypography" {
  interface TypographyOptions {
    fontWeightSemiBold?: number;
  }

  interface Typography {
    fontWeightSemiBold: number;
  }
}

// Extend ButtonPropsColorOverrides for custom colors
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    blue: true;
    white: true;
    black: true;
    pink: true;
    green: true;
    gray: true;
  }
}

// Extend LinkPropsColorOverrides for custom colors
declare module "@mui/material/Link" {
  interface LinkPropsColorOverrides {
    blue: true;
    white: true;
    black: true;
    pink: true;
    green: true;
    gray: true;
  }
}

// Extend TypographyPropsColorOverrides for custom colors
declare module "@mui/material/Typography" {
  interface TypographyPropsColorOverrides {
    blue: true;
    white: true;
    black: true;
    pink: true;
    green: true;
    gray: true;
    chip: true;
  }
}

// Extend ChipPropsColorOverrides for custom colors
declare module "@mui/material/Chip" {
  interface ChipPropsColorOverrides {
    blue: true;
    white: true;
    black: true;
    pink: true;
    green: true;
    gray: true;
  }
}

// Extend AppBarPropsColorOverrides for custom colors
declare module "@mui/material/AppBar" {
  interface AppBarPropsColorOverrides {
    blue: true;
    white: true;
    black: true;
    pink: true;
    green: true;
    gray: true;
  }
}
