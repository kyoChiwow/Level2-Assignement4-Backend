"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./app/controller/books.controller");
const cors_1 = __importDefault(require("cors"));
const borrow_controller_1 = require("./app/controller/borrow.controller");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "https://level-2-assignment-4-frontend.vercel.app"],
}));
app.use("/api", books_controller_1.bookRoutes);
app.use("/api", borrow_controller_1.borrowRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to Library Management System Backend!");
});
exports.default = app;
