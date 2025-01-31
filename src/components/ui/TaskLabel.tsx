import { Box, Typography } from "@mui/material";

const TaskLabel = () => {
  return (
    <Box
      sx={{
        display: "flex",
        paddingX: 4,
        alignItems: "center",
      }}
    >
      <Typography
        variant="caption"
        color="textSecondary"
        sx={{ fontSize: 12, fontWeight: 800, flex: 1.4 }}
      >
        Task Name
      </Typography>
      <Typography
        variant="caption"
        color="textSecondary"
        sx={{ fontSize: 12, fontWeight: 800, flex: 0.8 }}
      >
        Due on
      </Typography>
      <Typography
        variant="caption"
        color="textSecondary"
        sx={{ fontSize: 12, fontWeight: 800, flex: 1 }}
      >
        Task Status
      </Typography>
      <Typography
        variant="caption"
        color="textSecondary"
        sx={{ fontSize: 12, fontWeight: 800, flex: 1 }}
      >
        Task category
      </Typography>
    </Box>
  );
};

export default TaskLabel;
