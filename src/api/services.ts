// api/services.ts
import api from "./axiosInstance";
import axios from "axios";

// Product Controller
export const getProduct = (id: string) => api.get(`/private/products/${id}`);
export const updateProduct = (id: string, data: any) => api.put(`/private/products/${id}`, data);
export const deleteProduct = (id: string) => api.delete(`/private/products/${id}`);
export const createProduct = (data: any) => api.post(`/private/products`, data);
export const getProducts = (page: number = 1, size: number = 100) =>
    api.get(`/private/products`, { params: { page, size } })

// Prisoner Controller
export const getPrisoner = (id: string) => api.get(`/private/prisoners/${id}`);
export const updatePrisoner = (id: string, data: any) => api.put(`/private/prisoners/${id}`, data);
export const deletePrisoner = (id: string) => api.delete(`/private/prisoners/${id}`);
export const createPrisoner = (data: any) => api.post(`/private/prisoners`, data);
export const getPrisoners = (page: number = 1, size: number = 10) =>
    api.get(`/private/prisoners`, { params: { page, size } }); // добавлена пагинация

// Dish Controller
export const getDish = (id: string) => api.get(`/private/dishes/${id}`);
export const updateDish = (id: string, data: any) => api.put(`/private/dishes/${id}`, data);
export const deleteDish = (id: string) => api.delete(`/private/dishes/${id}`);
export const createDish = (data: any) => api.post(`/private/dishes`, data);
export const getDishes = (page: number = 1, size: number = 100) =>
    api.get(`/private/dishes`, { params: { page, size } }); // добавлена пагинация

// User Controller
export const getUsers = (page: number = 1, size: number = 100) =>
    api.get(`/private/users`, { params: { page, size } }); // уже с пагинацией
export const createUser = (data: any) => api.post(`/private/users`, data);
export const deleteUser = (userId: string) => api.delete(`/private/users/${userId}`);
export const updateUserRoles = (userId: string, roles: string[]) =>
    api.patch(`/private/users/${userId}`, { roles });

// Authentication Controller
export const authenticateUser = (data: { username: string; password: string }) =>
    axios.create({
        baseURL: "http://localhost:8080",
        headers: {
            "Content-Type": "application/json",
        },
    }).post(`/api/v1/authenticate`, data);

// My Prisoner Controller
export const pickDishes = (data: { dishId: string; amount: number }[]) =>
    api.put(`/me/prisoners/pick-dishes`, data);
export const getFloorInfo = () => api.get(`/me/prisoners/floor`);
export const getCurrentMenu = () => api.get(`/me/prisoners/current-menu`);

// Bars Controller
export const subtractBars = (data: { personId: string; violationCode: string }) =>
    api.post(`/private/bars/subtract`, data);
export const addBars = (data: { personId: string; score: number }) =>
    api.post(`/private/bars/add`, data);
export const getViolations = (page: number = 1, size: number = 100) =>
    api.get(`/private/bars/violations`, { params: { page, size } });

// Role Controller
export const getRoles = () => api.get(`/private/roles`);

// Current Menu Controller
export const getMenu = () => api.get(`/private/menu`);


// Platform Controller

// Запуск платформы
export const startPlatform = () => api.put(`/private/platform/start`);

// Завершение работы платформы
export const finishPlatform = () => api.put(`/private/platform/finish`);

// Остановка платформы
export const downPlatform = () => api.put(`/private/platform/down`);

// Распределение платформы
export const distributePlatform = () => api.post(`/private/platform/distribute`);

// Получение текущего состояния платформы
export const getPlatformStatus = () => api.get(`/private/platform`);

// Получение доступности распределения
export const getDistributeAvailability = () => api.get(`/private/platform/distribute-availibility`);

// Получение активного этажа платформы
export const getActiveFloor = () => api.get(`/private/platform/active-floor`);