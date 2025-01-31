import {
  Box,
  Typography,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  Accordion,
} from "@mui/material";
import { IconChevronDown } from "@tabler/icons-react";
const AccordionList = () => {
  const theme = useTheme();
  return (
    <Box sx={{ marginY: 2 }}>
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

export default AccordionList;
