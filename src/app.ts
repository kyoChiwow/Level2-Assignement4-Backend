import express, { Application, Request, Response } from "express";
import { bookRoutes } from "./app/controller/books.controller";
import cors from "cors";
import { borrowRoutes } from "./app/controller/borrow.controller";

const app: Application = express();
app.use(express.json());

app.use(cors({
    origin: ["http://localhost:5173"],
}))

app.use("/api", bookRoutes);
app.use("/api", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Library Management System Backend!");
})

export default app;