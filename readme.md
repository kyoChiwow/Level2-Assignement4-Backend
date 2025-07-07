# Library Management System (Backend)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

A robust backend system for managing library operations with RESTful APIs, built with Express.js and MongoDB.

## Features

- **Book Management**
  - Create, read, update, and delete books
  - Filter books by genre
  - Pagination and sorting
- **Borrowing System**
  - Track borrowed books with due dates
  - Automatic availability updates
  - Borrowing summary reports
- **Data Validation**
  - Comprehensive error handling
  - Mongoose schema validation
- **RESTful API**
  - Well-structured endpoints
  - JSON responses
- **Aggregation**
  - Popular book reports
  - Borrowing statistics

## Technologies Used

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Atlas Cloud)
- **ORM**: Mongoose
- **Language**: TypeScript
- **Middleware**: CORS, Express JSON parser

## API Endpoints

### Books
| Method | Endpoint         | Description                     |
|--------|------------------|---------------------------------|
| POST   | `/api/books`     | Create new book                 |
| GET    | `/api/books`     | Get all books (with pagination) |
| GET    | `/api/books/:id` | Get single book by ID           |
| PATCH  | `/api/books/:id` | Update book details             |
| DELETE | `/api/books/:id` | Delete a book                   |

### Borrowing
| Method | Endpoint          | Description                |
|--------|-------------------|----------------------------|
| POST   | `/api/borrow/:id` | Create new borrow record   |
| GET    | `/api/borrow-summary` | Get borrowing summary   |

## Data Models

### Book Schema
```typescript
interface IBook {
  title: string;
  author: string;
  genre: "FICTION" | "NON-FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY";
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}