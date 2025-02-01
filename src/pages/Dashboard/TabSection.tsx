import TaskPanel from "@/components/TaskPanel";
import { Box, Tab, Tabs } from "@mui/material";
import { IconBrandTrello, IconList } from "@tabler/icons-react";
import { useState } from "react";

const TabSection = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
        {/* List Tab */}
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
        {/* Board Tab */}
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
      <TaskPanel selectedTab={value} />
    </Box>
  );
};

export default TabSection;
