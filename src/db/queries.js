import pool from "./pool.js";

export async function getBooksByGenre(name) {
    const query = `
        SELECT 
            b.id,
            b.title,
            b.description,
            a.name AS author,
            g.name AS genre
        FROM book b
        LEFT JOIN book_author ba ON b.id = ba.bookid
        LEFT JOIN author a ON ba.authorid = a.id
        LEFT JOIN book_genre bg ON b.id = bg.bookid
        LEFT JOIN genre g ON bg.genreid = g.id
        WHERE g.name = $1
        ORDER BY b.id
    `;

    const result = await pool.query(query, [name]);
    return result.rows;
}


export async function getBooks() {
    const query = `
        SELECT 
            b.id,
            b.title,
            b.description,
            a.name AS author,
            g.name AS genre
        FROM book b
        LEFT JOIN book_author ba ON b.id = ba.bookid
        LEFT JOIN author a ON ba.authorid = a.id
        LEFT JOIN book_genre bg ON b.id = bg.bookid
        LEFT JOIN genre g ON bg.genreid = g.id
        ORDER BY b.id
    `;
    const result = await pool.query(query);
    return result.rows;
}

export async function getBookById(id) {
  const result = await pool.query(`
    SELECT 
      b.id,
      b.title,
      b.description,
      a.id AS authorId,
      a.name AS author,
      g.id AS genreId,
      g.name AS genre
    FROM book b
    LEFT JOIN book_author ba ON b.id = ba.bookid
    LEFT JOIN author a ON ba.authorid = a.id
    LEFT JOIN book_genre bg ON b.id = bg.bookid
    LEFT JOIN genre g ON bg.genreid = g.id
    WHERE b.id = $1
  `, [id]);
  return result.rows[0];
}

export async function getGenres(){
    const genres = await pool.query("SELECT * FROM genre");
    return genres.rows;
}

export async function getAuthors(){
    const authors = await pool.query("SELECT * FROM author");
    return authors.rows;
}

export async function createBook(book){
    const {title, description, author, genreId} = book;

    const result = await pool.query(`INSERT INTO book (title, description) values ($1, $2) RETURNING id`, [title, description]);

    const bookId = result.rows[0].id;

    if (author) {
        let authorResult = await pool.query(
            `SELECT id FROM author WHERE name = $1`,
            [author]
        );

        let authorId;
        if (authorResult.rows.length === 0) {
            authorResult = await pool.query(
                `INSERT INTO author (name) VALUES ($1) RETURNING id`,
                [author]
            );
        }
        authorId = authorResult.rows[0].id;

        await pool.query(
            `INSERT INTO book_author (bookId, authorId) VALUES ($1, $2)`,
            [bookId, authorId]
        );
    }

    if (genreId){
        await pool.query(`INSERT INTO book_genre (bookId, genreId) VALUES ($1, $2)`, [bookId, genreId]);
    }

    return bookId;
}

export async function deleteBook(id){
    await pool.query("DELETE FROM BOOK WHERE id = $1", [id]);
}

export async function updateBook(id, { title, authorId, genreId, description }) {
    await pool.query(
        `UPDATE book SET title=$1, description=$2 WHERE id=$3`,
        [title, description, id]
    );
    await pool.query(
        `UPDATE book_author SET authorid=$1 WHERE bookid=$2`,
        [authorId, id]
    );
    await pool.query(
        `UPDATE book_genre SET genreid=$1 WHERE bookid=$2`,
        [genreId, id]
    );
}

export async function getOrCreateAuthorId(authorName) {
    let result = await pool.query(`SELECT id FROM author WHERE name = $1`, [authorName]);
    if (result.rows.length === 0) {
        result = await pool.query(
            `INSERT INTO author (name) VALUES ($1) RETURNING id`,
            [authorName]
        );
    }
    return result.rows[0].id;
}

export async function getBooksByAuthor(name) {
    const query = `
        SELECT 
            b.id,
            b.title,
            b.description,
            a.name AS author,
            g.name AS genre
        FROM book b
        LEFT JOIN book_author ba ON b.id = ba.bookid
        LEFT JOIN author a ON ba.authorid = a.id
        LEFT JOIN book_genre bg ON b.id = bg.bookid
        LEFT JOIN genre g ON bg.genreid = g.id
        WHERE a.name = $1
        ORDER BY b.id
    `;

    const result = await pool.query(query, [name]);
    return result.rows;
}
