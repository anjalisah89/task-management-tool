import { Box, Button, Typography, Avatar } from "@mui/material";
import { IconClipboardText, IconLogout2 } from "@tabler/icons-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Navbar = () => {
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
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconClipboardText size={30} color="black" />
        <Typography variant="h6" fontWeight={500} color="black">
          TaskBuddy
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          src={user.photoURL || "UserImage"}
          alt="Profile"
          sx={{ width: 36, height: 36 }}
        />
        <Typography variant="caption" color="textSecondary" fontWeight={800}>
          {user.displayName}
        </Typography>
        <Button
          startIcon={<IconLogout2 size={20} color="black" />}
          variant="outlined"
          color="primary"
          sx={{ borderRadius: 4, textTransform: "capitalize", fontSize: 12 }}
          onClick={logout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Navbar;
