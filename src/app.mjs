import express from 'express';
import router from './routes/router.mjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

const app = express();
const PORT = process.env.PORT
app.set('view engine', 'ejs');
app.set('views', './src/views');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.listen(PORT);
