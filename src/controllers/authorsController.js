import { getAuthors, getBooksByAuthor } from "../db/queries.js";

export const listAuthors = async (req, res) => {
    const authors = await getAuthors();
    res.render("authorsList", { title: "List of authors", authors });
};

export const booksOfAuthor = async (req, res) => {
    const authorName = req.params.name;
    const books = await getBooksByAuthor(authorName);
    res.render("booksList", { title: `Books by ${authorName}`, books });
};
