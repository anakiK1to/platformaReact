import React, { useState, useEffect } from 'react';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { getDishes, getProducts, createDish, updateDish } from "api/services"; // Предполагаем, что эти функции уже определены

const DishManagement = () => {
    const [dishes, setDishes] = useState<any[]>([]); // Состояние для хранения блюд
    const [products, setProducts] = useState<any[]>([]); // Состояние для хранения продуктов
    const [newDish, setNewDish] = useState({
        name: '',
        description: '',
        receipt: '',
        ingredients: [] as { productId: string, amount: number }[] // Массив для хранения ингредиентов
    }); // Для нового блюда
    const [editDish, setEditDish] = useState<any | null>(null); // Состояние для редактируемого блюда

    // Загружаем блюда с сервера
    const fetchDishes = async () => {
        try {
            const response = await getDishes(1, 100);
            setDishes(response.data.content || []);
        } catch (err) {
            console.error('Ошибка при загрузке блюд', err);
        }
    };

    // Загружаем продукты с сервера
    const fetchProducts = async () => {
        try {
            const response = await getProducts();
            setProducts(response.data.content || []);
        } catch (err) {
            console.error('Ошибка при загрузке продуктов', err);
        }
    };

    // Функция для создания нового блюда
    const handleCreateDish = async () => {
        try {
            const payload = {
                name: newDish.name,
                description: newDish.description,
                receipt: newDish.receipt,
                ingredients: newDish.ingredients.map(ingredient => ({
                    productId: ingredient.productId,
                    amount: ingredient.amount
                }))
            };

            console.log('Payload:', payload); // Логируем перед отправкой

            await createDish(payload);
            fetchDishes(); // Обновляем список после создания
            setNewDish({
                name: '',
                description: '',
                receipt: '',
                ingredients: []
            }); // Очищаем форму
        } catch (err) {
            alert('Ошибка при создании блюда: ' + err); // Убедитесь, что выводите точную ошибку
        }
    };

    // Функция для обновления блюда
    const handleUpdateDish = async () => {
        try {
            const payload = {
                name: newDish.name,
                description: newDish.description,
                receipt: newDish.receipt,
                ingredients: newDish.ingredients.map(ingredient => ({
                    productId: ingredient.productId,
                    amount: ingredient.amount
                }))
            };

            console.log('Payload для обновления:', payload);

            await updateDish(editDish.id, payload);
            fetchDishes(); // Обновляем список после обновления
            setEditDish(null); // Сбрасываем редактируемое блюдо
            alert('Блюдо '+ editDish.name + ' обновлено');
            setNewDish({
                name: '',
                description: '',
                receipt: '',
                ingredients: []
            });
        } catch (err) {
            alert('Ошибка при обновлении блюда: ' + err); // Выводим ошибку
        }
    };

    // Функция для добавления ингредиента
    const addIngredient = () => {
        setNewDish({
            ...newDish,
            ingredients: [...newDish.ingredients, { productId: '', amount: 0 }]
        });
    };

    // Функция для изменения ингредиента
    const handleIngredientChange = (index: number, field: string, value: any) => {
        // Логируем параметры для отладки
        console.log(`handleIngredientChange вызван. Индекс: ${index}, Поле: ${field}, Значение: ${value}`);

        // Делаем копию ингредиентов
        const updatedIngredients = [...newDish.ingredients];

        // Логируем текущий список ингредиентов до изменений
        console.log(`Текущий список ингредиентов: ${JSON.stringify(updatedIngredients)}`);

        // Обновляем конкретное поле ингредиента
        updatedIngredients[index] = { ...updatedIngredients[index], [field]: value };

        // Логируем обновленный список ингредиентов
        console.log(`Обновленный список ингредиентов: ${JSON.stringify(updatedIngredients)}`);

        // Обновляем состояние
        setNewDish({ ...newDish, ingredients: updatedIngredients });
    };

    // Заполняем форму данными для редактирования
    const handleEditDish = (dish: any) => {
        setEditDish(dish); // Заполняем данные для редактирования
        setNewDish({
            name: dish.name,
            description: dish.description,
            receipt: dish.receipt,
            ingredients: dish.ingredients.map((ingredient: any) => ({
                productId: ingredient.product.id,
                amount: ingredient.amount
            }))
        });
    };

    useEffect(() => {
        fetchDishes();
        fetchProducts();
    }, []);

    return (
        <div>
            <Typography variant="h4">Управление блюдами</Typography>

            {/* Форма для создания/редактирования блюда */}
            <div style={{ marginTop: 20 }}>
                <Typography variant="h5">{editDish ? 'Редактировать блюдо' : 'Создать новое блюдо'}</Typography>
                <TextField
                    label="Название блюда"
                    id="dish-name"
                    value={newDish.name}
                    onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Описание"
                    value={newDish.description}
                    onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Рецепт"
                    value={newDish.receipt}
                    onChange={(e) => setNewDish({ ...newDish, receipt: e.target.value })}
                    fullWidth
                    margin="normal"
                />

                {/* Выбор ингредиентов */}
                <Typography variant="h6" style={{ marginTop: 20 }}>Ингредиенты</Typography>
                {newDish.ingredients.map((ingredient, index) => (
                    <div key={index} style={{ marginBottom: 10 }}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Продукт</InputLabel>
                            <Select
                                value={ingredient.productId}
                                onChange={(e) => handleIngredientChange(index, 'productId', e.target.value)}
                            >
                                {products.map((product) => (
                                    <MenuItem key={product.id} value={product.id}>
                                        {product.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Количество"
                            type="number"
                            value={ingredient.amount}
                            onChange={(e) => handleIngredientChange(index, 'amount', Number(e.target.value))}
                            fullWidth
                            margin="normal"
                        />
                    </div>
                ))}
                <Button variant="outlined" onClick={addIngredient}>
                    Добавить ингредиент
                </Button>
                <br />
                <Button variant="contained" onClick={editDish ? handleUpdateDish : handleCreateDish} style={{ marginTop: 20 }}>
                    {editDish ? 'Обновить блюдо' : 'Создать блюдо'}
                </Button>
            </div>

            {/* Список всех блюд */}
            <Typography variant="h5" style={{ marginTop: 30 }}>
                Список блюд
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Название</TableCell>
                        <TableCell>Описание</TableCell>
                        <TableCell>Ингредиенты</TableCell>
                        <TableCell>Действия</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dishes.map((dish) => (
                        <TableRow key={dish.id}>
                            <TableCell>{dish.name}</TableCell>
                            <TableCell>{dish.description}</TableCell>
                            <TableCell>
                                {dish.ingredients.map((ingredient: any) => (
                                    <div key={ingredient.product.id}>
                                        {ingredient.product.name} - {ingredient.amount}
                                    </div>
                                ))}
                            </TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary" onClick={() => handleEditDish(dish)}>
                                    Редактировать
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default DishManagement;
