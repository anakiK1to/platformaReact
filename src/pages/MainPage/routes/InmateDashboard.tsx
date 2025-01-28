import React from "react";
import { Container, Typography, Button, Card, CardContent, Grid } from "@mui/material";

const InmateDashboard: React.FC = () => {
    const dishes = [
        { id: 1, name: "Борщ", description: "Традиционный русский суп" },
        { id: 2, name: "Каша", description: "Овсяная каша на молоке" },
    ];

    return (
        <Container maxWidth="md" style={{ marginTop: "50px" }}>
            <Typography variant="h5" gutterBottom>
                Личный кабинет заключённого
            </Typography>
            <Typography variant="h6" gutterBottom>
                Выберите любимое блюдо:
            </Typography>
            <Grid container spacing={2}>
                {dishes.map((dish) => (
                    <Grid item xs={12} sm={6} key={dish.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{dish.name}</Typography>
                                <Typography variant="body2">{dish.description}</Typography>
                                <Button variant="outlined" style={{ marginTop: "10px" }}>
                                    Выбрать
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default InmateDashboard;
