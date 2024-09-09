import express from 'express';
import router from './routes/router.mjs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.listen(PORT);
