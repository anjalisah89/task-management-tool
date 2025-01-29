import { Box, Button, Typography } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h4">Welcome, {user.displayName}</Typography>
      <img
        src={user.photoURL || "Image"}
        alt="Profile"
        style={{ width: 50, borderRadius: "50%", marginTop: 10 }}
      />
      <Button variant="contained" color="error" onClick={logout} sx={{ mt: 3 }}>
        Logout
      </Button>
    </Box>
  );
};

export default Dashboard;
