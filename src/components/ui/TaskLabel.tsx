import { Box, Typography } from "@mui/material";

const TaskLabel = () => {
  return (
    <Box
      sx={{
        display: "flex",
        paddingX: 1,
        alignItems: "center",
      }}
    >
      <Typography
        variant="caption"
        color="textSecondary"
        sx={{ fontSize: 12, fontWeight: 800, flex: 2 }}
      >
        Task Name
      </Typography>
      <Typography
        variant="caption"
        color="textSecondary"
        sx={{ fontSize: 12, fontWeight: 800, flex: 1 }}
      >
        Date on
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
