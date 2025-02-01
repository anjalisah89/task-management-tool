import { Box } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import TabSection from "./TabSection";

const Dashboard = () => {
  const { user } = useAuth();
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
    // App dashboard
    <Box sx={{ overflowX: "hidden" }}>
      <Navbar />
      <TabSection />
    </Box>
  );
};

export default Dashboard;
