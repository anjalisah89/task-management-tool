import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { IconChevronDown } from "@tabler/icons-react";
import { TaskProps } from "@/components/ui/types";
import TaskItem from "@/components/ui/TaskItem";

const TaskAccordion = ({ title, category, tasks }: TaskProps) => {
  const theme = useTheme();

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
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <React.Fragment key={task.id}>
              <TaskItem task={task} category={category} />
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
