import React, { useState } from "react";
import { Button, Select, MenuItem, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

interface User {
    id: string;
    name: string;
    role: string;
}

const UsersPage: React.FC = () => {
    // Мок данные пользователей
    const mockUsers: User[] = [
        { id: "1", name: "Иван Иванов", role: "Регистратор" },
        { id: "2", name: "Петр Петров", role: "Заключенный" },
        { id: "3", name: "Анна Смирнова", role: "Аналитик" },
        { id: "4", name: "Мария Кузнецова", role: "Шеф-повар" },
    ];

    const [users, setUsers] = useState<User[]>(mockUsers);

    // Роли, доступные для назначения
    const roles = ["Администратор", "Регистратор", "Заключенный", "Шеф-повар", "Повар", "Аналитик"];

    const handleRoleChange = (userId: string, newRole: string) => {
        // Обновление роли в состоянии
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === userId ? { ...user, role: newRole } : user
            )
        );
    };

    const saveRoles = () => {
        // Симуляция сохранения ролей
        console.log("Сохраненные данные:", users);
        // alert("Роли успешно сохранены (мок данные).");
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Управление пользователями
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Имя</TableCell>
                        <TableCell>Роль</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
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
