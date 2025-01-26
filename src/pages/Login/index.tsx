import { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { IconClipboardText } from "@tabler/icons-react";
import GoogleIcon from "@/assets/google-icon.svg";
import CirclesBg from "@/assets/circles_bg.svg";
import TaskBox from "@/components/TaskBox";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

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
        padding: "3rem",
        position: "relative",
        overflow: "hidden",
        width: "100vw",
      }}
    >
      <Box sx={{ width: "40%", textAlign: "left" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconClipboardText size={40} color="purple" />
          <Typography variant="h5" fontWeight={700} color="primary">
            TaskBuddy
          </Typography>
        </Box>
        <Typography
          variant="subtitle2"
          fontSize={14}
          fontWeight={600}
          mt={1}
          color="text.secondary"
        >
          Streamline your workflow and track progress effortlessly <br />
          with our all-in-one task management app.
        </Typography>

        <Button
          variant="contained"
          color="black"
          onClick={loginWithGoogle}
          sx={{
            mt: 2,
            px: 6,
            py: 1.2,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            component="img"
            src={GoogleIcon}
            sx={{ width: 20, height: 20 }}
          />
          Continue with Google
        </Button>
      </Box>

      <Box sx={{ width: "50%" }}>
        <TaskBox />
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
          left: "40%",
          transform: "translate(-20%, -50%)",
          zIndex: 1,
        }}
      />
    </Box>
  );
};

export default Login;
