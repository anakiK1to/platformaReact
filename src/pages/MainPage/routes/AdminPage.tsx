// components/AdminPage.tsx
import React from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const AdminPage: React.FC = () => {
    const users = [
        { id: 1, name: "Иван Иванов", role: "Заключённый", status: "Активен" },
        { id: 2, name: "Мария Петрова", role: "Заключённый", status: "Активен" },
        { id: 3, name: "Мария Петрова", role: "Заключённый", status: "Активен" },
        { id: 4, name: "Мария Петрова", role: "Заключённый", status: "Не Активен" },
        { id: 5, name: "Мария Петрова", role: "Заключённый", status: "Не Активен" },
        { id: 6, name: "Мария Петрова", role: "Повар", status: "Активен" },
        { id: 7, name: "Мария Петрова", role: "Повар", status: "Активен" },
        { id: 8, name: "Мария Петрова", role: "Повар", status: "Активен" },

    ];

    return (
        <TableContainer component={Paper} style={{ marginTop: "50px" }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Имя</TableCell>
                        <TableCell>Роль</TableCell>
                        <TableCell>Статус</TableCell>
                        <TableCell>Действия</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>{user.status}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="secondary" size="small">
                                    Удалить
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AdminPage;
