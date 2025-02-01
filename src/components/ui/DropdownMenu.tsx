import { useState } from "react";
import { Box, Menu, MenuItem } from "@mui/material";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import UpdateTask from "./UpdateTask";

interface DropdownMenuProps {
  menuAnchor: null | HTMLElement;
  handleMenuClose: () => void;
}

const DropdownMenu = ({ menuAnchor, handleMenuClose }: DropdownMenuProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            handleMenuClose(); 
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
