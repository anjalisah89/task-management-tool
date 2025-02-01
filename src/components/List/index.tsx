import { useState, useCallback } from "react";
import { Box, Divider } from "@mui/material";
import AccordionList from "@/components/ui/AccordionList";
import TaskLabel from "@/components/ui/TaskLabel";
import CreateTask from "@/components/ui/CreateTask";
import TaskBar from "@/components/ui/TaskBar";

const TaskList = () => {
  const [open, setOpen] = useState(false);

  // Memoize handlers to prevent unnecessary re-renders
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <Box sx={{ margin: 2 }}>
      {/* Task Create, filter and search bars */}
      <TaskBar handleOpen={handleOpen} />
      <Divider sx={{ my: 2 }} />
      {/* Task Lables */}
      <TaskLabel />
      {/* Task listing */}
      <AccordionList />
      {/* Dialog Box */}
      <CreateTask open={open} handleClose={handleClose} />
    </Box>
  );
};

export default TaskList;
