import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage'
import MainPage from '../pages/MainPage/MainPage';
import UsersPage from '../pages/MainPage/routes/UsersPage';
import RegistrationPage from '../pages/MainPage/routes/RegistrationPage';
import MenuPage from '../pages/MainPage/routes/MenuPage';
import PointsPage from '../pages/MainPage/routes/PointsPage';
import IncidentPage from '../pages/MainPage/routes/IncidentPage';


const AppRoutes: React.FC = () => (
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* MainPage with nested routes */}
        <Route path="/main" element={<MainPage />}>
            <Route path="пользователи" element={<UsersPage />} />
            <Route path="регистрация" element={<RegistrationPage />} />
            <Route path="меню" element={<MenuPage />} />
            <Route path="баллы" element={<PointsPage />} />
            <Route path="происшествие" element={<IncidentPage />} />
        </Route>
    </Routes>
);


export default AppRoutes;
