import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  Paper,
} from "@mui/material";
import { IconChevronDown, IconSearch } from "@tabler/icons-react";

const TaskBoard = () => {
  const theme = useTheme();

  return (
    <Box sx={{ margin: 2 }}>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
          mb: 4,
        }}
      >
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Typography
            variant="caption"
            fontWeight={400}
            color="black"
            sx={{ fontSize: 12 }}
          >
            Filter By :
          </Typography>
          <Button
            endIcon={<IconChevronDown size={20} color="black" />}
            variant="outlined"
            color="primary"
            sx={{ borderRadius: 4, textTransform: "capitalize", fontSize: 12 }}
          >
            Category
          </Button>
          <Button
            endIcon={<IconChevronDown size={20} color="black" />}
            variant="outlined"
            color="primary"
            sx={{ borderRadius: 4, textTransform: "capitalize", fontSize: 12 }}
          >
            Due Date
          </Button>
        </Box>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <TextField
            label="Search"
            color="primary"
            sx={{
              flex: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: 8,
              },
              fontSize: 10,
              maxWidth: "100%",
            }}
            slotProps={{
              input: {
                startAdornment: <IconSearch />,
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{
              px: 4,
              py: 1,
              fontSize: 12,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              gap: 1,
              textTransform: "uppercase",
            }}
          >
            Add Task
          </Button>
        </Box>
      </Box>
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
    </Box>
  );
};

export default TaskBoard;
