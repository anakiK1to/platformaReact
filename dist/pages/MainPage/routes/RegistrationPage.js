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
// src/pages/RegistrationPage.tsx
const react_1 = __importStar(require("react"));
const material_1 = require("@mui/material");
const RegistrationPage = () => {
    const [form, setForm] = (0, react_1.useState)({
        name: "",
        passport: "",
        dob: "",
        weight: "",
        login: "",
        password: "",
        preferences: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => (Object.assign(Object.assign({}, prev), { [name]: value })));
    };
    const handleSubmit = () => {
        console.log("Registered prisoner:", form); // Replace with API call
    };
    return (react_1.default.createElement(material_1.Box, { p: 4 },
        react_1.default.createElement(material_1.Typography, { variant: "h5", gutterBottom: true }, "Register New Prisoner"),
        react_1.default.createElement(material_1.Grid, { container: true, spacing: 2 },
            ["name", "passport", "dob", "weight", "login", "password", "preferences"].map((field, index) => (react_1.default.createElement(material_1.Grid, { item: true, xs: 12, md: 6, key: index },
                react_1.default.createElement(material_1.TextField, { fullWidth: true, label: field.charAt(0).toUpperCase() + field.slice(1), variant: "outlined", name: field, value: form[field], onChange: handleChange, type: field === "password" ? "password" : field === "dob" ? "date" : "text", InputLabelProps: field === "dob" ? { shrink: true } : undefined })))),
            react_1.default.createElement(material_1.Grid, { item: true, xs: 12 },
                react_1.default.createElement(material_1.Button, { variant: "contained", color: "primary", onClick: handleSubmit }, "Register")))));
};
exports.default = RegistrationPage;
