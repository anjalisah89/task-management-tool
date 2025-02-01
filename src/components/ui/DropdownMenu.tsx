import { useState } from "react";
import { Box, Menu, MenuItem } from "@mui/material";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";
import UpdateTask from "@/components/ui/UpdateTask";
import { enqueueSnackbar } from "notistack";

interface DropdownMenuProps {
  menuAnchor: null | HTMLElement;
  handleMenuClose: () => void;
  taskId: string;
}

const DropdownMenu = ({
  menuAnchor,
  handleMenuClose,
  taskId,
}: DropdownMenuProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Deleting task
  const handleDelete = async () => {
    try {
      if (!taskId) {
        enqueueSnackbar("Task is not available", { variant: "error" });
        return;
      }
      await deleteDoc(doc(db, "todo", taskId)); // Delete the task from Firestore
      enqueueSnackbar("Task deleted successfully", { variant: "success" });
      handleMenuClose(); 
    } catch {
      enqueueSnackbar("Unable to delete task, please try again later.", {
        variant: "error",
      });
    }
  };

  return (
    // Delete and Update Dialog Box
    <Box>
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        {/* Delete Menu */}
        <MenuItem
          onClick={() => {
            handleMenuClose();
            handleDelete();
          }}
          sx={{
            color: "red",
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontSize: 14,
          }}
        >
          <IconTrash size={14} style={{ color: "red" }} />
          Delete
        </MenuItem>
        {/* Update Menu */}
        <MenuItem
          onClick={handleOpen}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontSize: 14,
          }}
        >
          <IconEdit size={14} />
          Edit
        </MenuItem>
      </Menu>
      {/* Update Task Pop Up */}
      <UpdateTask open={open} handleClose={handleClose} />
    </Box>
  );
};

export default DropdownMenu;
