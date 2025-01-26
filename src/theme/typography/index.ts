import { Palette } from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";

const typography:
  | TypographyOptions
  | ((palette: Palette) => TypographyOptions)
  | undefined = {
  fontFamily: "Mulish, Poppins, sans-serif",
  fontSize: 10,
  htmlFontSize: 10,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
};

export default typography;
