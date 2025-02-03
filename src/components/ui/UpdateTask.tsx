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
import { IconX } from "@tabler/icons-react";
import { db } from "@/firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { Task } from "@/components/ui/types";
import { enqueueSnackbar } from "notistack";
import formatTimestamp from "@/components/ui/DateFormate";

interface UpdateTaskProps {
  open: boolean;
  handleClose: () => void;
  task: Task;
}

const UpdateTask: React.FC<UpdateTaskProps> = ({ open, handleClose, task }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [status, setStatus] = useState(task.type);
  const [category, setCategory] = useState(task.category);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [date, setDate] = useState(
    task.date ? new Date(task.date).toISOString().split("T")[0] : ""
  );

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
      const taskRef = doc(db, "todo", task.id);
      await updateDoc(taskRef, {
        title,
        description,
        category,
        completed: category === "completed",
        updatedAt: serverTimestamp(),
        date: date ? new Date(date) : task.date,
        type: status,
        ...(attachment && {
          uploadedAt: serverTimestamp(),
        }),
      });
      enqueueSnackbar("Task updated successfully!", { variant: "success" });
      handleClose();
    } catch {
      enqueueSnackbar("Failed to update task", { variant: "error" });
    }
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        Update Task
        <IconButton onClick={handleClose}>
          <IconX />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        {/* Task date info */}
        <Typography sx={{ fontSize: 14, fontWeight: 600, mb: 2 }}>
          Task Created At: {formatTimestamp(task.createdAt)}
        </Typography>
        {task.updatedAt && (
          <Typography sx={{ fontSize: 14, fontWeight: 600, mb: 2 }}>
            Task Last Updated: {formatTimestamp(task.updatedAt)}
          </Typography>
        )}
        {task.uploadedAt && (
          <Typography sx={{ fontSize: 14, fontWeight: 600, mb: 2 }}>
            File Uploaded At: {formatTimestamp(task.uploadedAt)}
          </Typography>
        )}
        {/* update task form */}
        <TextField
          fullWidth
          label="Task Title"
          margin="dense"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          fullWidth
          label="Description"
          margin="dense"
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
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
              size="small"
              onChange={(_e, newStatus) => newStatus && setStatus(newStatus)}
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
      <DialogActions sx={{ backgroundColor: theme.palette.gray.main, p: 2 }}>
        <Button onClick={handleClose} color="secondary" sx={{ px: 2 }}>
          Cancel
        </Button>
        {/* submit to update task */}
        <Button onClick={handleSubmit} variant="contained">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateTask;
