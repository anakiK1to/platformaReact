import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    CircularProgress,
    MenuItem,
    TextField,
    Typography,
    Select,
    FormControl,
    InputLabel,
} from '@mui/material';
import { createPrisoner } from "../../../api/services";
import { getDishes } from "../../../api/services";

interface ServDish {
    id: string;
    name: string;
}

const RegistrationScreen: React.FC = () => {
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [passport, setPassport] = useState('');
    const [password, setPassword] = useState('');
    const [showIndicator, setShowIndicator] = useState(false);
    const [availableDishes, setAvailableDishes] = useState<ServDish[]>([]);
    const [selectedDish, setSelectedDish] = useState<string | null>(null);

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const response = await getDishes();
                setAvailableDishes(response.data.content || []);
            } catch (error) {
                console.error('Ошибка при загрузке блюд:', error);
            }
        };

        fetchDishes();
    }, []);

    const handleRegistration = async () => {
        if (!lastName || !firstName || !passport || !birthDate || !height || !weight || !password) {
            alert('Все поля обязательны для заполнения');
            return;
        }

        setShowIndicator(true);

        const prisonerData = {
            lastName,
            firstName,
            patronymic,
            passport,
            weight,
            birthDate,
            favoriteDishName: selectedDish || '',
            password
        };

        try {
            await createPrisoner(prisonerData);
            alert('Заключенный успешно зарегистрирован!');

            // Очистка формы
            setLastName('');
            setFirstName('');
            setPatronymic('');
            setPassport('');
            setHeight('');
            setWeight('');
            setBirthDate('');
            setPassport('')
            setSelectedDish(null);
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
            alert('Ошибка при регистрации заключенного' + error);
        } finally {
            setShowIndicator(false);
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f0f0f0">
            <Box>
                <Typography variant="h6" textAlign="center" fontWeight="bold">
                    Регистрация нового заключенного
                </Typography>
                <Typography variant="subtitle1" textAlign="center" gutterBottom>
                    Заполните все поля для регистрации
                </Typography>

                <TextField label="Фамилия" value={lastName} onChange={(e) => setLastName(e.target.value)} fullWidth margin="normal" />
                <TextField label="Имя" value={firstName} onChange={(e) => setFirstName(e.target.value)} fullWidth margin="normal" />
                <TextField label="Отчество" value={patronymic} onChange={(e) => setPatronymic(e.target.value)} fullWidth margin="normal" />
                <TextField label="Паспорт" value={passport} onChange={(e) => setPassport(e.target.value)} fullWidth margin="normal" />
                {/*<TextField label="Дата рождения" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />*/}
                <TextField label="Дата рождения" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} fullWidth margin="normal" />
                <Box display="flex" gap={2}>
                    <TextField label="Рост (см)" value={height} onChange={(e) => setHeight(e.target.value)} fullWidth margin="normal" type="number" />
                    <TextField label="Вес (кг)" value={weight} onChange={(e) => setWeight(e.target.value)} fullWidth margin="normal" type="number" />
                </Box>

                <FormControl fullWidth margin="normal">
                    <InputLabel id="dish-select-label">Выберите блюдо</InputLabel>
                    <Select labelId="dish-select-label" value={selectedDish || ''} onChange={(e) => setSelectedDish(e.target.value)}>
                        {availableDishes.map((dish) => (
                            <MenuItem key={dish.id} value={dish.id}>
                                {dish.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField label="Пароль"  value={password} onChange={(e) => setPassword(e.target.value)} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
                <Box mt={4} textAlign="center">
                    <Button variant="contained" color="primary" fullWidth onClick={handleRegistration} disabled={showIndicator}>
                        {showIndicator ? <CircularProgress size={24} /> : 'Подтвердить регистрацию'}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default RegistrationScreen;