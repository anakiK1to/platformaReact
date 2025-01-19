import React, { useState } from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Box,
    Toolbar,
    AppBar,
    Typography,
    IconButton,
    ListItemButton, MenuList,
} from '@mui/material';
import {
    Menu as MenuIcon,
    ChevronLeft,
    ChevronRight,
    AccountCircle,
    Home,
    Settings,
    Place,
    Report,
    AdminPanelSettings, VerifiedUser, RestaurantMenu
} from '@mui/icons-material';
import { Outlet, Link, useLocation } from 'react-router-dom';
import AdminPage from "./routes/AdminPage";
import path from "node:path";
import InmateDashboard from "./routes/InmateDashboard";
import UsersPage from "./routes/UsersPage";

const drawerWidth = 280;

const MainPage: React.FC = () => {
    const location = useLocation();
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);

    const handleDrawerToggle = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const navigationItems = [
        { text: 'Пользователи', icon: <AccountCircle />, path: '/пользователи' },
        // { text: 'Меню', icon: <Home />, path: '/меню' },
        // { text: 'Баллы', icon: <Place />, path: '/баллы' },
        // { text: 'Происшествие', icon: <Report />, path: '/происшествие' },
        { text: 'Регистрация', icon: <Settings />, path: '/регистрация' },
        { text: 'Администрирование',  icon: <AdminPanelSettings />, path: '/Администрирование'},
        { text: 'Лк заключенного',  icon: <VerifiedUser />, path: '/Лк заключенного'},
        { text: 'Обновление меню',  icon: <RestaurantMenu />, path: '/Обновление меню'},


    ];

    return (
        <Box sx={{ display: 'flex' }}>
            {/* Верхний AppBar */}
            <AppBar position="fixed" sx={{ width: `calc(100% - ${isDrawerOpen ? drawerWidth : 0}px)`, ml: `${isDrawerOpen ? drawerWidth : 0}px` }}>
                <Toolbar>
                    <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Платформа
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Панель навигации Drawer */}
            <Drawer
                variant="persistent"
                open={isDrawerOpen}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        transition: 'width 0.3s',
                        ...(isDrawerOpen ? {} : { overflowX: 'hidden', width: '0px' }),
                    },
                }}
            >
                <Toolbar>
                    <IconButton onClick={handleDrawerToggle}>
                        {isDrawerOpen ? <ChevronLeft /> : <ChevronRight />}
                    </IconButton>
                </Toolbar>
                <List>
                    {navigationItems.map((item) => (
                        <ListItem disablePadding key={item.text}>
                            <ListItemButton
                                component={Link}
                                to={`/main${item.path}`}
                                selected={location.pathname === `/main${item.path}`}
                                sx={{
                                    margin: '8px 12px',
                                    borderRadius: '12px',
                                    color: location.pathname ===  `/main${item.path}` ? 'primary.main' : 'text.secondary',
                                    backgroundColor: location.pathname === `/main${item.path}` ? 'rgba(0, 128, 128, 0.15)' : 'transparent',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 128, 128, 0.08)',
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: location.pathname ===  `/main${item.path}` ? 'primary.main' : 'text.secondary' }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            {/* Основное содержимое страницы */}
            <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, ml: isDrawerOpen ? `${drawerWidth}px` : '0', mt: '64px' }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
};

export default MainPage;
