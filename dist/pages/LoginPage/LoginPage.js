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
const react_router_dom_1 = require("react-router-dom");
const AuthContext_1 = require("../../context/AuthContext");
const LoginPage = () => {
    const [login, setLogin] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { login: authenticate } = (0, AuthContext_1.useAuth)();
    const handleLoginClick = () => {
        if (login === 'user' && password === 'password') {
            authenticate(); // Установка статуса аутентификации
            navigate('/main');
        }
        else {
            console.log('Неверный логин или пароль');
        }
    };
    return (react_1.default.createElement(material_1.Container, { maxWidth: "xs" },
        react_1.default.createElement(material_1.Box, { textAlign: "center", mt: 4, mb: 2 },
            react_1.default.createElement(material_1.Typography, { variant: "h6", fontWeight: "bold" }, "\u0412\u0445\u043E\u0434 \u0432 \u0430\u043A\u043A\u0430\u0443\u043D\u0442")),
        react_1.default.createElement(material_1.TextField, { label: "\u041B\u043E\u0433\u0438\u043D", variant: "outlined", fullWidth: true, margin: "normal", value: login, onChange: (e) => setLogin(e.target.value) }),
        react_1.default.createElement(material_1.TextField, { label: "\u041F\u0430\u0440\u043E\u043B\u044C", variant: "outlined", fullWidth: true, margin: "normal", type: "password", value: password, onChange: (e) => setPassword(e.target.value) }),
        react_1.default.createElement(material_1.Button, { fullWidth: true, variant: "contained", color: "primary", onClick: handleLoginClick, style: { marginTop: '16px', borderRadius: '12px' } }, "\u0412\u043E\u0439\u0442\u0438")));
};
exports.default = LoginPage;
