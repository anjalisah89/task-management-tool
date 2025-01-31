import { Box } from "@mui/material";
import { useState } from "react";
import TaskBar from "@/components/ui/TaskBar";
import CreateTask from "@/components/ui/CreateTask";
import TaskSheet from "@/components/ui/TaskSheet";

const TaskBoard = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("work");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ margin: 2 }}>
      <TaskBar handleOpen={handleOpen} />
      <TaskSheet />
      <CreateTask
        open={open}
        handleClose={handleClose}
        category={category}
        setCategory={setCategory}
      />
    </Box>
  );
};

export default TaskBoard;
