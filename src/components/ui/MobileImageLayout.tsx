import { Box } from "@mui/material";
import CirclesBg from "@/assets/circles_bg.svg";

const MobileImageLayout = () => {
  return (
    <Box>
      <Box
        component="img"
        src={CirclesBg}
        alt="Circles Background"
        sx={{
          position: "absolute",
          width: "40%",
          top: "-6%",
          right: "-5%",
          transform: "rotate(270deg)",
          zIndex: 1,
        }}
      />
      <Box
        component="img"
        src={CirclesBg}
        alt="Circles Background"
        sx={{
          position: "absolute",
          width: "40%",
          top: "20%",
          left: "-15%",
          zIndex: 1,
          transform: "rotate(150deg)",
        }}
      />
      <Box
        component="img"
        src={CirclesBg}
        alt="Circles Background"
        sx={{
          position: "absolute",
          width: "40%",
          bottom: "10%",
          right: "30%",
          zIndex: 1,
          transform: "rotate(30deg)",
        }}
      />
    </Box>
  );
};

export default MobileImageLayout;
