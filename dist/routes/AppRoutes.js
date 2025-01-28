"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const LoginPage_1 = __importDefault(require("../pages/LoginPage/LoginPage"));
const MainPage_1 = __importDefault(require("../pages/MainPage/MainPage"));
const RegistrationPage_1 = __importDefault(require("../pages/MainPage/routes/RegistrationPage"));
const DishSelectionPage_1 = __importDefault(require("../pages/MainPage/routes/DishSelectionPage"));
const MenuUpdatePage_1 = __importDefault(require("../pages/MainPage/routes/MenuUpdatePage"));
const PlatformSimulationPage_1 = __importDefault(require("../pages/MainPage/routes/PlatformSimulationPage"));
const AppRoutes = () => (react_1.default.createElement(react_router_dom_1.Routes, null,
    react_1.default.createElement(react_router_dom_1.Route, { path: "/login", element: react_1.default.createElement(LoginPage_1.default, null) }),
    react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(react_router_dom_1.Navigate, { to: "/login", replace: true }) }),
    react_1.default.createElement(react_router_dom_1.Route, { path: "/main", element: react_1.default.createElement(MainPage_1.default, null) },
        react_1.default.createElement(react_router_dom_1.Route, { path: "dish-selection", element: react_1.default.createElement(DishSelectionPage_1.default, null) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "registration", element: react_1.default.createElement(RegistrationPage_1.default, null) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "menu-update", element: react_1.default.createElement(MenuUpdatePage_1.default, null) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "platform-simulation", element: react_1.default.createElement(PlatformSimulationPage_1.default, null) }))));
exports.default = AppRoutes;
