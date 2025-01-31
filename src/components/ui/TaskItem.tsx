import { useState } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Select,
  Typography,
  Checkbox,
} from "@mui/material";
import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react";
import { TaskCategory, TaskItemProps } from "@/components/ui/types";
import UpdateTask from "@/components/ui/UpdateTask";

const TaskItem = ({ task, category, moveTask, deleteTask }: TaskItemProps) => {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      paddingX={1}
      mb={1}
    >
      <Box display="flex" flex={1} alignItems="center" gap={2}>
        <Checkbox
          checked={task.completed}
        />
        <Typography
          sx={{
            fontSize: 14,
            flex: 1.5,
            textDecoration: task.completed ? "line-through" : "none",
          }}
        >
          {task.title}
        </Typography>
        <Typography sx={{ fontSize: 14, flex: 1 }}>{task.date}</Typography>
        <Typography sx={{ fontSize: 14, flex: 1 }}>{task.type}</Typography>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", alignItems: "center", flex: 0.3 }}>
        <Select
          onChange={(e) =>
            moveTask(task.id, category, e.target.value as TaskCategory)
          }
          size="small"
          value={category}
          sx={{ fontSize: 14, minWidth: 150, mx: 4, mr: 12 }}
        >
          <MenuItem value="todo" sx={{ fontSize: 12 }}>
            To-Do
          </MenuItem>
          <MenuItem value="inProgress" sx={{ fontSize: 12 }}>
            In-Progress
          </MenuItem>
          <MenuItem value="completed" sx={{ fontSize: 12 }}>
            Completed
          </MenuItem>
        </Select>
        {/* Three-dot menu */}
        <IconButton onClick={handleMenuOpen}>
          <IconDotsVertical />
        </IconButton>
        {/* Dropdown Menu */}
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={() => {
              deleteTask(task.id, category);
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
    </Box>
  );
};

export default TaskItem;
