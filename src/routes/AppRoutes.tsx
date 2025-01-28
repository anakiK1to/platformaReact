import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage'
import RegistrationPage from '../pages/MainPage/routes/RegistrationPage';
import MenuPage from '../pages/MainPage/routes/menuConfiguration/MenuPage';
import AdminPage from "../pages/MainPage/routes/AdminPage";
import ChefDashboard from "../pages/MainPage/ChefDashboard";
import InmateDashboard from "../pages/MainPage/routes/InmateDashboard";
import PrisonersPage from "../pages/MainPage/routes/PrisonersPage";
import MainPage from "../pages/MainPage/MainPage"


const AppRoutes: React.FC = () => (
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/main" element={<MainPage />} >
            <Route path="Страница Заключенных" element={<PrisonersPage />} />
            <Route path="регистрация" element={<RegistrationPage />} />
            <Route path="Заключенные" element={<PrisonersPage /> } />
            <Route path="Администрирование" element={<AdminPage />} />
            <Route path="Лк заключенного" element={<InmateDashboard />} />
            <Route path="Обновление меню" element={<ChefDashboard />} />
        </Route>
    </Routes>
);


export default AppRoutes;
