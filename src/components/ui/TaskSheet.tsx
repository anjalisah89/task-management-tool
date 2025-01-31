import { Box, Paper, Typography, useTheme } from "@mui/material";

const TaskSheet = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        mt: 3,
      }}
    >
      <Paper
        sx={{
          flex: 1,
          backgroundColor: theme.palette.gray.main,
          borderRadius: 3,
          padding: 2,
          minHeight: 300,
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.pink.main,
            color: theme.palette.pink.contrastText,
            fontSize: 14,
            fontWeight: "bold",
            paddingX: 1,
            paddingY: 1,
            borderRadius: 2,
            display: "inline-block",
            mb: 2,
          }}
        >
          TO-DO
        </Box>
        <Typography
          sx={{ fontSize: 14, alignItems: "center" }}
          color={theme.palette.text.primary}
        >
          No Tasks in To-Do
        </Typography>
      </Paper>
      <Paper
        sx={{
          flex: 1,
          backgroundColor: theme.palette.gray.main,
          borderRadius: 3,
          padding: 2,
          minHeight: 300,
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.blue.main,
            color: theme.palette.blue.contrastText,
            fontSize: 14,
            fontWeight: "bold",
            paddingX: 1,
            paddingY: 1,
            borderRadius: 2,
            display: "inline-block",
            mb: 2,
          }}
        >
          IN-PROGRESS
        </Box>
        <Typography
          sx={{ fontSize: 14, alignItems: "center" }}
          color={theme.palette.text.primary}
        >
          No Tasks in Progress
        </Typography>
      </Paper>
      <Paper
        sx={{
          flex: 1,
          backgroundColor: theme.palette.gray.main,
          borderRadius: 3,
          padding: 2,
          minHeight: 300,
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.green.main,
            color: theme.palette.green.contrastText,
            fontSize: 14,
            fontWeight: "bold",
            paddingX: 1,
            paddingY: 1,
            borderRadius: 2,
            display: "inline-block",
            mb: 2,
          }}
        >
          COMPLETED
        </Box>
        <Typography
          sx={{ fontSize: 14, alignItems: "center" }}
          color={theme.palette.text.primary}
        >
          No Completed Tasks
        </Typography>
      </Paper>
    </Box>
  );
};

export default TaskSheet;
