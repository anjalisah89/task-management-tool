import { Box, keyframes, useMediaQuery, useTheme } from "@mui/material";

// Define the animation
const loadingAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(15px);
  }
  100% {
    transform: translateY(0);
  }
`;

const Loading = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box
        sx={{
          width: isMobile ? "24%" : "8%",
          height: "4%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
          }}
        >
          {[0, 1, 2].map((index) => (
            <Box
              key={index}
              sx={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                backgroundColor: theme.palette.pink.main,
                animation: `${loadingAnimation} 0.6s ${
                  index * 0.2
                }s linear infinite`,
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Loading;
