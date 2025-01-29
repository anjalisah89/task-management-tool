import { Box, Typography } from "@mui/material";

const TaskBox = () => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: 3,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        padding: "1.5rem",
        zIndex: 4,
      }}
    >
      <Typography variant="h6">Task Box Content</Typography>
    </Box>
  );
};

export default TaskBox;
