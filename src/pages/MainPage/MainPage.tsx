import React from "react";
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
    ListItemButton,
} from "@mui/material";
import {
    Menu as MenuIcon,
    AccountCircle,
    Settings,
    AdminPanelSettings,
    VerifiedUser,
    RestaurantMenu, Gamepad,
} from "@mui/icons-material";
import { Outlet, Link, useLocation } from "react-router-dom";


const drawerWidth = 280;

const MainPage: React.FC = () => {
    const location = useLocation();

    const navigationItems = [
        { text: "Пользователи", icon: <AccountCircle />, path: "/пользователи" },
        { text: "Регистрация", icon: <Settings />, path: "/регистрация" },
        { text: "Обновление меню", icon: <RestaurantMenu />, path: "/Обновление меню" },
        { text: "Платформа", icon: <Gamepad />, path: "/Платформа" },
    ];

    return (
        <Box sx={{ display: "flex", height: "100vh", flexDirection: "column" }}>
            {/* Верхний AppBar с названием */}
            <AppBar position="fixed" sx={{ width: "100%", zIndex: 1201 }}>
                <Toolbar>
                    <IconButton color="inherit" edge="start" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Платформа
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Контейнер для панели навигации и основного контента */}
            <Box sx={{ display: "flex", flexGrow: 1 }}>
                {/* Панель навигации Drawer */}
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: {
                            width: drawerWidth,
                            boxSizing: "border-box",
                        },
                    }}
                >
                    <Toolbar />
                    <List>
                        {navigationItems.map((item) => (
                            <ListItem disablePadding key={item.text}>
                                <ListItemButton
                                    component={Link}
                                    to={`/main${item.path}`}
                                    selected={location.pathname === `/main${item.path}`}
                                    sx={{
                                        margin: "8px 12px",
                                        borderRadius: "12px",
                                        color:
                                            location.pathname === `/main${item.path}`
                                                ? "primary.main"
                                                : "text.secondary",
                                        backgroundColor:
                                            location.pathname === `/main${item.path}`
                                                ? "rgba(0, 128, 128, 0.15)"
                                                : "transparent",
                                        "&:hover": {
                                            backgroundColor: "rgba(0, 128, 128, 0.08)",
                                        },
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            color:
                                                location.pathname === `/main${item.path}`
                                                    ? "primary.main"
                                                    : "text.secondary",
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>

                {/* Основной контент */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        bgcolor: "background.default",
                        padding: 3,
                        ml: `${drawerWidth}px`,
                        mt: "64px", // Отступ под header
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default MainPage;
