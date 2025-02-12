import React, {useState, useEffect} from "react";
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
    IconButton,
    TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    getUsers,
    updateUserRoles,
    getPrisoners,
    deletePrisoner,
    addBars,
    subtractBars,
    getViolations,
    getRoles
} from "../../../api/services";

interface User {
    id: string;
    username: string;
    roles: string[];
    activated: boolean;
}

interface Prisoner {
    id: string;
    lastName: string;
    firstName: string;
    patronymic: string;
    weight: number;
    passport: string;
    birthDate: string;
    favoriteDish: { id: string; name: string };
    rating: number;
    isAlive: boolean;
}

interface Violation {
    code: string;
    name: string;
    score: number;
}

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [prisoners, setPrisoners] = useState<Prisoner[]>([]);
    const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
    const [loadingPrisoners, setLoadingPrisoners] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [violations, setViolations] = useState<Violation[]>([]);
    const [selectedViolations, setSelectedViolations] = useState<{ [id: string]: string }>({});
    const [roles, setRoles] = useState<string[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUsers(1, 100);
                setUsers(response.data.content);
                setLoadingUsers(false);
            } catch (err: any) {
                setError("Ошибка при загрузке пользователей");
                console.error(err);
                setLoadingUsers(false);
            }
        };


        const fetchRoles = async () => {
            try {
                const response = await getRoles();
                console.log("Roles response:", response.data.r);
                setRoles(response.data.roles); // Убедись, что сервер возвращает массив строк
            } catch (err) {
                console.error("Ошибка при загрузке ролей:", err);
                setRoles([]);
            }
        };


        const fetchPrisoners = async () => {
            try {
                const response = await getPrisoners(1, 100);
                setPrisoners(response.data.content);
                setLoadingPrisoners(false);
            } catch (err: any) {
                setError("Ошибка при загрузке заключенных");
                console.error(err);
                setLoadingPrisoners(false);
            }
        };

        const fetchViolations = async () => {
            try {
                const response = await getViolations();
                setViolations(response.data);
            } catch (err: any) {
                console.error("Ошибка при загрузке нарушений:", err);
            }
        };

        fetchUsers();
        fetchRoles()
        fetchPrisoners();
        fetchViolations();
    }, []);

    const handleDeletePrisoner = async (id: string) => {
        try {
            await deletePrisoner(id);
            setPrisoners((prev) => prev.filter((prisoner) => prisoner.id !== id));
        } catch (err) {
            console.error("Ошибка при удалении заключенного:", err);
            alert("Не удалось удалить заключенного.");
        }
    };

    const handleViolationChange = (prisonerId: string, violationCode: string) => {
        setSelectedViolations({...selectedViolations, [prisonerId]: violationCode});
    };

    const handleRoleChange = (userId: string, newRole: string) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === userId ? {...user, roles: [newRole]} : user // Обновляем роль, заменяя старые роли новым значением
            )
        );
    };

    const saveRoles = async () => {
        try {
            const updates = users.map((user) => ({
                userId: user.id,
                roles: user.roles, // Здесь передаем актуальные роли
            }));
            await Promise.all(updates.map((update) => updateUserRoles(update.userId, update.roles)));
            alert("Роли успешно сохранены!");
        } catch (err) {
            console.error("Ошибка при сохранении ролей:", err);
            alert("Не удалось сохранить роли.");
        }
    };


    const handleSubtractBars = async (prisonerId: string) => {
        const violationCode = selectedViolations[prisonerId];
        if (!violationCode) {
            alert("Выберите нарушение перед списанием баллов.");
            return;
        }

        try {
            await subtractBars({personId: prisonerId, violationCode});

            const violation = violations.find(v => v.code === violationCode);
            if (violation) {
                setPrisoners((prev) =>
                    prev.map((p) =>
                        p.id === prisonerId ? {...p, rating: p.rating - violation.score} : p
                    )
                );
            }
        } catch (err) {
            console.error("Ошибка при списании баллов:", err);
            alert("Не удалось списать баллы.");
        }
    };

    return (
        <Box >
            <Typography variant="h4" gutterBottom>Пользователи</Typography>

            {error && <Alert severity="error">{error}</Alert>}
            {loadingUsers ? <CircularProgress/> : (
                <Box>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Имя пользователя</TableCell>
                                <TableCell>Активирован</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell sx={{width: 150, minWidth: 150}} >{user.username}</TableCell>
                                    <TableCell sx={{width: 150, minWidth: 150}}>
                                        <Select
                                            sx  ={{minWidth: 120, width: 120}}
                                            value={user.roles.length > 0 ? user.roles[0] : ""} // Используем первое значение роли, если оно есть
                                            onChange={(e) => handleRoleChange(user.id, e.target.value)} // Правильное обновление роли
                                            MenuProps={{
                                                PaperProps: {
                                                    style: {
                                                        maxHeight: 200,
                                                    },
                                                },
                                            }}
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
                    <Button variant="contained" color="primary" onClick={saveRoles} sx={{mt: 2}}>
                        Назначить права
                    </Button>
                </Box>
            )}


            <Typography variant="h4" gutterBottom>
                Заключенные
            </Typography>

            {loadingPrisoners ? (
                <CircularProgress/>
            ) : (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Фамилия</TableCell>
                            <TableCell>Имя</TableCell>
                            <TableCell>Рейтинг</TableCell>
                            <TableCell>Списать баллы за нарушение</TableCell>
                            <TableCell>Любимое блюдо</TableCell>
                            <TableCell>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {prisoners.map((prisoner) => (
                            <TableRow key={prisoner.id}>
                                <TableCell>{prisoner.lastName}</TableCell>
                                <TableCell>{prisoner.firstName}</TableCell>
                                <TableCell>{prisoner.rating}</TableCell>
                                <TableCell>
                                    <Select
                                        value={selectedViolations[prisoner.id] || ""}
                                        onChange={(e) => handleViolationChange(prisoner.id, e.target.value)}
                                        displayEmpty
                                    >
                                        <MenuItem value="" disabled>Выберите нарушение</MenuItem>
                                        {violations.map((violation) => (
                                            <MenuItem key={violation.code} value={violation.code}>
                                                {violation.name} (-{violation.score})
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <Button onClick={() => handleSubtractBars(prisoner.id)} sx={{ml: 2}}>
                                        Списать
                                    </Button>
                                </TableCell>
                                <TableCell>{prisoner.favoriteDish.name}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDeletePrisoner(prisoner.id)} color="error">
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </Box>
    );
};

export default UsersPage;
