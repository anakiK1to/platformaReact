"use strict";
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
exports.resetPrisoners = exports.updatePrisonerDish = exports.fetchPrisoners = void 0;
const mockPrisoners = [
    { id: 1, name: "John Doe", favoriteDish: null },
    { id: 2, name: "Jane Smith", favoriteDish: null },
    { id: 3, name: "Alice Johnson", favoriteDish: null },
];
let prisoners = [...mockPrisoners];
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// Эмуляция получения списка заключенных
const fetchPrisoners = () => __awaiter(void 0, void 0, void 0, function* () {
    yield delay(500); // Задержка для имитации запроса
    return prisoners;
});
exports.fetchPrisoners = fetchPrisoners;
// Эмуляция обновления блюда для заключенного
const updatePrisonerDish = (id, favoriteDish) => __awaiter(void 0, void 0, void 0, function* () {
    yield delay(500);
    prisoners = prisoners.map((prisoner) => prisoner.id === id ? Object.assign(Object.assign({}, prisoner), { favoriteDish }) : prisoner);
    return prisoners;
});
exports.updatePrisonerDish = updatePrisonerDish;
// Сброс данных
const resetPrisoners = () => __awaiter(void 0, void 0, void 0, function* () {
    yield delay(500);
    prisoners = [...mockPrisoners];
});
exports.resetPrisoners = resetPrisoners;
