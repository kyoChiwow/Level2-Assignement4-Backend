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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../Models/books.model");
const error_handle_1 = require("../utils/error.handle");
exports.bookRoutes = express_1.default.Router();
// Create a book
exports.bookRoutes.post("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const book = yield books_model_1.Book.create(body);
    res.status(201).json({
        success: true,
        message: "Book created successfully!",
        book,
    });
}));
// Create a book
// Get All Books
exports.bookRoutes.get("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sort = "desc", sortBy = "createdAt", limit = "10", page = 1, } = req.query;
        const sortOrder = sort === "asc" ? 1 : -1;
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        const skip = (pageNumber - 1) * limitNumber;
        const genreFilter = filter ? { genre: filter } : {};
        const books = yield books_model_1.Book.find(genreFilter)
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(parseInt(limit));
        const total = yield books_model_1.Book.countDocuments(genreFilter);
        res.status(200).json({
            success: true,
            message: "Books fetched successfully!",
            data: books,
            meta: {
                total,
                limit: limitNumber,
                page: pageNumber,
                totalPages: Math.ceil(total / limitNumber),
            },
        });
    }
    catch (error) {
        (0, error_handle_1.handleError)(res, error);
    }
}));
// Get All Books
// Get Book By Id
exports.bookRoutes.get("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const book = yield books_model_1.Book.findById(id);
        res.status(200).json({
            success: true,
            message: "Book fetched successfully!",
            book,
        });
    }
    catch (error) { }
}));
// Get Book By Id
// Update Book By Id
exports.bookRoutes.patch("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const bodyUpdate = req.body;
        const book = yield books_model_1.Book.findByIdAndUpdate(id, bodyUpdate);
        res.status(200).json({
            success: true,
            message: "Book fetched successfully!",
            book,
        });
    }
    catch (error) {
        (0, error_handle_1.handleError)(res, error);
    }
}));
// Update Book By Id
// Delete Book By Id
exports.bookRoutes.delete("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const book = yield books_model_1.Book.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Book deleted successfully!",
        });
    }
    catch (error) {
        (0, error_handle_1.handleError)(res, error);
    }
}));
// Delete Book By Id
