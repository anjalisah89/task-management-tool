import { Box, Menu, MenuItem, Typography, IconButton } from "@mui/material";
import {
  IconChartBar,
  IconCircleDashedCheck,
  IconTools,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { db } from "@/firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { enqueueSnackbar } from "notistack";

interface DropdownMenuProps {
  menuAnchor: null | HTMLElement;
  handleMenuClose: () => void;
  selectedTasks: string[];
}

const CheckBoxMenu = ({
  menuAnchor,
  handleMenuClose,
  selectedTasks,
}: DropdownMenuProps) => {
  // Deleting multiple tasks
  const handleDelete = async () => {
    try {
      for (const taskId of selectedTasks) {
        await deleteDoc(doc(db, "todo", taskId)); // Delete tasks sequentially
      }
      enqueueSnackbar("Tasks deleted successfully", { variant: "success" });
      handleMenuClose();
    } catch {
      enqueueSnackbar("Unable to delete tasks, please try again later.", {
        variant: "error",
      });
    }
  };

  // Update category for multiple tasks
  const updateCategory = async (newCategory: string) => {
    try {
      for (const taskId of selectedTasks) {
        const taskRef = doc(db, "todo", taskId);
        const shouldMarkIncomplete = newCategory !== "completed";
        const updateData = {
          category: newCategory,
          completed: !shouldMarkIncomplete, // Set completed based on category
        };
        await updateDoc(taskRef, updateData);
      }
      enqueueSnackbar("Task categories updated successfully!", {
        variant: "success",
      });
      handleMenuClose();
    } catch {
      enqueueSnackbar("Error updating category. Please try again.", {
        variant: "error",
      });
    }
  };

  return (
    <Box>
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        {/* Selected Tasks */}
        <Typography
          sx={{
            padding: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 14,
          }}
        >
          {selectedTasks.length} {selectedTasks.length > 1 ? "Tasks" : "Task"}{" "}
          Selected
          <IconButton onClick={handleMenuClose} sx={{ fontSize: 14 }}>
            <IconX size={14} />
          </IconButton>
        </Typography>
        {/* Status Menu */}
        <MenuItem
          onClick={() => updateCategory("todo")}
          sx={{ fontSize: 12, gap: 1 }}
        >
          <IconTools size={14} /> Set to "To Do"
        </MenuItem>
        <MenuItem
          onClick={() => updateCategory("inProgress")}
          sx={{ fontSize: 12, gap: 1 }}
        >
          <IconChartBar size={14} />
          Set to "In Progress"
        </MenuItem>
        <MenuItem
          onClick={() => updateCategory("completed")}
          sx={{ fontSize: 12, gap: 1 }}
        >
          <IconCircleDashedCheck size={14} /> Set to "Completed"
        </MenuItem>
        {/* Delete Menu */}
        <MenuItem
          onClick={handleDelete}
          sx={{
            color: "red",
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontSize: 12,
          }}
        >
          <IconTrash size={14} style={{ color: "red" }} />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default CheckBoxMenu;
