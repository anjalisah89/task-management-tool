import TaskBoard from "@/components/Board";
import TaskList from "@/components/List";
import { Box, Tab, Tabs } from "@mui/material";
import { IconBrandTrello, IconList } from "@tabler/icons-react";
import { useState } from "react";

const TabSection = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const renderPanel = () => {
    switch (value) {
      case 0:
        return <TaskList />;
      case 1:
        return <TaskBoard />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: "100%", marginX: 1 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        TabIndicatorProps={{ style: { backgroundColor: "black" } }}
      >
        <Tab
          icon={<IconList size={20} />}
          iconPosition="start"
          label="List"
          value={0}
          sx={{
            textTransform: "capitalize",
            display: "flex",
            gap: 1,
            minHeight: "auto",
          }}
        />
        <Tab
          icon={<IconBrandTrello size={20} />}
          iconPosition="start"
          label="Board"
          value={1}
          sx={{
            textTransform: "capitalize",
            display: "flex",
            gap: 1,
            minHeight: "auto",
          }}
        />
      </Tabs>

      {renderPanel()}
    </Box>
  );
};

export default TabSection;
