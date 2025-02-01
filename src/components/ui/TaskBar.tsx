import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { IconChevronDown, IconSearch } from "@tabler/icons-react";
import CreateTask from "@/components/ui/CreateTask";

interface TaskBarProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  handleSearch: () => void;
  selectedStatus: string | null;
  setSelectedStatus: (status: string | null) => void;
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
}

const TaskBar: React.FC<TaskBarProps> = ({
  searchInput,
  setSearchInput,
  handleSearch,
  selectedStatus,
  setSelectedStatus,
  selectedDate,
  setSelectedDate,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [statusAnchorEl, setStatusAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [dateAnchorEl, setDateAnchorEl] = useState<null | HTMLElement>(null);

  const handleStatusClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setStatusAnchorEl(event.currentTarget);
  };
  const handleDateClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setDateAnchorEl(event.currentTarget);
  };
  const handleFilterClose = () => {
    setStatusAnchorEl(null);
    setDateAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
        justifyContent: "space-between",
        mb: 4,
      }}
    >
      {/* Filter options */}
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Typography
          variant="caption"
          fontWeight={400}
          color="black"
          sx={{ fontSize: 12 }}
        >
          Filter By :
        </Typography>
        {/* Status Dropdown */}
        <Button
          endIcon={<IconChevronDown size={20} color="black" />}
          variant="outlined"
          color="primary"
          sx={{ borderRadius: 4, textTransform: "capitalize", fontSize: 12 }}
          onClick={handleStatusClick}
        >
          {selectedStatus || "Status"}
        </Button>
        <Menu
          anchorEl={statusAnchorEl}
          open={Boolean(statusAnchorEl)}
          onClose={handleFilterClose}
        >
          <MenuItem
            onClick={() => {
              setSelectedStatus("Work");
              handleFilterClose();
            }}
            sx={{ fontSize: 12 }}
          >
            Work
          </MenuItem>
          <MenuItem
            onClick={() => {
              setSelectedStatus("Personal");
              handleFilterClose();
            }}
            sx={{ fontSize: 12 }}
          >
            Personal
          </MenuItem>
          <MenuItem
            onClick={() => {
              setSelectedStatus(null);
              handleFilterClose();
            }}
            sx={{ fontSize: 12 }}
          >
            All Tasks
          </MenuItem>
        </Menu>
        {/* Due Date Dropdown */}
        <Button
          endIcon={<IconChevronDown size={20} color="black" />}
          variant="outlined"
          color="primary"
          sx={{ borderRadius: 4, textTransform: "capitalize", fontSize: 12 }}
          onClick={handleDateClick}
        >
          {selectedDate || "Due Date"}
        </Button>
        <Menu
          anchorEl={dateAnchorEl}
          open={Boolean(dateAnchorEl)}
          onClose={handleFilterClose}
        >
          <MenuItem
            onClick={() => {
              setSelectedDate("Yesterday");
              handleFilterClose();
            }}
            sx={{ fontSize: 12 }}
          >
            Yesterday
          </MenuItem>
          <MenuItem
            onClick={() => {
              setSelectedDate("Today");
              handleFilterClose();
            }}
            sx={{ fontSize: 12 }}
          >
            Today
          </MenuItem>
          <MenuItem
            onClick={() => {
              setSelectedDate("Tomorrow");
              handleFilterClose();
            }}
            sx={{ fontSize: 12 }}
          >
            Tomorrow
          </MenuItem>
          <MenuItem
            onClick={() => {
              setSelectedDate("Within a Week");
              handleFilterClose();
            }}
            sx={{ fontSize: 12 }}
          >
            Within a Week
          </MenuItem>
          <MenuItem
            onClick={() => {
              setSelectedDate("Within a Month");
              handleFilterClose();
            }}
            sx={{ fontSize: 12 }}
          >
            Within a Month
          </MenuItem>
          <MenuItem
            onClick={() => {
              setSelectedDate("Within a Year");
              handleFilterClose();
            }}
            sx={{ fontSize: 12 }}
          >
            Within a Year
          </MenuItem>
          <MenuItem
            onClick={() => {
              setSelectedDate(null);
              handleFilterClose();
            }}
            sx={{ fontSize: 12 }}
          >
            All Tasks
          </MenuItem>
        </Menu>
      </Box>
      {/* Search Options */}
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <TextField
          label="Search"
          color="primary"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          sx={{
            flex: 1,
            "& .MuiOutlinedInput-root": { borderRadius: 8 },
            fontSize: 10,
            maxWidth: "100%",
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton onClick={handleSearch}>
                    <IconSearch />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        {/* Create Tasks Options */}
        <Button
          variant="contained"
          color="primary"
          sx={{ px: 4, py: 1 }}
          onClick={handleOpen}
        >
          Add Task
        </Button>
        {/* Dialog Box */}
        <CreateTask open={open} handleClose={handleClose} />
      </Box>
    </Box>
  );
};

export default TaskBar;
