import { Box } from "@mui/material";
import TaskBar from "@/components/ui/TaskBar";
import TaskSheet from "@/components/ui/TaskSheet";

const TaskBoard = () => {
  return (
    <Box sx={{ margin: 2 }}>
      <TaskBar />
      <TaskSheet />
    </Box>
  );
};

export default TaskBoard;
