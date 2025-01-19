// components/ChefDashboard.tsx
import React, { useState } from "react";
import { Button, TextField, Container, Typography, List, ListItem, ListItemText } from "@mui/material";

const ChefDashboard: React.FC = () => {
    const [menu, setMenu] = useState<string[]>([]);
    const [dish, setDish] = useState("");

    const addDish = () => {
        setMenu([...menu, dish]);
        setDish("");
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: "50px" }}>
            <Typography variant="h5" gutterBottom>
                Обновление меню
            </Typography>
            <TextField
                fullWidth
                label="Новое блюдо"
                value={dish}
                onChange={(e) => setDish(e.target.value)}
                margin="normal"
            />
            <Button fullWidth variant="contained" onClick={addDish} style={{ marginBottom: "20px" }}>
                Добавить
            </Button>
            <Typography variant="h6">Текущее меню:</Typography>
            <List>
                {menu.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={item} />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default ChefDashboard;
