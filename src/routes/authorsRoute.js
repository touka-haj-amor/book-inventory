import express from 'express';
import { listAuthors, booksOfAuthor } from "../controllers/authorsController.js";

const  authorsRoute = express.Router();

authorsRoute.get("/", listAuthors);
authorsRoute.get("/:name", booksOfAuthor);


export {authorsRoute};