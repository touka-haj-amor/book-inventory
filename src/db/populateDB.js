import {Client} from 'pg';

const SQL = `

CREATE TABLE IF NOT EXISTS book(
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
title VARCHAR(255),
description TEXT);

CREATE TABLE IF NOT EXISTS genre(
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name VARCHAR (255)
);

CREATE TABLE IF NOT EXISTS author(
id INTEGER PRIMARY KEY GENERATED  ALWAYS AS IDENTITY,
name VARCHAR (255)
);

CREATE TABLE IF NOT EXISTS book_genre(
bookId INTEGER,
genreId INTEGER,
CONSTRAINT pk_book_genre PRIMARY KEY (bookId, genreId),
CONSTRAINT fk_book FOREIGN KEY (bookId) REFERENCES book(id) ON DELETE CASCADE,
CONSTRAINT fk_genre FOREIGN KEY (genreId) REFERENCES genre(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS book_author(
bookId INTEGER,
authorId INTEGER,
CONSTRAINT pk_book_author PRIMARY KEY (bookId, authorId),
CONSTRAINT fk_book FOREIGN KEY (bookId) REFERENCES book(id) ON DELETE CASCADE,
CONSTRAINT fk_author FOREIGN KEY (authorId) REFERENCES author(id) ON DELETE CASCADE
);

INSERT INTO book (title, description)
values ('The Kite Runner', 'the unforgettable, heartbreaking story of the unlikely friendship between a wealthy boy and the son of his fathers servant, the kite runner is a beautifully crafted novel set in a country that is in the process of being destroyed.'), 
('No Longer Human','the story of a young man who is caught between the breakup of the traditions of a northern japanese aristocratic family and the impact of western ideas.'), 
('Tender Is The Flesh','working at the local processing plant, marcos is in the business of slaughtering humans- though no one calls them that anymore.'), ('Animal Farm', 'a farm is taken over by its overworked, mistreated animals. With flaming idealism and stirring slogans, they set out to create a paradise of progress, justice, and equality');

INSERT INTO genre(name) 
VALUES ('political satire'),
('fiction'),
('drama'),
('horror');

INSERT INTO author(name)
VALUES ('Khaled Hosseini'),
('Osamu Dazai'),
('Agustina Bazterrica'),
('George Orwell');

INSERT INTO book_genre(bookId, genreId)
VALUES (1,2), (2,3),(3,4),(4,1);

INSERT INTO book_author(bookId, authorId)
values (1,1),(2,2),(3,3),(4,4);
`;



async function main() {
  console.log("seeding...");
  const connectionString =
    process.argv[2] ||
    process.env.DATABASE_URL ||
    "postgres://myuser:booksuser@localhost:5432/books";

  const client = new Client({ connectionString });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done!");
}
main();