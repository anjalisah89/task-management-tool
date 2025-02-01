import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { IconChevronDown } from "@tabler/icons-react";
import { TaskAccordionProps } from "@/components/ui/types";
import TaskItem from "@/components/ui/TaskItem";

const TaskAccordion = ({ title, category, tasks }: TaskAccordionProps) => {
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
            ? theme.palette.green.main
            : theme.palette.blue.main,
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
            // Task Items inside Accordion
            <TaskItem key={task.id} task={task} category={category} />
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
