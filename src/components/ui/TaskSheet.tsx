import { Box, Paper, Typography, useTheme } from "@mui/material";
import { TaskProps } from "@/components/ui/types";
import TaskCard from "@/components/ui/TextCard";

const TaskSheet = ({ title, category, tasks }: TaskProps) => {
  const theme = useTheme();
  return (
    <Paper
      sx={{
        flex: 1,
        backgroundColor: theme.palette.gray.main,
        borderRadius: 3,
        padding: 2,
        minHeight: 400,
      }}
    >
      <Box
        sx={{
          backgroundColor:
            category === "todo"
              ? theme.palette.pink.main
              : category === "inProgress"
              ? theme.palette.green.main
              : theme.palette.blue.main,
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
        {title}
      </Box>
      <Box sx={{ alignItems: "center" }}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            // Task Items inside card
            <TaskCard key={task.id} task={task} category={category} />
          ))
        ) : (
          <Typography sx={{ fontSize: 14, textAlign: "center", py: 1 }}>
            No Tasks in {title}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default TaskSheet;
