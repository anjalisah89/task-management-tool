import { Box, Divider } from "@mui/material";
import AccordionList from "@/components/ui/AccordionList";
import TaskLabel from "@/components/ui/TaskLabel";
import TaskBar from "@/components/ui/TaskBar";

const TaskList = () => {
  return (
    <Box sx={{ margin: 2 }}>
      {/* Task Create, filter and search bars */}
      <TaskBar />
      <Divider sx={{ my: 2 }} />
      {/* Task Lables */}
      <TaskLabel />
      {/* Task listing */}
      <AccordionList />
    </Box>
  );
};

export default TaskList;
