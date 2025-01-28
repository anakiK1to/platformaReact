// src/pages/PlatformSimulationPage.tsx
import React from "react";
import { Box, Button, Typography } from "@mui/material";

const PlatformSimulationPage = () => {
  const startSimulation = () => {
    console.log("Simulation started!"); // Replace with logic
  };

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>Platform Simulation</Typography>
      <Button variant="contained" color="primary" onClick={startSimulation}>Start Simulation</Button>
    </Box>
  );
};

export default PlatformSimulationPage;
