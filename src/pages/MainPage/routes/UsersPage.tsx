import React, { useState, useEffect } from "react";
import {
    Button,
    Select,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    CircularProgress,
    Alert,
    Box,
} from "@mui/material";
import { getUsers, updateUserRoles } from "../../../api/services"

interface User {
    id: string;
    username: string; // Поле "name" заменено на "username", чтобы соответствовать данным с сервера
    role: string;
    activated: boolean; // Добавлено поле "activated" для примера
}

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Роли, доступные для назначения
    const roles = ["ADMIN", "REGISTER", "PRISONER", "CHEF", "COOK", "ANALYST"];

    useEffect(() => {
        // Загружаем пользователей с сервера
        const fetchUsers = async () => {
            try {
                const response = await getUsers(); // Используем функцию из services.ts
                setUsers(response.data.content); // Учитываем структуру данных с поля `content`
                setLoading(false);
            } catch (err: any) {
                const errorMessage = err.response
                    ? `Сервер вернул ошибку: ${err.response.status} - ${err.response.statusText}`
                    : "Ошибка соединения с сервером";
                setError(errorMessage);
                console.error("Детали ошибки:", err);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleRoleChange = (userId: string, newRole: string) => {
        // Обновление роли в состоянии
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === userId ? { ...user, role: newRole } : user
            )
        );
    };

    const saveRoles = async () => {
        try {
            // Отправка данных на сервер
            const updates = users.map((user) => ({
                userId: user.id,
                roles: [user.role], // Преобразуем роль в массив, так как API ожидает массив ролей
            }));
            await Promise.all(
                updates.map((update) =>
                    updateUserRoles(update.userId, update.roles) // Используем API для обновления ролей
                )
            );
            alert("Роли успешно сохранены!");
        } catch (err) {
            console.error("Ошибка при сохранении ролей:", err);
            alert("Не удалось сохранить роли.");
        }
    };

    if (loading) {
        return (
            <Box textAlign="center" mt={4}>
                <CircularProgress />
                <Typography mt={2}>Загрузка пользователей...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box textAlign="center" mt={4}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Управление пользователями
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Имя пользователя</TableCell>
                        <TableCell>Активирован</TableCell>
                        <TableCell>Роль</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.activated ? "Да" : "Нет"}</TableCell>
                            <TableCell>
                                <Select
                                    value={user.role}
                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                >
                                    {roles.map((role) => (
                                        <MenuItem key={role} value={role}>
                                            {role}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button
                variant="contained"
                color="primary"
                onClick={saveRoles}
                style={{ marginTop: "20px" }}
            >
                Назначить права
            </Button>
        </div>
    );
};

export default UsersPage;
