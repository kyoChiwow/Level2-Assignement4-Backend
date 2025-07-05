import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server : Server;
const PORT = 5000;

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://LibraryManagement:LibraryManagement@cluster0.parzq.mongodb.net/LibraryManagement?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log(`Connected to MongoDB successfully using Mongoose`);

    server = app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    })
  } catch (error) {}
}

main();
