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
  Divider,
} from "@mui/material";
import { IconX } from "@tabler/icons-react";
import { useSnackbar } from "notistack";
import { db } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface CreateTaskProps {
  open: boolean;
  handleClose: () => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({ open, handleClose }) => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [status, setStatus] = useState("Work");
  const [category, setCategory] = useState("todo");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Field Checks
    if (!title || !date || !status || !description) {
      enqueueSnackbar("Please fill in all required fields", {
        variant: "error",
      });
      return;
    }

    try {
      // Create Tasks
      await addDoc(collection(db, "todo"), {
        id: Math.random().toString(36).slice(2, 11),
        title,
        description,
        category,
        completed: category === "completed", // boolean value
        createdAt: serverTimestamp(), // task created time by users 
        date: new Date(date), // task due date required in timestamp formate
        type: status,
      });
      enqueueSnackbar("Task created successfully!", { variant: "success" });
      // Reset Form Data
      setTitle("");
      setDescription("");
      setDate("");
      setStatus("Work");
      setCategory("todo");
      handleClose();
    } catch {
      enqueueSnackbar("Failed to create task", { variant: "error" });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          Create Task
          <IconButton onClick={handleClose}>
            <IconX />
          </IconButton>
        </DialogTitle>
        <Divider sx={{ my: 1 }} />
        {/* Task Form Data */}
        <DialogContent>
          <TextField
            fullWidth
            label="Task Title"
            margin="dense"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            fullWidth
            label="Description"
            margin="dense"
            multiline
            rows={3}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Box display="flex" gap={4} mt={2}>
            <FormControl>
              <Typography sx={{ fontSize: 14, fontWeight: 600, mb: 1 }}>
                Task Status*
              </Typography>
              <ToggleButtonGroup
                value={status}
                exclusive
                onChange={(_e, newStatus) => newStatus && setStatus(newStatus)}
              >
                <ToggleButton
                  value="Work"
                  sx={{ fontSize: 10, fontWeight: 600 }}
                >
                  Work
                </ToggleButton>
                <ToggleButton
                  value="Personal"
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
              <TextField
                fullWidth
                type="date"
                size="small"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: 14, fontWeight: 600, mb: 1 }}>
                Task Category*
              </Typography>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                sx={{ fontSize: 12 }}
                size="small"
                required
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
        </DialogContent>
        <DialogActions sx={{ backgroundColor: theme.palette.gray.main, p: 2 }}>
          <Button onClick={handleClose} color="secondary" sx={{ px: 2 }}>
            Cancel
          </Button>
          {/* Submit to create a new task */}
          <Button type="submit" variant="contained">
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateTask;
