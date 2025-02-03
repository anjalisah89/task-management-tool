import { useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { IconClipboardText, IconLogout2 } from "@tabler/icons-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");

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
        paddingX: "4%",
        paddingY: "2%",
        backgroundColor: isMobile
          ? theme.palette.lightpink.main
          : theme.palette.white.main,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        {/* App title */}
        <IconClipboardText size={30} color="black" />
        <Typography variant="h6" fontWeight={500} color="black">
          TaskBuddy
        </Typography>
      </Box>
      {/* User account info */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          src={user.photoURL || "UserImage"}
          alt="Profile"
          sx={{ width: 36, height: 36 }}
        />
        <Typography variant="caption" color="textSecondary" fontWeight={800}>
          {user.displayName}
        </Typography>
        {/* Account Logout */}
        {!isMobile && (
          <Button
            startIcon={<IconLogout2 size={20} color="black" />}
            variant="outlined"
            color="primary"
            sx={{ borderRadius: 4, textTransform: "capitalize", fontSize: 12 }}
            onClick={logout}
          >
            Logout
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
