import express from 'express';
import {listGenres, booksOfGenre} from "../controllers/genresController.js";

const genresRoute = express.Router();

genresRoute.get("/", listGenres);
genresRoute.get("/:name", booksOfGenre);

export {genresRoute};