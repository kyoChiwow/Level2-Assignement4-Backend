import express, { Request, Response } from "express";
import { Book } from "../Models/books.model";
import { handleError } from "../utils/error.handle";

export const bookRoutes = express.Router();

// Create a book
bookRoutes.post("/books", async (req: Request, res: Response) => {
  const body = req.body;
  const book = await Book.create(body);

  res.status(201).json({
    success: true,
    message: "Book created successfully!",
    book,
  });
});
// Create a book

// Get All Books
bookRoutes.get("/books", async (req: Request, res: Response) => {
  try {
    const {
      filter,
      sort = "desc",
      sortBy = "createdAt",
      limit = "10",
      page = 1,
    } = req.query;

    const sortOrder = sort === "asc" ? 1 : -1;
    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);
    const skip = (pageNumber - 1) * limitNumber;

    const genreFilter = filter ? { genre: filter } : {};

    const books = await Book.find(genreFilter)
      .sort({ [sortBy as string]: sortOrder })
      .skip(skip)
      .limit(parseInt(limit as string));

    const total = await Book.countDocuments(genreFilter);

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
  } catch (error: any) {
    handleError(res, error);
  }
});
// Get All Books

// Get Book By Id
bookRoutes.get("/books/:bookId", async (req: Request, res: Response) => {
  try {
    const id = req.params.bookId;
    const book = await Book.findById(id);
    res.status(200).json({
      success: true,
      message: "Book fetched successfully!",
      book,
    });
  } catch (error) {}
});
// Get Book By Id

// Update Book By Id
bookRoutes.patch("/books/:bookId", async (req: Request, res: Response) => {
  try {
    const id = req.params.bookId;
    const bodyUpdate = req.body;

    const book = await Book.findByIdAndUpdate(id, bodyUpdate);
    res.status(200).json({
      success: true,
      message: "Book fetched successfully!",
      book,
    });
  } catch (error) {
    handleError(res, error);
  }
});
// Update Book By Id

// Delete Book By Id
bookRoutes.delete("/books/:bookId", async (req: Request, res: Response) => {
  try {
    const id = req.params.bookId;
    const book = await Book.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Book deleted successfully!",
    });
  } catch (error) {
    handleError(res, error);
  }
});
// Delete Book By Id
