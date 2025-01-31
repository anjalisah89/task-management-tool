import { useState } from "react";
import { Box } from "@mui/material";
import AccordionList from "@/components/ui/AccordionList";
import TaskLabel from "@/components/ui/TaskLabel";
import CreateTask from "@/components/ui/CreateTask";
import TaskBar from "@/components/ui/TaskBar";

const TaskList = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ margin: 2 }}>
      <TaskBar handleOpen={handleOpen} />
      <hr />
      <TaskLabel />
      <AccordionList />
      <CreateTask open={open} handleClose={handleClose} />
    </Box>
  );
};

export default TaskList;
