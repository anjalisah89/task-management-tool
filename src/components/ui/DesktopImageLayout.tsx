import { Box } from "@mui/material";
import TaskList from "@/assets/Task_list.svg";
import CirclesBg from "@/assets/circles_bg.svg";

const DesktopImageLayout = () => {
  return (
    <>
      <Box sx={{ width: "50%", position: "relative", zIndex: 2 }}>
        <Box
          component="img"
          src={TaskList}
          alt="Task List"
          sx={{
            width: "100%",
            maxWidth: "80%",
            ml: 30,
            display: "block",
          }}
        />
      </Box>
      <Box
        component="img"
        src={CirclesBg}
        alt="Circles Background"
        sx={{
          position: "absolute",
          width: "80%",
          height: "100%",
          top: "50%",
          left: "50%",
          transform: "translate(-20%, -50%)",
          zIndex: 1,
        }}
      />
    </>
  );
};

export default DesktopImageLayout;
