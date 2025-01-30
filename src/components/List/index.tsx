import {
  Box,
  Button,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
} from "@mui/material";
import { IconChevronDown, IconSearch } from "@tabler/icons-react";

const TaskList = () => {
  const theme = useTheme();
  return (
    <Box sx={{ margin: 2 }}>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
          mb: 4,
        }}
      >
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
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <TextField
            label="Search"
            color="primary"
            sx={{
              flex: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: 8,
              },
              fontSize: 10,
              maxWidth: "100%",
            }}
            slotProps={{
              input: {
                startAdornment: <IconSearch />,
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{
              px: 4,
              py: 1,
              fontSize: 12,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              gap: 1,
              textTransform: "uppercase",
            }}
          >
            Add Task
          </Button>
        </Box>
      </Box>
      <hr />
      <Box
        sx={{
          display: "flex",
          gap: 24,
          paddingX: 1,
          alignItems: "center",
        }}
      >
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{ fontSize: 12, fontWeight: 800 }}
        >
          Task Name
        </Typography>
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{ fontSize: 12, fontWeight: 800 }}
        >
          Date on
        </Typography>
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{ fontSize: 12, fontWeight: 800 }}
        >
          Task Status
        </Typography>
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{ fontSize: 12, fontWeight: 800 }}
        >
          Task category
        </Typography>
      </Box>
      <Accordion
        defaultExpanded
        sx={{
          backgroundColor: theme.palette.pink.main,
          borderRadius: 2,
          mb: 2,
        }}
      >
        <AccordionSummary
          expandIcon={<IconChevronDown />}
          sx={{ fontWeight: "bold" }}
        >
          Todo (3)
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: theme.palette.gray.main }}>
          <Typography sx={{ fontSize: 14, alignItems: "center" }}>
            No Tasks in To-Do
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        defaultExpanded
        sx={{
          backgroundColor: theme.palette.blue.main,
          borderRadius: 2,
          mb: 2,
        }}
      >
        <AccordionSummary
          expandIcon={<IconChevronDown />}
          sx={{ fontWeight: "bold" }}
        >
          In-Progress (3)
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: theme.palette.gray.main }}>
          <Typography sx={{ fontSize: 14, alignItems: "center" }}>
            No Tasks in Progress
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        defaultExpanded
        sx={{
          backgroundColor: theme.palette.green.main,
          borderRadius: 2,
        }}
      >
        <AccordionSummary
          expandIcon={<IconChevronDown />}
          sx={{ fontWeight: "bold" }}
        >
          Completed (3)
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: theme.palette.gray.main }}>
          <Typography sx={{ fontSize: 14, alignItems: "center" }}>
            No Completed Tasks
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default TaskList;
