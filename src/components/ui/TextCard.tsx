import { useState } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { format, isToday, isTomorrow, isYesterday } from "date-fns";
import { IconDotsVertical } from "@tabler/icons-react";
import DropdownMenu from "@/components/ui/DropdownMenu";
import { TaskItemProps } from "@/components/ui/types";

const TextCard = ({ task }: TaskItemProps) => {
  const theme = useTheme();
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  // Delete and Update Task Menu
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchor(null);
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

  return (
    <Box
      sx={{
        my: 2,
        width: "100%",
        backgroundColor: theme.palette.white.main,
        borderRadius: 2,
        padding: 2,
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
          {task.title}
        </Typography>
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 4,
          color: theme.palette.text.secondary,
        }}
      >
        <Typography sx={{ fontSize: 12 }}>{task.type}</Typography>
        <Typography
          sx={{
            fontSize: 12,
            color: !task.completed && isPastDate ? "red" : "inherit",
          }}
        >
          {getDateDisplay()}
        </Typography>
      </Box>
    </Box>
  );
};

export default TextCard;
