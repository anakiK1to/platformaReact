import React, { useState } from 'react';
import { Button, TextField, Container, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginPage: React.FC = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login: authenticate } = useAuth();

    const handleLoginClick = () => {
        if (login === 'user' && password === 'password') {
            authenticate(); // Установка статуса аутентификации
            navigate('/main');
        } else {
            console.log('Неверный логин или пароль');
        }
    };

    return (
        <Container maxWidth="xs">
            <Box textAlign="center" mt={4} mb={2}>
                <Typography variant="h6" fontWeight="bold">Вход в аккаунт</Typography>
            </Box>
            <TextField
                label="Логин"
                variant="outlined"
                fullWidth
                margin="normal"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
            />
            <TextField
                label="Пароль"
                variant="outlined"
                fullWidth
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
