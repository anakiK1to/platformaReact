// src/pages/MenuUpdatePage.tsx
import React from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

const MenuUpdatePage = () => {
  const mockMenu = ["Spaghetti", "Chicken Curry"]; // Replace with API call

  const handleMenuUpdate = (index: number, newDish: string) => {
    console.log(`Updated dish ${index} to ${newDish}`); // Replace with API call
  };

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>Update Menu</Typography>
      <Grid container spacing={2}>
        {mockMenu.map((dish, index) => (
          <Grid item xs={12} key={index}>
            <TextField
              fullWidth
              defaultValue={dish}
              onBlur={(e) => handleMenuUpdate(index, e.target.value)}
              label="Dish Name"
              variant="outlined"
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button variant="contained" color="secondary">Save Changes</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MenuUpdatePage;
