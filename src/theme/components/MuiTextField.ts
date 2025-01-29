import { MuiThemeComponentType } from "../types";

const MuiTextField: MuiThemeComponentType<"MuiTextField"> = {
  defaultProps: {
    variant: "outlined",
    fullWidth: true,
    size: "small",
  },
  styleOverrides: {
    root: ({ theme }) => {
      return {
        // placeholder color
        "& .MuiOutlinedInput-root": {
          color: theme.palette.text.primary,
          // fontSize: '0.9rem',
        },
        "& .MuiInputBase-input": {
          fontSize: 16,
        },
        // border color for input element
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.border.box,
        },
        "& .Mui-focused": {
          borderColor: theme.palette.primary.main,
        },
        // decrease label size
        "& .MuiFormLabel-root": {
          fontSize: 16,
        },
        "& .MuiInputLabel-shrink": {
          top: 1,
        },
        "& legend": {
          fontSize: 12,
        },
        // input element color for autofill
        "& .MuiOutlinedInput-input:-webkit-autofill": {
          WebkitBoxShadow: `0 0 0 100px ${theme.palette.background.default} inset`,
        },
      };
    },
  },
};

export default MuiTextField;
