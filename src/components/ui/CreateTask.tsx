import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  Select,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  IconButton,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import { IconX } from "@tabler/icons-react";

interface CreateTaskProps {
  open: boolean;
  handleClose: () => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({ open, handleClose }) => {
  const theme = useTheme();
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("work");
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        Create Task
        <IconButton onClick={handleClose}>
          <IconX />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField fullWidth label="Task Title" margin="dense" />
        <TextField
          fullWidth
          label="Description"
          margin="dense"
          multiline
          rows={3}
        />
        <Box display="flex" gap={4} mt={2}>
          <FormControl>
            <Typography sx={{ fontSize: 14, fontWeight: 600, mb: 1 }}>
              Task Category*
            </Typography>
            <ToggleButtonGroup
              value={category}
              exclusive
              onChange={(_e, newCategory) =>
                newCategory && setCategory(newCategory)
              }
            >
              <ToggleButton value="work" sx={{ fontSize: 10, fontWeight: 600 }}>
                Work
              </ToggleButton>
              <ToggleButton
                value="personal"
                sx={{ fontSize: 10, fontWeight: 600 }}
              >
                Personal
              </ToggleButton>
            </ToggleButtonGroup>
          </FormControl>
          <FormControl sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 600, mb: 1 }}>
              Due On*
            </Typography>
            <TextField fullWidth type="date" size="small" />
          </FormControl>
          <FormControl sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 600, mb: 1 }}>
              Task Status*
            </Typography>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              sx={{ fontSize: 12 }}
              size="small"
            >
              <MenuItem value="todo" sx={{ fontSize: 12 }}>
                To-Do
              </MenuItem>
              <MenuItem value="in-progress" sx={{ fontSize: 12 }}>
                In Progress
              </MenuItem>
              <MenuItem value="completed" sx={{ fontSize: 12 }}>
                Completed
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Typography sx={{ fontSize: 14, fontWeight: 600, mt: 2 }}>
          Attachment
        </Typography>
        <Button
          component="label"
          variant="outlined"
          fullWidth
          sx={{ mt: 1, borderRadius: 1, textTransform: "capitalize" }}
        >
          Upload Attachment
          <input type="file" hidden />
        </Button>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: theme.palette.gray.main, p: 2 }}>
        <Button onClick={handleClose} color="secondary" sx={{ px: 2 }}>
          Cancel
        </Button>
        <Button onClick={handleClose} variant="contained">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTask;
