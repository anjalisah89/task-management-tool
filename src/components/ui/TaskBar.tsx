import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { IconChevronDown, IconSearch } from "@tabler/icons-react";
import CreateTask from "@/components/ui/CreateTask";

const TaskBar = () => {
  const [open, setOpen] = useState(false);

  // Memoize handlers to prevent unnecessary re-renders
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
          sx={{
            flex: 1,
            "& .MuiOutlinedInput-root": { borderRadius: 8 },
            fontSize: 10,
            maxWidth: "100%",
          }}
          slotProps={{ input: { startAdornment: <IconSearch /> } }}
        />
        {/* Create Tasks Options */}
        <Button
          variant="contained"
          color="primary"
          sx={{ px: 4 }}
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
