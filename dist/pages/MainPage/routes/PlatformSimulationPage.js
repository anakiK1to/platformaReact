"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/pages/PlatformSimulationPage.tsx
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const PlatformSimulationPage = () => {
    const startSimulation = () => {
        console.log("Simulation started!"); // Replace with logic
    };
    return (react_1.default.createElement(material_1.Box, { p: 4 },
        react_1.default.createElement(material_1.Typography, { variant: "h5", gutterBottom: true }, "Platform Simulation"),
        react_1.default.createElement(material_1.Button, { variant: "contained", color: "primary", onClick: startSimulation }, "Start Simulation")));
};
exports.default = PlatformSimulationPage;
