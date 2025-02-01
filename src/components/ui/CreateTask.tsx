import { useState } from "react";
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
import { serverTimestamp, collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { enqueueSnackbar } from "notistack";

interface CreateTaskProps {
  open: boolean;
  handleClose: () => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({ open, handleClose }) => {
  const theme = useTheme();
  const [status, setStatus] = useState("Work");
  const [category, setCategory] = useState("todo");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !status || !description || !date || !category) {
      enqueueSnackbar("Please fill in all required fields", {
        variant: "error",
      });
      return;
    }

    try {
      await addDoc(collection(db, "todo"), {
        id: Math.random().toString(36).slice(2, 11),
        title,
        description,
        category,
        completed, // boolean value
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
      setCompleted(false);
      handleClose();
    } catch (error) {
      console.error("Error creating task: ", error);
      enqueueSnackbar("Failed to create task", { variant: "error" });
    }
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        Create Task
        <IconButton onClick={handleClose}>
          <IconX />
        </IconButton>
      </DialogTitle>
      <Divider sx={{ my: 1 }} />
      {/* create task form */}
      <DialogContent>
        <FormControl fullWidth margin="dense">
          <TextField
            label="Task Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth margin="dense">
          <TextField
            label="Description"
            multiline
            rows={3}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <Box display="flex" gap={2} mt={2}>
          <FormControl>
            <Typography sx={{ fontSize: 14, fontWeight: 600, mb: 1 }}>
              Task Status*
            </Typography>
            <ToggleButtonGroup
              value={status}
              exclusive
              onChange={(_e, newStatus) => newStatus && setStatus(newStatus)}
              size="small"
            >
              <ToggleButton value="Work" sx={{ fontSize: 14, fontWeight: 600 }}>
                Work
              </ToggleButton>
              <ToggleButton
                value="Personal"
                sx={{ fontSize: 14, fontWeight: 600 }}
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
              size="small"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              sx={{ fontSize: 14 }}
            >
              {["todo", "inProgress", "completed"].map((cat) => (
                <MenuItem key={cat} value={cat} sx={{ fontSize: 12 }}>
                  {cat.charAt(0).toUpperCase() +
                    cat.slice(1).replace(/([A-Z])/g, " $1")}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: theme.palette.grey[100], p: 2 }}>
        <Button onClick={handleClose} color="secondary" sx={{ px: 2 }}>
          Cancel
        </Button>
        {/* submit to create task */}
        <Button onClick={handleSubmit} variant="contained">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTask;
