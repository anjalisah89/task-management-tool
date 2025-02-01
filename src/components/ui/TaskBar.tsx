import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { IconChevronDown, IconSearch } from "@tabler/icons-react";
import CreateTask from "@/components/ui/CreateTask";

interface TaskBarProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  handleSearch: () => void;
}

const TaskBar: React.FC<TaskBarProps> = ({
  searchInput,
  setSearchInput,
  handleSearch,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
        <Button
          endIcon={<IconChevronDown size={20} color="black" />}
          variant="outlined"
          color="primary"
          sx={{ borderRadius: 4, textTransform: "capitalize", fontSize: 12 }}
        >
          Category
        </Button>
        <Button
          endIcon={<IconChevronDown size={20} color="black" />}
          variant="outlined"
          color="primary"
          sx={{ borderRadius: 4, textTransform: "capitalize", fontSize: 12 }}
        >
          Due Date
        </Button>
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
