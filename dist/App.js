"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/App.tsx
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const AppRoutes_1 = __importDefault(require("./routes/AppRoutes"));
const AuthContext_1 = require("./context/AuthContext");
const material_1 = require("@mui/material");
const colors_1 = require("@mui/material/colors");
const theme = (0, material_1.createTheme)({
    palette: {
        primary: colors_1.blueGrey,
        secondary: colors_1.pink,
        background: {
            default: '#f7f7f7',
        },
    },
    components: {
        MuiListItem: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                },
            },
        },
    },
});
const App = () => (react_1.default.createElement(material_1.ThemeProvider, { theme: theme },
    react_1.default.createElement(AuthContext_1.AuthProvider, null,
        react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement(AppRoutes_1.default, null)))));
exports.default = App;
