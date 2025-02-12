import React, { useEffect, useState } from 'react';
import { Button, Typography, Box, CircularProgress } from '@mui/material';
import {
    startPlatform,
    finishPlatform,
    downPlatform,
    getPlatformStatus,
    getActiveFloor,
    getDistributeAvailability,
} from 'api/services';

const PlatformController: React.FC = () => {
    const [platformStatus, setPlatformStatus] = useState<any | null>(null);
    const [activeFloor, setActiveFloor] = useState<any | null>(null);
    const [distributeAvailability, setDistributeAvailability] = useState<any | null>(null);
    const [platformStructure, setPlatformStructure] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    // Получаем информацию о платформе
    const fetchPlatformStatus = async () => {
        try {
            const statusResponse = await getPlatformStatus();
            setPlatformStatus(statusResponse.data);
        } catch (error) {
            console.error('Ошибка при получении состояния платформы:', error);
        }
    };

    // Получаем активный этаж
    const fetchActiveFloor = async () => {
        try {
            const floorResponse = await getActiveFloor();
            setActiveFloor(floorResponse.data);
        } catch (error) {
            console.error('Ошибка при получении активного этажа:', error);
        }
    };

    // Получаем доступность распределения
    const fetchDistributeAvailability = async () => {
        try {
            const availabilityResponse = await getDistributeAvailability();
            setDistributeAvailability(availabilityResponse.data);
        } catch (error) {
            console.error('Ошибка при получении доступности распределения:', error);
        }
    };

    // Получаем структуру платформы
    const fetchPlatformStructure = async () => {
        try {
            const structureResponse = await getPlatformStatus();
            setPlatformStructure(structureResponse.data);
        } catch (error) {
            console.error('Ошибка при получении структуры платформы:', error);
        }
    };

    // Опускаем платформу на этаж вниз
    const handleLowerFloor = async () => {
        try {
            await getActiveFloor();
            fetchActiveFloor(); // Обновляем активный этаж
        } catch (error) {
            console.error('Ошибка при опускании платформы:', error);
        }
    };

    // Функции управления платформой
    const handleStart = async () => {
        try {
            await startPlatform();
            fetchPlatformStatus(); // Перезагружаем состояние платформы
        } catch (error) {
            console.error('Ошибка при старте платформы:', error);
        }
    };

    const handleFinish = async () => {
        try {
            await finishPlatform();
            fetchPlatformStatus(); // Перезагружаем состояние платформы
        } catch (error) {
            console.error('Ошибка при завершении работы платформы:', error);
        }
    };

    const handlePlatformDown = async () => {
        try {
            await downPlatform();
            fetchPlatformStatus(); // Перезагружаем состояние платформы
        } catch (error) {
            console.error('Ошибка при остановке платформы:', error);
        }
    };

    // Используем useEffect для начальной загрузки данных
    useEffect(() => {
        setLoading(true);
        fetchPlatformStatus();
        fetchActiveFloor();
        fetchDistributeAvailability();
        fetchPlatformStructure();
        setLoading(false);

        const intervalId = setInterval(() => {
            fetchPlatformStatus();
            fetchActiveFloor();
            fetchDistributeAvailability();
            fetchPlatformStructure();
            console.log("platforma edet")
        }, 1000);

        // Очистка таймера при размонтировании компонента
        return () => clearInterval(intervalId);
    }, []);

    return (
        <Box>
            <Typography variant="h4" gutterBottom>Платформа</Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 3,
                    }}
                >
                    <Box>
                        <Typography variant="h5">Состояние платформы</Typography>
                        {/*<Box sx={{ marginBottom: 2 }}>*/}
                        {/*    <Typography variant="body1">Текущий статус:</Typography>*/}
                        {/*    <Typography variant="body2">*/}
                        {/*        {platformStatus?.isActive ? 'Активна' : 'Неактивна'}*/}
                        {/*    </Typography>*/}
                        {/*</Box>*/}
                        <Box sx={{ marginBottom: 2 }}>
                            <Typography variant="body1">Активный этаж:</Typography>
                            <Typography variant="body2">{activeFloor?.activeFloor}</Typography>
                        </Box>
                        <Box sx={{ marginBottom: 2 }}>
                            <Typography variant="body1">Доступность распределения:</Typography>
                            <Typography variant="body2">
                                {distributeAvailability?.isAvailable ? 'Доступно' : 'Не доступно'}
                            </Typography>
                        </Box>
                    </Box>

                    <Box>
                        <Typography variant="h5">Структура платформы</Typography>
                        <Box sx={{ marginBottom: 2 }}>
                            {platformStructure?.content && platformStructure.content.length > 0 ? (
                                platformStructure.content.map((floor: any) => (
                                    <Box key={floor.floor} sx={{ marginBottom: 2 }}>
                                        <Typography variant="body1">Этаж: {floor.floor}</Typography>
                                        <Typography variant="body2">
                                            Статус этажа: {floor.isActive ? 'Активен' : 'Неактивен'}
                                        </Typography>
                                        <Box sx={{ marginTop: 1 }}>
                                            <Typography variant="body1">Заключенные:</Typography>
                                            {floor.firstPrisoner ? (
                                                <Typography variant="body2">
                                                    1. {floor.firstPrisoner.firstName} {floor.firstPrisoner.lastName} - {floor.firstPrisoner.rating} баллов
                                                </Typography>
                                            ) : null}
                                            {floor.secondPrisoner ? (
                                                <Typography variant="body2">
                                                    2. {floor.secondPrisoner.firstName} {floor.secondPrisoner.lastName} - {floor.secondPrisoner.rating} баллов
                                                </Typography>
                                            ) : null}
                                        </Box>
                                    </Box>
                                ))
                            ) : (
                                <Typography variant="body2">Структура платформы не доступна.</Typography>
                            )}
                        </Box>
                    </Box>

                    {/* Размещение кнопок управления платформой под состоянием */}
                    <Box sx={{ gridColumn: 'span 2' }}>
                        <Typography variant="h5">Управление платформой</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Button variant="contained" color="primary" onClick={handleStart}>
                                Запустить платформу
                            </Button>
                            <Button variant="contained" color="secondary" onClick={handleFinish}>
                                Завершить работу платформы
                            </Button>
                            <Button variant="contained" color="error" onClick={handlePlatformDown}>
                                Остановить платформу
                            </Button>
                            <Button variant="contained" color="warning" onClick={handlePlatformDown}>
                                Опустить платформу вниз
                            </Button>
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default PlatformController;
