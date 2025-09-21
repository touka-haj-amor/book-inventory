import {getBooks, getGenres, createBook, deleteBook, updateBook, getAuthors, getBookById, getOrCreateAuthorId} from '../db/queries.js';

export const listBooks = async(req, res)=>{
    const books =  await getBooks();
    res.render("booksList", {title : "list of books", books});
};

export const addBookGet = async (req, res) => {
    const genres = await getGenres();
    const authors = await getAuthors();
    res.render("addBookForm", { title: "add book", book: null, genres, authors});
};

export const addBookPost = async (req, res)=>{
    try{
        const book = req.body;
        if (!book) {
          return res.status(400).send("data not entered");
        }
        await createBook(book);
        res.redirect("/");
    } catch (error){
        console.error("error adding book : ", error);
        res.status(500).send("error adding book");
    }
};

export const deleteBookPost = async (req,res)=>{
    const {id} = req.params;
    try{
        await deleteBook(id);
        res.redirect("/");
    }
    catch (error){
        console.log(`error deleting book ${error}`);
        res.status(500).send("error deleting book");
    }
};

export const updateBookGet = async (req, res) => {
    const {id} = req.params;
    const book = await getBookById(id);
    const genres = await getGenres();
    res.render("updateBookForm", { book, genres });
};

export const updateBookPost = async (req, res) => {
    const {id} = req.params;
    const {title, author, genreId, description} = req.body;
    const authorId = await getOrCreateAuthorId(author);
    await updateBook(id, {title, authorId, genreId, description});
    res.redirect("/");
};