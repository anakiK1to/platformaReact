// src/pages/MainPage/routes/DishSelectionPage.tsx
import React, { useEffect, useState } from "react";
import { Box, Button, Grid, MenuItem, Select, Typography } from "@mui/material";
import { fetchPrisoners, updatePrisonerDish, Prisoner } from "../../../api";

const mockMenu = ["Spaghetti", "Chicken Curry", "Vegetable Salad", "Beef Stroganoff"]; // Replace with API data

const DishSelectionPage = () => {
  const [prisoners, setPrisoners] = useState<Prisoner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Загрузка списка заключенных с сервера
  useEffect(() => {
    const loadPrisoners = async () => {
      setLoading(true);
      const data = await fetchPrisoners();
      setPrisoners(data);
      setLoading(false);
    };
    loadPrisoners();
  }, []);

  const handleDishSelection = async (prisonerId: number, dish: string) => {
    setLoading(true);
    const updatedPrisoners = await updatePrisonerDish(prisonerId, dish);
    setPrisoners(updatedPrisoners);
    setLoading(false);
  };

  const saveSelections = () => {
    console.log("Updated favorite dishes:", prisoners); // Здесь можно отправить данные на сервер
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Select Favorite Dishes for All Prisoners
      </Typography>
      <Grid container spacing={2}>
        {prisoners.map((prisoner) => (
          <Grid item xs={12} key={prisoner.id}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography>{prisoner.name}</Typography>
              <Select
                value={prisoner.favoriteDish || ""}
                onChange={(e) => handleDishSelection(prisoner.id, e.target.value)}
                displayEmpty
                style={{ minWidth: 200 }}
              >
                <MenuItem value="">No Selection</MenuItem>
                {mockMenu.map((dish, index) => (
                  <MenuItem key={index} value={dish}>
                    {dish}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={saveSelections}>
            Save Selections
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DishSelectionPage;
