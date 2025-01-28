// api/services.ts
import api from "./axiosInstance";

// Product Controller
export const getProduct = (id: string) => api.get(`/private/products/${id}`);
export const updateProduct = (id: string, data: any) => api.put(`/private/products/${id}`, data);
export const deleteProduct = (id: string) => api.delete(`/private/products/${id}`);
export const createProduct = (data: any) => api.post(`/private/products`, data);

// Prisoner Controller
export const getPrisoner = (id: string) => api.get(`/private/prisoners/${id}`);
export const updatePrisoner = (id: string, data: any) => api.put(`/private/prisoners/${id}`, data);
export const deletePrisoner = (id: string) => api.delete(`/private/prisoners/${id}`);
export const createPrisoner = (data: any) => api.post(`/private/prisoners`, data);
export const getPrisoners = () => api.get(`/private/prisoners`);

// Dish Controller
export const getDish = (id: string) => api.get(`/private/dishes/${id}`);
export const updateDish = (id: string, data: any) => api.put(`/private/dishes/${id}`, data);
export const deleteDish = (id: string) => api.delete(`/private/dishes/${id}`);
export const createDish = (data: any) => api.post(`/private/dishes`, data);
export const getDishes = () => api.get(`/private/dishes`);

// User Controller
export const getUsers = () => api.get(`/private/users`);
export const createUser = (data: any) => api.post(`/private/users`, data);
export const deleteUser = (userId: string) => api.delete(`/private/users/${userId}`);
export const updateUserRoles = (userId: string, roles: string[]) =>
    api.patch(`/private/users/${userId}`, {roles});

// Authentication Controller
export const authenticateUser = (data: { username: string; password: string }) =>
    api.post(`/api/v1/authenticate`, data);

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
export const getViolations = () => api.get(`/private/bars/violations`);

// Role Controller
export const getRoles = () => api.get(`/private/roles`);

// Current Menu Controller
export const getMenu = () => api.get(`/private/menu`);
