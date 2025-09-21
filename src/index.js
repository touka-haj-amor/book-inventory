import express from 'express';
import path from 'path';
import url from 'url';
import {booksRoute} from './routes/booksRoute.js'
import {genresRoute} from './routes/genresRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views",path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));

app.use("/", booksRoute);
app.use("/genres",genresRoute);

app.listen(PORT, (error)=>{
    if (error){
        throw error;
    }
    console.log(`app listening on port : ${PORT}`);
});