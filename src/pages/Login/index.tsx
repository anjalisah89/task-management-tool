import { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { IconClipboardText } from "@tabler/icons-react";
import GoogleIcon from "@/assets/google-icon.svg";
import CirclesBg from "@/assets/circles_bg.svg";
import TaskList from "@/assets/Task_list.svg";
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
        padding: "4rem",
        position: "relative",
        overflow: "hidden",
        width: "100vw",
      }}
    >
      <Box sx={{ width: "40%", textAlign: "left", zIndex: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconClipboardText size={40} color="purple" />
          <Typography variant="h5" fontWeight={700} color="primary">
            TaskBuddy
          </Typography>
        </Box>
        <Typography
          variant="subtitle2"
          fontSize={12}
          fontWeight={600}
          mt={1}
          color="black"
        >
          Streamline your workflow and track progress effortlessly <br />
          with our all-in-one task management app.
        </Typography>

        <Button
          variant="contained"
          color="black"
          onClick={loginWithGoogle}
          sx={{
            mt: 4,
            px: 10,
            py: 2,
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            gap: 1,
            textTransform: "capitalize",
            fontWeight: 800,
            fontSize: 16,
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
    </Box>
  );
};

export default Login;
