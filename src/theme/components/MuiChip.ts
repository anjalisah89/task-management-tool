import { MuiThemeComponentType } from "../types";

const MuiChip: MuiThemeComponentType<"MuiChip"> = {
  defaultProps: {
    size: "small",
  },
  styleOverrides: {
    root: ({ theme, ownerState }) => {
      const common = {
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        "& .MuiChip-label": {
          lineHeight: "normal",
        },
      };

      if (ownerState.color === "default") {
        return {
          ...common,
          backgroundColor: theme.palette.chip.background,
          color: theme.palette.chip.text,
        };
      }

      return common;
    },
  },
};

export default MuiChip;
