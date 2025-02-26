import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage'
import MainPage from '../pages/MainPage/MainPage';
import UsersPage from '../pages/MainPage/routes/UsersPage';
import RegistrationPage from '../pages/MainPage/routes/RegistrationPage';
import ChefDashboard from "../pages/MainPage/ChefDashboard";
import InmateDashboard from "../pages/MainPage/routes/InmateDashboard";
import PlatformController from "../pages/MainPage/routes/PlatformController";


const AppRoutes: React.FC = () => (
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* MainPage with nested routes */}
        <Route path="/main" element={<MainPage />}>
            <Route path="пользователи" element={<UsersPage />} />
            <Route path="регистрация" element={<RegistrationPage />} />
            <Route path="Лк заключенного" element={<InmateDashboard />} />
            <Route path="Обновление меню" element={<ChefDashboard />} />
            <Route path="Платформа" element={<PlatformController />} />
        </Route>
    </Routes>
);


export default AppRoutes;
