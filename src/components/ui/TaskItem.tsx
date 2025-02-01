import { useState } from "react";
import {
  Box,
  IconButton,
  MenuItem,
  Select,
  Typography,
  Checkbox,
} from "@mui/material";
import { IconDotsVertical } from "@tabler/icons-react";
import { Task, TaskItemProps } from "@/components/ui/types";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useSnackbar } from "notistack";
import { format, isToday, isTomorrow, isYesterday } from "date-fns";
import DropdownMenu from "@/components/ui/DropdownMenu";

const TaskItem = ({ task }: TaskItemProps) => {
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
        <Checkbox checked={task.completed} onClick={toggleComplete} />
        <Typography
          sx={{
            fontSize: 14,
            flex: 1.5,
            textDecoration: task.completed ? "line-through" : "none",
          }}
        >
          {task.title}
        </Typography>
        <Typography
          sx={{
            fontSize: 14,
            flex: 1,
            color: !task.completed && isPastDate ? "red" : "inherit",
          }}
        >
          {getDateDisplay()}
        </Typography>
        <Typography sx={{ fontSize: 14, flex: 1 }}>{task.type}</Typography>
      </Box>
      {/* Action Buttons */}
      <Box sx={{ display: "flex", alignItems: "center", flex: 0.3 }}>
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
        {/* Three-dot menu */}
        <Box>
          <IconButton onClick={handleMenuOpen}>
            <IconDotsVertical />
          </IconButton>
          {/* Dropdown Menu */}
          <DropdownMenu
            taskId={task.id}
            menuAnchor={menuAnchor}
            handleMenuClose={handleMenuClose}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TaskItem;
