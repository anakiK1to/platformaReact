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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/pages/MainPage/routes/DishSelectionPage.tsx
const react_1 = __importStar(require("react"));
const material_1 = require("@mui/material");
const api_1 = require("../../../api");
const mockMenu = ["Spaghetti", "Chicken Curry", "Vegetable Salad", "Beef Stroganoff"]; // Replace with API data
const DishSelectionPage = () => {
    const [prisoners, setPrisoners] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    // Загрузка списка заключенных с сервера
    (0, react_1.useEffect)(() => {
        const loadPrisoners = () => __awaiter(void 0, void 0, void 0, function* () {
            setLoading(true);
            const data = yield (0, api_1.fetchPrisoners)();
            setPrisoners(data);
            setLoading(false);
        });
        loadPrisoners();
    }, []);
    const handleDishSelection = (prisonerId, dish) => __awaiter(void 0, void 0, void 0, function* () {
        setLoading(true);
        const updatedPrisoners = yield (0, api_1.updatePrisonerDish)(prisonerId, dish);
        setPrisoners(updatedPrisoners);
        setLoading(false);
    });
    const saveSelections = () => {
        console.log("Updated favorite dishes:", prisoners); // Здесь можно отправить данные на сервер
    };
    if (loading) {
        return react_1.default.createElement(material_1.Typography, null, "Loading...");
    }
    return (react_1.default.createElement(material_1.Box, { p: 4 },
        react_1.default.createElement(material_1.Typography, { variant: "h5", gutterBottom: true }, "Select Favorite Dishes for All Prisoners"),
        react_1.default.createElement(material_1.Grid, { container: true, spacing: 2 },
            prisoners.map((prisoner) => (react_1.default.createElement(material_1.Grid, { item: true, xs: 12, key: prisoner.id },
                react_1.default.createElement(material_1.Box, { display: "flex", alignItems: "center", justifyContent: "space-between" },
                    react_1.default.createElement(material_1.Typography, null, prisoner.name),
                    react_1.default.createElement(material_1.Select, { value: prisoner.favoriteDish || "", onChange: (e) => handleDishSelection(prisoner.id, e.target.value), displayEmpty: true, style: { minWidth: 200 } },
                        react_1.default.createElement(material_1.MenuItem, { value: "" }, "No Selection"),
                        mockMenu.map((dish, index) => (react_1.default.createElement(material_1.MenuItem, { key: index, value: dish }, dish)))))))),
            react_1.default.createElement(material_1.Grid, { item: true, xs: 12 },
                react_1.default.createElement(material_1.Button, { variant: "contained", color: "primary", onClick: saveSelections }, "Save Selections")))));
};
exports.default = DishSelectionPage;
