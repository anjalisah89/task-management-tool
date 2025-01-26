import TextCard from "@/components/ui/TextCard";
import { Box, Button, Chip, TextField } from "@mui/material";
import { IconArrowsSort } from "@tabler/icons-react";

const TestPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <TextField label="Primary" color="primary" fullWidth />
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <Chip label="Primary" color="primary" />
        <Chip
          sx={{ borderRadius: 0 }}
          label="Sort By"
          color="primary"
          icon={<IconArrowsSort />}
        />
        <Chip label="Blue" color="blue" />
        <Chip label="Blue Nullable" color="blue" onDelete={() => null} />
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <Button variant="contained" color="blue">
          Contained
        </Button>
        <Button variant="outlined" color="primary">
          Outlined
        </Button>
        <Button variant="text" color="primary">
          Text Button
        </Button>
        <Button variant="contained">Pro Button</Button>
      </Box>
      <TextCard />
    </Box>
  );
};

export default TestPage;
