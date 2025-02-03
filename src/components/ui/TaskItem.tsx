import { useState } from "react";
import {
  Box,
  IconButton,
  MenuItem,
  Select,
  Typography,
  Checkbox,
  useMediaQuery,
} from "@mui/material";
import {
  IconCircleCheckFilled,
  IconDotsVertical,
  IconGripVertical,
} from "@tabler/icons-react";
import { Task } from "@/components/ui/types";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useSnackbar } from "notistack";
import { format, isToday, isTomorrow, isYesterday } from "date-fns";
import DropdownMenu from "@/components/ui/DropdownMenu";

interface TaskProps {
  task: Task;
  onSelectTask: (taskId: string) => void;
  selectedTasks: string[];
}

const TaskItem: React.FC<TaskProps> = ({
  task,
  onSelectTask,
  selectedTasks,
}) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [categories, setCategories] = useState<string>(task.category);
  const { enqueueSnackbar } = useSnackbar();
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const toggleComplete = async () => {
    try {
      const taskId = String(task.id);
      const taskRef = doc(db, "todo", taskId);
      // Determine the new completed status
      const newCompletedStatus = !task.completed;
      // Prepare update object
      const updateData: Partial<Task> = {
        completed: newCompletedStatus,
        category: newCompletedStatus ? "completed" : "todo",
      };
      // Proceed with update
      await updateDoc(taskRef, updateData);
      enqueueSnackbar("Task status updated successfully!", {
        variant: "success",
      });
    } catch {
      enqueueSnackbar("Error updating task.", { variant: "error" });
    }
  };

  const updateCategory = async (newCategory: string) => {
    try {
      const taskRef = doc(db, "todo", String(task.id));
      // Determine whether to mark the task as incomplete
      const shouldMarkIncomplete = newCategory !== "completed";
      const updateData: Partial<Task> = {
        category: newCategory,
        ...(shouldMarkIncomplete ? { completed: false } : { completed: true }), // Set completed based on category
      };
      // Proceed with update
      await updateDoc(taskRef, updateData);
      enqueueSnackbar("Task category updated successfully!", {
        variant: "success",
      });
      // Update local state
      setCategories(newCategory);
    } catch {
      enqueueSnackbar("Error updating category. Please try again.", {
        variant: "error",
      });
    }
  };

  // Date formatting
  const taskDateObj = new Date(task.date);
  const isPastDate =
    new Date(taskDateObj).setHours(0, 0, 0, 0) <
    new Date().setHours(0, 0, 0, 0);
  const getDateDisplay = () => {
    if (isToday(taskDateObj)) return "Today";
    if (isTomorrow(taskDateObj)) return "Tomorrow";
    if (isYesterday(taskDateObj)) return "Yesterday";
    return format(taskDateObj, "EEE, dd MMM yyyy");
  };

  // Delete and Update Task Menu
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      paddingX={1}
      mb={1}
    >
      <Box display="flex" flex={1} alignItems="center" gap={2}>
        {/* update multiple task using checkbox */}
        <Checkbox
          checked={selectedTasks.includes(task.id)}
          onChange={() => onSelectTask(task.id)}
        />
        {!isMobile && <IconGripVertical />}
        {/* update single task */}
        {task.completed ? (
          <IconButton onClick={toggleComplete}>
            <IconCircleCheckFilled color="green" />
          </IconButton>
        ) : (
          <IconButton onClick={toggleComplete}>
            <IconCircleCheckFilled />
          </IconButton>
        )}
        <Typography
          sx={{
            fontSize: 14,
            flex: 1.5,
            textDecoration: task.completed ? "line-through" : "none",
          }}
        >
          {task.title}
        </Typography>
        {!isMobile && (
          <Typography
            sx={{
              fontSize: 14,
              flex: 1,
              color: !task.completed && isPastDate ? "red" : "inherit",
            }}
          >
            {getDateDisplay()}
          </Typography>
        )}
        {!isMobile && (
          <Typography sx={{ fontSize: 14, flex: 1 }}>{task.type}</Typography>
        )}
      </Box>
      
      {/* Action Buttons */}
      <Box
        sx={{ display: "flex", alignItems: "center", flex: isMobile ? 0 : 0.3 }}
      >
        {!isMobile && (
          <Select
            size="small"
            value={categories}
            onChange={(e) => updateCategory(e.target.value)}
            sx={{ fontSize: 14, minWidth: 150, mx: 4, mr: 12 }}
          >
            {["todo", "inProgress", "completed"].map((cat) => (
              <MenuItem key={cat} value={cat} sx={{ fontSize: 12 }}>
                {cat.charAt(0).toUpperCase() +
                  cat.slice(1).replace(/([A-Z])/g, " $1")}
              </MenuItem>
            ))}
          </Select>
        )}
        {/* Three-dot menu */}
        <Box>
          <IconButton onClick={handleMenuOpen}>
            <IconDotsVertical />
          </IconButton>
          {/* Dropdown Menu */}
          <DropdownMenu
            task={task}
            menuAnchor={menuAnchor}
            handleMenuClose={handleMenuClose}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TaskItem;
