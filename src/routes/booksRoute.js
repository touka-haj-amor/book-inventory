import express from 'express';
import {listBooks, addBookGet, addBookPost, deleteBookPost, updateBookGet, updateBookPost} from '../controllers/booksController.js';

const booksRoute = express.Router();

booksRoute.get("/", listBooks);
booksRoute.get("/addBook", addBookGet);
booksRoute.post("/addBook", addBookPost);
booksRoute.post("/delete/:id", deleteBookPost);
booksRoute.get("/update/:id", updateBookGet);
booksRoute.post("/update/:id", updateBookPost);

export {booksRoute};