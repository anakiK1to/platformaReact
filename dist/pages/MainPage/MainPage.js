"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const material_1 = require("@mui/material");
const icons_material_1 = require("@mui/icons-material");
const react_router_dom_1 = require("react-router-dom");
const drawerWidth = 280;
const MainPage = () => {
    const location = (0, react_router_dom_1.useLocation)();
    const [isDrawerOpen, setIsDrawerOpen] = (0, react_1.useState)(true);
    const handleDrawerToggle = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };
    const navigationItems = [
        { text: 'Пользователи', icon: react_1.default.createElement(icons_material_1.AccountCircle, null), path: '/пользователи' },
        { text: 'Регистрация', icon: react_1.default.createElement(icons_material_1.Settings, null), path: '/registration' },
        { text: 'Меню', icon: react_1.default.createElement(icons_material_1.Home, null), path: '/menu-update' },
        { text: 'Выбор Блюд', icon: react_1.default.createElement(icons_material_1.Place, null), path: '/dish-selection' },
        { text: 'Симуляция', icon: react_1.default.createElement(icons_material_1.Report, null), path: '/platform-simulation' },
    ];
    return (react_1.default.createElement(material_1.Box, { sx: { display: 'flex' } },
        react_1.default.createElement(material_1.AppBar, { position: "fixed", sx: { width: `calc(100% - ${isDrawerOpen ? drawerWidth : 0}px)`, ml: `${isDrawerOpen ? drawerWidth : 0}px` } },
            react_1.default.createElement(material_1.Toolbar, null,
                react_1.default.createElement(material_1.IconButton, { color: "inherit", edge: "start", onClick: handleDrawerToggle, sx: { mr: 2 } },
                    react_1.default.createElement(icons_material_1.Menu, null)),
                react_1.default.createElement(material_1.Typography, { variant: "h6", noWrap: true, component: "div" }, "\u041F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0430"))),
        react_1.default.createElement(material_1.Drawer, { variant: "persistent", open: isDrawerOpen, sx: {
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: Object.assign({ width: drawerWidth, boxSizing: 'border-box', transition: 'width 0.3s' }, (isDrawerOpen ? {} : { overflowX: 'hidden', width: '0px' })),
            } },
            react_1.default.createElement(material_1.Toolbar, null,
                react_1.default.createElement(material_1.IconButton, { onClick: handleDrawerToggle }, isDrawerOpen ? react_1.default.createElement(icons_material_1.ChevronLeft, null) : react_1.default.createElement(icons_material_1.ChevronRight, null))),
            react_1.default.createElement(material_1.List, null, navigationItems.map((item) => (react_1.default.createElement(material_1.ListItem, { disablePadding: true, key: item.text },
                react_1.default.createElement(material_1.ListItemButton, { component: react_router_dom_1.Link, to: `/main${item.path}`, selected: location.pathname === `/main${item.path}`, sx: {
                        margin: '8px 12px',
                        borderRadius: '12px',
                        color: location.pathname === `/main${item.path}` ? 'primary.main' : 'text.secondary',
                        backgroundColor: location.pathname === `/main${item.path}` ? 'rgba(0, 128, 128, 0.15)' : 'transparent',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 128, 128, 0.08)',
                        },
                    } },
                    react_1.default.createElement(material_1.ListItemIcon, { sx: { color: location.pathname === `/main${item.path}` ? 'primary.main' : 'text.secondary' } }, item.icon),
                    react_1.default.createElement(material_1.ListItemText, { primary: item.text }))))))),
        react_1.default.createElement(material_1.Box, { component: "main", sx: { flexGrow: 1, bgcolor: 'background.default', p: 3, ml: isDrawerOpen ? `${drawerWidth}px` : '0', mt: '64px' } },
            react_1.default.createElement(material_1.Toolbar, null),
            react_1.default.createElement(react_router_dom_1.Outlet, null))));
};
exports.default = MainPage;
