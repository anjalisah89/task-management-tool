import { useEffect } from "react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { IconClipboardText } from "@tabler/icons-react";
import GoogleIcon from "@/assets/google-icon.svg";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import DesktopImageLayout from "@/components/ui/DesktopImageLayout";
import MobileImageLayout from "@/components/ui/MobileImageLayout";

const Login = () => {
  const { user, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: isMobile ? "2rem" : "4rem",
        position: "relative",
        overflow: "hidden",
        flexDirection: isMobile ? "column" : "row",
        textAlign: isMobile ? "center" : "left",
      }}
    >
      <Box sx={{ width: isMobile ? "90%" : "40%", zIndex: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            justifyContent: isMobile ? "center" : "flex-start",
          }}
        >
          {/* app icon badge and name */}
          <IconClipboardText size={40} color="purple" />
          <Typography variant="h5" fontWeight={700} color="primary">
            TaskBuddy
          </Typography>
        </Box>
        {/* app description or motto */}
        <Typography
          variant="subtitle2"
          fontSize={isMobile ? 10 : 12}
          fontWeight={600}
          mt={1}
          color="black"
        >
          Streamline your workflow and track progress effortlessly <br />
          with our all-in-one task management app.
        </Typography>
        {/* google authentication */}
        <Button
          variant="contained"
          color="black"
          onClick={loginWithGoogle}
          sx={{
            mt: 4,
            px: isMobile ? 4 : 10,
            py: isMobile ? 1 : 2,
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            gap: 1,
            textTransform: "capitalize",
            fontWeight: 800,
            fontSize: isMobile ? 14 : 16,
            mx: isMobile ? "auto" : "inherit",
          }}
        >
          <Box
            component="img"
            src={GoogleIcon}
            sx={{ width: 20, height: 20 }}
            alt="Google"
          />
          Continue with Google
        </Button>
      </Box>
      {/* image components */}
      {isMobile ? <MobileImageLayout /> : <DesktopImageLayout />}
    </Box>
  );
};

export default Login;
