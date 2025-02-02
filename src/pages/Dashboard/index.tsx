import { Box, useMediaQuery } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import TabSection from "@/pages/Dashboard/TabSection";
import TaskPanel from "@/components/TaskPanel";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
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
    // App dashboard
    <Box sx={{ overflowX: "hidden" }}>
      <Navbar />
      {isMobile ? <TaskPanel selectedTab={0} /> : <TabSection />}
    </Box>
  );
};

export default Dashboard;
