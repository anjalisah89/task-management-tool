import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Typography,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { TaskProps } from "@/components/ui/types";
import { IconChevronDown } from "@tabler/icons-react";
import TaskItem from "@/components/ui/TaskItem";
import CheckBoxMenu from "@/components/ui/CheckBoxMenu";

const TaskAccordion = ({ title, category, tasks }: TaskProps) => {
  const theme = useTheme();
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  // Handle selecting/deselecting tasks
  const handleSelectTask = (taskId: string) => {
    setSelectedTasks((prevSelected) =>
      prevSelected.includes(taskId)
        ? prevSelected.filter((id) => id !== taskId)
        : [...prevSelected, taskId]
    );
  };

  // Menu handling
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedTasks([]);
  };

  return (
    // Accordion List
    <Accordion
      defaultExpanded
      sx={{
        borderRadius: 2,
        mb: 2,
        backgroundColor:
          category === "todo"
            ? theme.palette.pink.main
            : category === "inProgress"
            ? theme.palette.blue.main
            : theme.palette.green.main,
      }}
    >
      {/* Accordion Summary */}
      <AccordionSummary
        expandIcon={<IconChevronDown />}
        sx={{ fontWeight: "bold" }}
      >
        {title} ({tasks.length})
      </AccordionSummary>

      {/* Accordion Details */}
      <AccordionDetails sx={{ backgroundColor: theme.palette.gray.main }}>
        
        {/* Check Box Menu */}
        {selectedTasks.length > 0 && (
          <>
            {!menuAnchor && (
              <Button
                variant="outlined"
                color="primary"
                onClick={handleMenuOpen}
                sx={{ mb: 2, mt: 2 }}
              >
                {`Modify ${selectedTasks.length} Selected ${
                  selectedTasks.length > 1 ? "Tasks" : "Task"
                }`}
              </Button>
            )}
            <CheckBoxMenu
              menuAnchor={menuAnchor}
              handleMenuClose={handleMenuClose}
              selectedTasks={selectedTasks}
            />
          </>
        )}
        {/* Task List  */}
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <React.Fragment key={task.id}>
              <TaskItem
                task={task}
                onSelectTask={handleSelectTask}
                selectedTasks={selectedTasks}
              />
              <Divider sx={{ my: 1, mx: 0 }} />
            </React.Fragment>
          ))
        ) : (
          <Typography sx={{ fontSize: 14, textAlign: "center", py: 1 }}>
            No Tasks in {title}
          </Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default TaskAccordion;
