import React, { useState } from "react";
import { Button, TextField, Container, Box, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authenticateUser } from "../../api/services"; // импортируйте функцию

const LoginPage: React.FC = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLoginClick = async () => {
        try {
            // Отправляем запрос на сервер для проверки логина и пароля
            const response = await authenticateUser({ username: login, password });

            // Если успешный ответ
            if (response.status === 200) {
                // Сохраняем токен в localStorage
                const { token } = response.data;
                localStorage.setItem("authToken", token); // сохраняем токен

                // Перенаправляем на основную страницу
                navigate("/main");
            }
        } catch (error: any) {
            // Обрабатываем ошибку
            if (error.response && error.response.status === 401) {
                setError('Неверный логин или пароль');
            } else {
                setError('Ошибка подключения к серверу');
            }
        }
    };



    return (
        <Container maxWidth="xs">
            <Box textAlign="center" mt={4} mb={2}>
                <Typography variant="h6" fontWeight="bold">Вход в аккаунт</Typography>
            </Box>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <TextField
                label="Логин"
                variant="outlined"
                fullWidth
                id="login"
                name="login"
                margin="normal"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
            />
            <TextField
                label="Пароль"
                variant="outlined"
                fullWidth
                id="password"
                name="password"
                margin="normal"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleLoginClick}
                style={{ marginTop: '16px', borderRadius: '12px' }}
            >
                Войти
            </Button>
        </Container>
    );
};

export default LoginPage;
