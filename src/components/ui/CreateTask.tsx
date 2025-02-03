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
  useMediaQuery,
} from "@mui/material";
import { db } from "@/firebase";
import { serverTimestamp, collection, addDoc } from "firebase/firestore";
import { enqueueSnackbar } from "notistack";
import { IconX } from "@tabler/icons-react";

interface CreateTaskProps {
  open: boolean;
  handleClose: () => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({ open, handleClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [status, setStatus] = useState("Work");
  const [category, setCategory] = useState("todo");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [attachment, setAttachment] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

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
        ...(attachment && {
          uploadedAt: serverTimestamp(),
        }),
      });
      enqueueSnackbar("Task created successfully!", { variant: "success" });
      // Reset Form Data
      setTitle("");
      setDescription("");
      setDate("");
      setStatus("Work");
      setCategory("todo");
      setCompleted(false);
      setAttachment(null);
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
        <Box display={isMobile ? "block" : "flex"} gap={2} mt={2}>
          <FormControl sx={{ flex: 1, display: isMobile ? "block" : "flex" }}>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 600,
                mb: 1,
                mt: isMobile ? 2 : "none",
              }}
            >
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
          <FormControl sx={{ flex: 1, display: isMobile ? "block" : "flex" }}>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 600,
                mb: 1,
                mt: isMobile ? 2 : "none",
              }}
            >
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
          <FormControl sx={{ flex: 1, display: isMobile ? "block" : "flex" }}>
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 600,
                mb: 1,
                mt: isMobile ? 2 : "none",
              }}
            >
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
        <Typography sx={{ fontSize: 14, fontWeight: 600, mt: 2 }}>
          Attachment
        </Typography>
        {attachment && (
          <Typography sx={{ fontSize: 14, mt: 1 }}>
            {attachment.name}
          </Typography>
        )}
        <Button
          component="label"
          variant="outlined"
          fullWidth
          sx={{ mt: 1, borderRadius: 1, textTransform: "capitalize" }}
        >
          Upload Attachment
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
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
