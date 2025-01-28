"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/pages/MenuUpdatePage.tsx
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const MenuUpdatePage = () => {
    const mockMenu = ["Spaghetti", "Chicken Curry"]; // Replace with API call
    const handleMenuUpdate = (index, newDish) => {
        console.log(`Updated dish ${index} to ${newDish}`); // Replace with API call
    };
    return (react_1.default.createElement(material_1.Box, { p: 4 },
        react_1.default.createElement(material_1.Typography, { variant: "h5", gutterBottom: true }, "Update Menu"),
        react_1.default.createElement(material_1.Grid, { container: true, spacing: 2 },
            mockMenu.map((dish, index) => (react_1.default.createElement(material_1.Grid, { item: true, xs: 12, key: index },
                react_1.default.createElement(material_1.TextField, { fullWidth: true, defaultValue: dish, onBlur: (e) => handleMenuUpdate(index, e.target.value), label: "Dish Name", variant: "outlined" })))),
            react_1.default.createElement(material_1.Grid, { item: true, xs: 12 },
                react_1.default.createElement(material_1.Button, { variant: "contained", color: "secondary" }, "Save Changes")))));
};
exports.default = MenuUpdatePage;
