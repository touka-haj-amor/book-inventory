import { getBooksByGenre, getGenres} from "../db/queries.js";


export const listGenres = async(req, res)=>{
    const genres = await getGenres();
    res.render("genresList", {title: "List of genres", genres});
};

export const booksOfGenre = async (req, res)=>{
    const genreName = req.params.name;
    const books = await getBooksByGenre(genreName);
    res.render("booksList", {title: `${genreName} books`, books});
};