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

interface ServDish {
    id: string;
    name: string;
    description: string;
    receipt: string;
    ingredients: any[];
}

interface RegisterPrisonerModel {
    lastName: string;
    firstName: string;
    patronymic: string;
    passport: string;
    weight: number;
    height: number;
    birthDate: string;
    favoriteDish: string;
}

const RegistrationScreen: React.FC = () => {
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [passport, setPassport] = useState('');
    const [showIndicator, setShowIndicator] = useState(false);
    const [availableDishes, setAvailableDishes] = useState<ServDish[]>([]);
    const [selectedDish, setSelectedDish] = useState<string | null>(null);

    useEffect(() => {
        // Try to load the saved data from localStorage
        const savedPrisoner = localStorage.getItem('prisonerData');
        if (savedPrisoner) {
            const data = JSON.parse(savedPrisoner);
            setLastName(data.lastName);
            setFirstName(data.firstName);
            setPatronymic(data.patronymic);
            setPassport(data.passport);
            setHeight(data.height);
            setWeight(data.weight);
            setBirthDate(data.birthDate);
            setSelectedDish(data.favoriteDish);
        }

        // Simulate fetching dishes from server
        setTimeout(() => {
            setAvailableDishes([
                {
                    id: '1',
                    name: 'Пельмени',
                    description: 'Очень вкусные пельмени',
                    receipt: 'Просто варите',
                    ingredients: [],
                },
                {
                    id: '2',
                    name: 'Борщ',
                    description: 'Традиционный борщ',
                    receipt: 'Сварите с любовью',
                    ingredients: [],
                },
            ]);
        }, 500);
    }, []);

    const handleRegistration = async () => {
        if (!lastName || !firstName || !passport || !birthDate || !height || !weight) {
            alert('Все поля обязательны для заполнения');
            return;
        }

        setShowIndicator(true);
        const prisonerModel: RegisterPrisonerModel = {
            lastName,
            firstName,
            patronymic,
            passport,
            weight: parseInt(weight, 10),
            height: parseInt(height, 10),
            birthDate,
            favoriteDish: selectedDish || '',
        };

        console.log('Registering prisoner:', prisonerModel);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

        // Save data to localStorage
        localStorage.setItem('prisonerData', JSON.stringify(prisonerModel));

        setShowIndicator(false);
        alert('Заключенный успешно зарегистрирован!');

        // Clear form fields after registration
        setLastName('');
        setFirstName('');
        setPatronymic('');
        setPassport('');
        setHeight('');
        setWeight('');
        setBirthDate('');
        setSelectedDish(null);
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f0f0f0">
            <Box width={450} bgcolor="white" p={4} borderRadius={4} boxShadow={3}>
                <Typography variant="h6" textAlign="center" fontWeight="bold">
                    Регистрация нового заключенного
                </Typography>
                <Typography variant="subtitle1" textAlign="center" gutterBottom>
                    Заполните все поля для регистрации
                </Typography>

                <TextField
                    label="Фамилия"
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Имя"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Отчество"
                    id="patronymic"
                    name="patronymic"
                    value={patronymic}
                    onChange={(e) => setPatronymic(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Паспорт"
                    id="passport"
                    name="passport"
                    value={passport}
                    onChange={(e) => setPassport(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Дата рождения"
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
                <Box display="flex" gap={2}>
                    <TextField
                        label="Рост (см)"
                        id="height"
                        name="height"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        fullWidth
                        margin="normal"
                        type="number"
                    />
                    <TextField
                        label="Вес (кг)"
                        id="weight"
                        name="weight"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        fullWidth
                        margin="normal"
                        type="number"
                    />
                </Box>

                <FormControl fullWidth margin="normal">
                    <InputLabel id="dish-select-label">Выберите блюдо</InputLabel>
                    <Select
                        labelId="dish-select-label"
                        id="favoriteDish"
                        value={selectedDish || ''}
                        onChange={(e) => setSelectedDish(e.target.value)}
                    >
                        {availableDishes.map((dish) => (
                            <MenuItem key={dish.id} value={dish.id}>
                                {dish.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Box mt={4} textAlign="center">
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleRegistration}
                        disabled={showIndicator}
                    >
                        {showIndicator ? (
                            <CircularProgress size={24} />
                        ) : (
                            'Подтвердить регистрацию'
                        )}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default RegistrationScreen;
