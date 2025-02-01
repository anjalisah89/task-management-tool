import { Box } from "@mui/material";
import TaskBar from "@/components/ui/TaskBar";
import TaskBox from "@/components/ui/TaskBox";

const TaskBoard = () => {
  return (
    <Box sx={{ margin: 2 }}>
      {/* Task Create, filter and search bars */}
      <TaskBar />
      {/* Task boards */}
      <TaskBox />
    </Box>
  );
};

export default TaskBoard;
